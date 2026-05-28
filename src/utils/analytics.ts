import { ActivityLog, AiRecommendationTask, Grade, KnowledgeItem, Lesson, RoadmapNode } from '../types';

export const avg = (nums: number[]) => nums.length ? +(nums.reduce((a,b)=>a+b,0)/nums.length).toFixed(1) : 0;
export const lessonProgress = (lesson: Lesson) => Math.round(lesson.tasks.reduce((s,t)=>s+(t.status==='done'?t.weight:0),0));
export const recommendationProgress = (r: AiRecommendationTask) => Math.round(r.steps.reduce((s,t)=>s+(t.status==='done'?t.weight:0),0));
export const averageGrade = (grades: Grade[]) => avg(grades.map(g=>g.score));
export const weakTopics = (grades: Grade[]) => grades.filter(g=>g.score <= 3).map(g=>g.topic).slice(0,4);
export const strongTopics = (grades: Grade[]) => grades.filter(g=>g.score >= 4).map(g=>g.topic).slice(0,4);
export const knowledgeCoverage = (knowledge: KnowledgeItem[]) => knowledge.length ? Math.round(avg(knowledge.map(k=>k.memoryStrength))) : 0;
export const skillAverage = (grades: Grade[], type: string) => avg(grades.filter(g=>g.type===type).map(g=>g.score));
export const roadmapProgress = (nodes: RoadmapNode[]) => {
  const topics = nodes.flatMap(n=>n.topics);
  if (!topics.length) return 0;
  const points = topics.map(t => t.status === 'completed' ? 100 : t.status === 'needs_review' ? 55 : t.status === 'active' ? 35 : 0);
  return Math.round(avg(points));
};
export const weekActivity = (activity: ActivityLog[]) => {
  const days = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
  return days.map((day, index) => {
    const items = activity.filter((_, i)=>i % 7 === index);
    return { day, minutes: items.reduce((s,a)=>s+a.minutes,0), reviews: items.filter(a=>a.type==='review').length, tasks: items.length, phrases: items.filter(a=>a.type==='knowledge').length };
  });
};
export const currentStreak = (activity: ActivityLog[], restDays = 2) => {
  const activeDates = new Set(activity.map(a=>a.date));
  const today = new Date();
  let streak = 0;
  let restsLeft = restDays;
  for (let i=0; i<30; i++) {
    const d = new Date(today); d.setDate(today.getDate()-i);
    const iso = d.toISOString().slice(0,10);
    if (activeDates.has(iso)) streak++;
    else if (restsLeft > 0) restsLeft--;
    else break;
  }
  return { streak, restsLeft };
};
export const forecastB1 = (activity: ActivityLog[], grades: Grade[]) => {
  const weeklyMinutes = activity.reduce((s,a)=>s+a.minutes,0) || 1;
  const score = averageGrade(grades) || 3;
  const baseMonths = score >= 4 ? 7 : score >= 3.5 ? 9 : 12;
  const modifier = weeklyMinutes >= 300 ? -2 : weeklyMinutes < 120 ? 3 : 0;
  return Math.max(4, baseMonths + modifier);
};
