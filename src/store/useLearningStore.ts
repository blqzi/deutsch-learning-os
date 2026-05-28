import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ActivityLog, AiMessage, AiMode, AiRecommendationTask, Grade, KnowledgeItem, Lesson, ThemeSettings, UserProfile } from '../types';
import { initialActivity, initialGrades, initialKnowledge, initialLessons, initialMessages, initialProfile, initialRecommendations } from '../data/mockData';
import { averageGrade, weakTopics } from '../utils/analytics';

type Theme = 'dark' | 'light';
type Language = 'ru' | 'de';

type RegisterData = { name: string; email: string; password: string; level: UserProfile['level']; targetLevel: UserProfile['targetLevel']; goal: string };

interface LearningState {
  loggedIn: boolean;
  profile: UserProfile;
  grades: Grade[];
  lessons: Lesson[];
  knowledge: KnowledgeItem[];
  messages: AiMessage[];
  recommendations: AiRecommendationTask[];
  activity: ActivityLog[];
  theme: Theme;
  language: Language;
  themeSettings: ThemeSettings;
  registerUser: (data: RegisterData) => { ok: boolean; error?: string };
  login: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
  addGrade: (grade: Omit<Grade, 'id'>) => void;
  addKnowledge: (item: Omit<KnowledgeItem, 'id' | 'addedAt' | 'nextReview' | 'interval' | 'mistakes' | 'reviews' | 'memoryStrength' | 'lastReview'>) => void;
  reviewItem: (id: string, quality: 'bad' | 'ok' | 'good') => void;
  toggleLessonTask: (lessonId: string, taskId: string) => void;
  requestAiReview: (lessonId: string) => void;
  toggleRecommendationStep: (recId: string, stepId: string) => void;
  gradeRecommendation: (recId: string, quality: 1|2|3|4|5) => void;
  sendAiMessage: (text: string, mode?: AiMode) => void;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  setThemeSettings: (settings: Partial<ThemeSettings>) => void;
  exportData: () => string;
  importData: (raw: string) => { ok: boolean; error?: string };
}

