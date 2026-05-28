export type GradeType = 'Разговор' | 'Грамматика' | 'Словарь' | 'Аудирование' | 'Произношение' | 'Письмо';
export type Level = 'A1' | 'A2' | 'B1' | 'B2';
export type KnowledgeCategory = 'Фразы' | 'Слова' | 'Диалоги' | 'Грамматика' | 'Быт' | 'Работа' | 'Аренда' | 'Документы' | 'Магазин' | 'Общение' | 'Ошибки' | 'Конспект';
export type KnowledgeStatus = 'new' | 'learning' | 'review' | 'known';
export type LessonStatus = 'planned' | 'in_progress' | 'ai_review' | 'completed' | 'missed';
export type TaskCheckStatus = 'todo' | 'done';
export type AiMode = 'tutor' | 'exam' | 'grammar' | 'speaking' | 'review';

export interface UserProfile {
  name: string;
  email: string;
  password: string;
  goal: string;
  level: Level;
  status: string;
  targetLevel: Level;
  startDate: string;
  dailyGoalMinutes: number;
}

export interface Grade {
  id: string;
  date: string;
  type: GradeType;
  score: 1 | 2 | 3 | 4 | 5;
  topic: string;
  comment: string;
  quarter: number;
  good: string[];
  bad: string[];
  aiRecommendation: string;
  sourceLessonId?: string;
}

export interface LessonTask {
  id: string;
  text: string;
  status: TaskCheckStatus;
  weight: number;
}

export interface Lesson {
  id: string;
  date: string;
  title: string;
  topics: string[];
  homework: string;
  status: LessonStatus;
  deadline: string;
  tasks: LessonTask[];
  aiFeedback?: string;
  gradeId?: string;
}

export interface KnowledgeItem {
  id: string;
  category: KnowledgeCategory;
  german: string;
  russian: string;
  transcription: string;
  example: string;
  level: Level;
  status: KnowledgeStatus;
  source: 'lesson' | 'manual' | 'ai' | 'mistake';
  skill: GradeType;
  note: string;
  addedAt: string;
  lastReview?: string;
  nextReview: string;
  interval: number;
  mistakes: number;
  reviews: number;
  memoryStrength: number;
}

export interface RoadmapSkill {
  name: GradeType;
  progress: number;
  status: 'locked' | 'active' | 'verified';
}

export interface RoadmapTopic {
  id: string;
  title: string;
  description: string;
  status: 'locked' | 'active' | 'needs_review' | 'completed';
  requiredScore: number;
  currentScore?: number;
  skills: RoadmapSkill[];
}

export interface RoadmapNode {
  level: Level;
  title: string;
  objective: string;
  topics: RoadmapTopic[];
}

export interface AiMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  createdAt: string;
}

export interface AiRecommendationTask {
  id: string;
  title: string;
  reason: string;
  steps: LessonTask[];
  status: 'new' | 'in_progress' | 'done';
  quality?: 1 | 2 | 3 | 4 | 5;
  createdAt: string;
  linkedTopic: string;
}

export interface ActivityLog {
  id: string;
  date: string;
  type: 'lesson' | 'review' | 'knowledge' | 'ai' | 'grade';
  title: string;
  minutes: number;
  value: number;
}

export interface ThemeSettings {
  accent: 'cyan' | 'violet' | 'emerald' | 'amber' | 'rose';
  density: 'comfortable' | 'compact';
  blur: number;
}
