import { ActivityLog, AiMessage, AiRecommendationTask, Grade, KnowledgeItem, Lesson, RoadmapNode, UserProfile } from '../types';

export const initialProfile: UserProfile = {
  name: 'Blqzi',
  email: 'blqzi@example.com',
  password: '123456',
  goal: 'Ausbildung + спокойная жизнь и работа в Германии',
  level: 'A1',
  targetLevel: 'B2',
  status: 'Focused learner',
  startDate: '2026-05-20',
  dailyGoalMinutes: 45,
};

export const initialGrades: Grade[] = [
  { id:'g1', date:'2026-05-20', type:'Грамматика', score:4, topic:'Präsens: sein / haben', comment:'Хорошо, но путаешь порядок слов.', quarter:1, good:['Формы sein/haben в основном верные','Понимаешь смысл предложений'], bad:['Иногда меняешь порядок слов','Нужна практика с вопросами'], aiRecommendation:'Повторить порядок слов в простом предложении и сделать 8 коротких вопросов.' },
  { id:'g2', date:'2026-05-21', type:'Разговор', score:3, topic:'Im Supermarkt', comment:'Нужно говорить быстрее и без перевода в голове.', quarter:1, good:['Правильно выбираешь базовые фразы','Понимаешь ситуацию'], bad:['Долгие паузы перед ответом','Мало автоматизма'], aiRecommendation:'Отработать 10 фраз магазина вслух по таймеру.' },
  { id:'g3', date:'2026-05-23', type:'Словарь', score:5, topic:'Arbeit und Bewerbung', comment:'Отлично запомнил рабочие фразы.', quarter:1, good:['Хорошо вспоминаешь фразы','Используешь их в контексте'], bad:['Следующий шаг — активная речь без подсказок'], aiRecommendation:'Перейти к speaking task по Bewerbung.' },
  { id:'g4', date:'2026-05-25', type:'Аудирование', score:3, topic:'Termine vereinbaren', comment:'Сложно понимать быструю речь.', quarter:1, good:['Ключевые слова распознаешь','Понимаешь тему диалога'], bad:['Теряешь числа и время','Быстрая речь сильно снижает понимание'], aiRecommendation:'Сделать 3 коротких listening-диктанта по теме Termine.' },
  { id:'g5', date:'2026-05-27', type:'Произношение', score:4, topic:'ch / sch / ich', comment:'Прогресс есть, нужна регулярная голосовая практика.', quarter:1, good:['Звук sch стал стабильнее','Ich произносится лучше'], bad:['ch после a/o/u все еще слабый'], aiRecommendation:'Записать 12 слов с ch/sch и сравнить с эталоном.' }
];

export const initialLessons: Lesson[] = [
  { id:'l1', date:'2026-05-28', title:'Рабочая смена и просьбы', topics:['Könnten Sie...?','Ich brauche Hilfe','Dienstplan'], homework:'Записать 10 рабочих фраз и проговорить их вслух 3 раза.', status:'in_progress', deadline:'2026-05-28 21:00', tasks:[{id:'t1',text:'Выучить 10 рабочих фраз',status:'done',weight:30},{id:'t2',text:'Проговорить их вслух 3 раза',status:'todo',weight:40},{id:'t3',text:'Пройти AI-проверку ответа',status:'todo',weight:30}], aiFeedback:'Проверка еще не завершена. Нужен устный/письменный ответ для оценки.' },
  { id:'l2', date:'2026-05-29', title:'Ausbildung: собеседование', topics:['Vorstellung','Stärken','Motivation'], homework:'Составить мини-ответ: Warum möchten Sie diese Ausbildung machen?', status:'planned', deadline:'2026-05-29 21:00', tasks:[{id:'t1',text:'Написать ответ 5–7 предложений',status:'todo',weight:45},{id:'t2',text:'AI проверяет грамматику и смысл',status:'todo',weight:35},{id:'t3',text:'Добавить удачные фразы в базу знаний',status:'todo',weight:20}] },
  { id:'l3', date:'2026-05-30', title:'Аренда жилья', topics:['Miete','Kaution','Besichtigung'], homework:'Выучить 8 фраз для просмотра квартиры.', status:'planned', deadline:'2026-05-30 20:30', tasks:[{id:'t1',text:'Добавить 8 фраз в базу знаний',status:'todo',weight:35},{id:'t2',text:'Сделать mini test без перевода',status:'todo',weight:35},{id:'t3',text:'AI ставит оценку',status:'todo',weight:30}] }
];