const today = () => new Date().toISOString().slice(0,10);
const nextReviewDate = (days: number) => { const d = new Date(); d.setDate(d.getDate() + days); return d.toISOString().slice(0,10); };
const id = () => (crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`);

const buildAiReply = (text: string, state: LearningState, mode: AiMode = 'tutor') => {
  const lower = text.toLowerCase();
  const avg = averageGrade(state.grades);
  const weak = weakTopics(state.grades);
  const kbDue = state.knowledge.filter(k => k.nextReview <= today()).slice(0,3).map(k=>k.german);
  if (lower.includes('проверь') || lower.includes('check')) {
    return `AI-проверка: я бы поставил 4/5. Хорошо: смысл понятен, тема раскрыта. Плохо: проверь порядок слов и артикли. Рекомендация: добавь 2 предложения с weil/deshalb и повтори тему через 3 дня.`;
  }
  if (lower.includes('задание') || mode === 'exam') {
    return `Персональное задание на сегодня: 1) Повтори ${kbDue[0] || 'Ich möchte einen Termin vereinbaren.'}; 2) Напиши 5 предложений по теме ${weak[0] || 'Ausbildung'}; 3) Отправь ответ мне на проверку. Минимальная оценка для зачета: 4/5.`;
  }
  if (lower.includes('ауд') || weak.some(w=>w.toLowerCase().includes('termine'))) {
    return `По твоим данным слабая зона — аудирование. Средний балл сейчас ${avg}. Начни с коротких диалогов про Termine: выпиши числа, время и причину звонка. После ответа AI поставит оценку по 5-бальной системе.`;
  }
  if (mode === 'grammar' || lower.includes('грам')) {
    return `Грамматика по твоему уровню: тренируем порядок слов. Правило: глагол в обычном предложении стоит на 2-й позиции. Пример: Heute lerne ich Deutsch. Сделай 5 своих примеров, я проверю и поставлю оценку.`;
  }
  return `Я учитываю твои оценки, базу знаний и слабые темы. Сейчас слабые зоны: ${weak.join(', ') || 'данных пока мало'}. Следующий лучший шаг: выполнить одно AI-проверяемое задание и закрыть повторение ${kbDue[0] || 'из базы знаний'}.`;
};

export const useLearningStore = create<LearningState>()(persist((set, get) => ({
  loggedIn: false,
  profile: initialProfile,
  grades: initialGrades,
  lessons: initialLessons,
  knowledge: initialKnowledge,
  messages: initialMessages,
  recommendations: initialRecommendations,
  activity: initialActivity,
  theme: 'dark',
  language: 'ru',
  themeSettings: { accent: 'cyan', density: 'comfortable', blur: 18 },
  registerUser: (data) => {
    if (data.password.length < 6) return { ok:false, error:'Пароль должен быть минимум 6 символов' };
    set({ loggedIn:true, profile:{ ...initialProfile, ...data, status:'New learner', startDate: today(), dailyGoalMinutes:45 }});
    return { ok:true };
  },
  login: (email, password) => {
    const p = get().profile;
    if (email === p.email && password === p.password) { set({ loggedIn:true }); return { ok:true }; }
    return { ok:false, error:'Неверный email или пароль' };
  },
  logout: () => set({ loggedIn:false }),
  addGrade: (grade) => set((s) => ({ grades: [{ ...grade, id:id() }, ...s.grades], activity:[{ id:id(), date:grade.date, type:'grade', title:grade.topic, minutes:25, value:grade.score }, ...s.activity] })),
  addKnowledge: (item) => set((s) => ({ knowledge: [{ ...item, id:id(), addedAt:today(), lastReview: undefined, nextReview: nextReviewDate(1), interval:1, mistakes:0, reviews:0, memoryStrength:25 }, ...s.knowledge], activity:[{ id:id(), date:today(), type:'knowledge', title:item.german, minutes:10, value:1 }, ...s.activity] })),
  reviewItem: (itemId, quality) => set((s) => ({ knowledge: s.knowledge.map((k) => {
    if (k.id !== itemId) return k;
    const interval = quality === 'bad' ? 1 : quality === 'ok' ? 3 : Math.min((k.interval || 3) * 2, 30);
    const delta = quality === 'bad' ? -15 : quality === 'ok' ? 8 : 18;
    return { ...k, interval, lastReview:today(), nextReview: nextReviewDate(interval), status: quality === 'good' ? 'known' : quality === 'ok' ? 'learning' : 'review', mistakes: quality === 'bad' ? k.mistakes + 1 : k.mistakes, reviews:k.reviews+1, memoryStrength: Math.max(0, Math.min(100, k.memoryStrength + delta)) };
  }), activity:[{ id:id(), date:today(), type:'review', title:'Повторение карточки', minutes:5, value: quality==='good'?5:quality==='ok'?3:1 }, ...s.activity] })),
  toggleLessonTask: (lessonId, taskId) => set((s)=>({ lessons:s.lessons.map(l=>l.id!==lessonId?l:{...l, status:'in_progress', tasks:l.tasks.map(t=>t.id===taskId?{...t,status:t.status==='done'?'todo':'done'}:t)}) })),
  requestAiReview: (lessonId) => set((s)=>({ lessons:s.lessons.map(l=>{
    if(l.id!==lessonId) return l;
    const doneWeight = l.tasks.reduce((sum,t)=>sum+(t.status==='done'?t.weight:0),0);
    const score = doneWeight >= 85 ? 5 : doneWeight >= 65 ? 4 : doneWeight >= 40 ? 3 : 2;
    const grade: Grade = { id:id(), date:today(), type:'Разговор', score:score as 1|2|3|4|5, topic:l.title, comment:`AI проверка: выполнение ${doneWeight}%.`, quarter:1, good:['Задание доведено до проверки','Есть понятная учебная цель'], bad:score<4?['Не все шаги задания завершены','Нужно больше практики перед зачетом']:['Можно усложнять формулировки'], aiRecommendation:score<4?'Повторить тему и пройти проверку еще раз.':'Добавить удачные фразы в базу знаний.', sourceLessonId:l.id };
    setTimeout(()=>get().addGrade(grade),0);
    return {...l, status:'completed', aiFeedback:`AI оценка: ${score}/5. ${grade.aiRecommendation}`, gradeId:grade.id};
  }) })),
  toggleRecommendationStep: (recId, stepId) => set((s)=>({ recommendations:s.recommendations.map(r=>r.id!==recId?r:{...r,status:'in_progress',steps:r.steps.map(st=>st.id===stepId?{...st,status:st.status==='done'?'todo':'done'}:st)}) })),
  gradeRecommendation: (recId, quality) => set((s)=>({ recommendations:s.recommendations.map(r=>r.id===recId?{...r,status:'done',quality}:r), activity:[{ id:id(), date:today(), type:'ai', title:'AI-рекомендация выполнена', minutes:20, value:quality }, ...s.activity] })),
  sendAiMessage: (text, mode='tutor') => set((s)=>({ messages:[...s.messages,{id:id(),role:'user',text,createdAt:new Date().toISOString()},{id:id(),role:'assistant',text:buildAiReply(text, get(), mode),createdAt:new Date().toISOString()}], activity:[{id:id(),date:today(),type:'ai',title:'AI диалог',minutes:5,value:1},...s.activity] })),
  setTheme: (theme) => set({ theme }),
  setLanguage: (language) => set({ language }),
  setThemeSettings: (settings) => set((s)=>({ themeSettings:{...s.themeSettings,...settings} })),
  exportData: () => JSON.stringify(get(), null, 2),
  importData: (raw) => { try { const parsed = JSON.parse(raw); set(parsed); return { ok:true }; } catch { return { ok:false, error:'Файл backup поврежден или это не JSON' }; } },
}), { name:'deutsch-learning-os' }));
