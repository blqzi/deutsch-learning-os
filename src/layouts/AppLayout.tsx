import { NavLink, Outlet } from 'react-router-dom';
import { BarChart3, BookOpen, Brain, CalendarDays, GraduationCap, Home, LogOut, Map, Settings, ClipboardList } from 'lucide-react';
import { useLearningStore } from '../store/useLearningStore';

const links = [
  ['/', Home, 'Dashboard'], ['/diary', CalendarDays, 'Дневник'], ['/report', ClipboardList, 'Табель'], ['/knowledge', BookOpen, 'База знаний'], ['/ai', Brain, 'AI'], ['/roadmap', Map, 'Roadmap'], ['/analytics', BarChart3, 'Аналитика'], ['/settings', Settings, 'Настройки']
] as const;
export default function AppLayout(){
 const profile = useLearningStore(s=>s.profile); const logout = useLearningStore(s=>s.logout);
 return <div className="neon min-h-screen p-4 md:p-6">
  <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-[270px_1fr]">
   <aside className="glass sticky top-6 h-fit rounded-3xl p-4">
    <div className="mb-7 flex items-center gap-3"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300 text-slate-950"><GraduationCap /></div><div><h1 className="font-bold">Deutsch Learning OS</h1><p className="text-sm text-slate-400">{profile.level} → {profile.targetLevel}</p></div></div>
    <nav className="grid gap-2">{links.map(([to,Icon,label])=><NavLink key={to} to={to} className={({isActive})=>`flex items-center gap-3 rounded-2xl px-4 py-3 transition ${isActive?'bg-cyan-300/15 text-cyan-200':'text-slate-400 hover:bg-white/5 hover:text-white'}`}><Icon size={18}/>{label}</NavLink>)}</nav>
    <button onClick={logout} className="mt-7 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-slate-400 hover:bg-red-500/10 hover:text-red-200"><LogOut size={18}/>Выйти</button>
   </aside>
   <main className="min-w-0"><Outlet /></main>
  </div>
 </div>;
}