export const initialKnowledge: KnowledgeItem[] = [
  { id:'k1', category:'Работа', german:'Ich bin zuverlässig und lerne schnell.', russian:'Я надежный и быстро учусь.', transcription:'их бин цу-фэр-лэс-их унд лэрнэ шнэлль', example:'Ich bin zuverlässig und lerne schnell, deshalb möchte ich die Ausbildung machen.', level:'A2', status:'learning', source:'lesson', skill:'Разговор', note:'Фраза для Bewerbung / собеседования.', addedAt:'2026-05-20', lastReview:'2026-05-27', nextReview:'2026-05-30', interval:3, mistakes:1, reviews:2, memoryStrength:64 },
  { id:'k2', category:'Быт', german:'Könnten Sie das bitte wiederholen?', russian:'Не могли бы вы это повторить?', transcription:'кённтэн зи дас биттэ вида-холэн', example:'Entschuldigung, könnten Sie das bitte wiederholen?', level:'A1', status:'review', source:'mistake', skill:'Аудирование', note:'Нужна для реальных разговоров, когда не понял речь.', addedAt:'2026-05-21', lastReview:'2026-05-27', nextReview:'2026-05-28', interval:1, mistakes:2, reviews:3, memoryStrength:41 },
  { id:'k3', category:'Документы', german:'Ich möchte einen Termin vereinbaren.', russian:'Я хотел бы назначить встречу/термин.', transcription:'их мёхтэ айнэн тэрмин фэ-райнбарэн', example:'Guten Tag, ich möchte einen Termin vereinbaren.', level:'A1', status:'known', source:'ai', skill:'Разговор', note:'Базовая фраза для врачей, амтов, собеседований.', addedAt:'2026-05-18', lastReview:'2026-05-25', nextReview:'2026-06-05', interval:14, mistakes:0, reviews:4, memoryStrength:86 }
];

export const roadmap: RoadmapNode[] = [
  { level:'A1', title:'База выживания', objective:'Понимать и говорить в базовых бытовых ситуациях.', topics:[
    { id:'a1-1', title:'Представиться и рассказать о себе', description:'Имя, возраст, страна, работа, цель обучения.', status:'completed', requiredScore:4, currentScore:4, skills:[{name:'Разговор',progress:80,status:'verified'},{name:'Грамматика',progress:65,status:'active'}] },
    { id:'a1-2', title:'Магазин и простые просьбы', description:'Купить, спросить цену, попросить повторить.', status:'needs_review', requiredScore:4, currentScore:3, skills:[{name:'Разговор',progress:55,status:'active'},{name:'Аудирование',progress:35,status:'active'}] },
    { id:'a1-3', title:'Назначить встречу', description:'Termin vereinbaren, время, дата, причины.', status:'active', requiredScore:4, currentScore:3, skills:[{name:'Словарь',progress:72,status:'active'},{name:'Аудирование',progress:42,status:'active'}] }
  ]},
  { level:'A2', title:'Быт и работа', objective:'Решать бытовые и рабочие задачи без постоянного перевода.', topics:[
    { id:'a2-1', title:'Опыт и рабочий день', description:'Описать смену, обязанности, проблемы.', status:'active', requiredScore:4, currentScore:3, skills:[{name:'Словарь',progress:60,status:'active'},{name:'Разговор',progress:45,status:'active'}] },
    { id:'a2-2', title:'Документы и аренда', description:'Письма, договор, Besichtigung, Kaution.', status:'locked', requiredScore:4, skills:[{name:'Письмо',progress:10,status:'locked'},{name:'Словарь',progress:25,status:'locked'}] }
  ]},
  { level:'B1', title:'Ausbildung-ready', objective:'Проходить собеседования, писать письма и решать рабочие конфликты.', topics:[
    { id:'b1-1', title:'Собеседование на Ausbildung', description:'Motivation, Stärken, Schwächen, Berufsziel.', status:'locked', requiredScore:4, skills:[{name:'Разговор',progress:12,status:'locked'},{name:'Грамматика',progress:8,status:'locked'}] }
  ]}
];

export const initialMessages: AiMessage[] = [{ id:'m1', role:'assistant', text:'Я готов работать как AI-репетитор: проверять ответы, ставить 5-бальную оценку, создавать задания и обновлять дневник. Сейчас это локальная симуляция без OpenAI API, но она учитывает твои оценки, слабые темы и базу знаний.', createdAt:new Date().toISOString() }];

export const initialRecommendations: AiRecommendationTask[] = [
  { id:'r1', title:'Закрыть слабую тему: Termine vereinbaren', reason:'Последняя оценка по аудированию — 3. Быстрая речь и числа пока слабые.', linkedTopic:'Termine vereinbaren', status:'in_progress', createdAt:'2026-05-28', steps:[{id:'s1',text:'Повторить 3 фразы из базы знаний',status:'done',weight:30},{id:'s2',text:'Сделать listening mini-test',status:'todo',weight:40},{id:'s3',text:'Отправить ответ AI на проверку',status:'todo',weight:30}]}
];

export const initialActivity: ActivityLog[] = [
  { id:'a1', date:'2026-05-20', type:'grade', title:'Грамматика', minutes:35, value:4 },
  { id:'a2', date:'2026-05-21', type:'lesson', title:'Im Supermarkt', minutes:45, value:3 },
  { id:'a3', date:'2026-05-23', type:'knowledge', title:'Bewerbung phrases', minutes:50, value:5 },
  { id:'a4', date:'2026-05-25', type:'review', title:'Termine', minutes:25, value:3 },
  { id:'a5', date:'2026-05-27', type:'ai', title:'Pronunciation check', minutes:30, value:4 },
];
