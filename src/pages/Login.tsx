import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Button, Select } from '../components/ui';
import { useLearningStore } from '../store/useLearningStore';

const loginSchema = z.object({ email: z.string().email('Введите email'), password: z.string().min(1, 'Введите пароль') });
const registerSchema = z.object({
  name: z.string().min(2, 'Введите имя'), email: z.string().email('Введите email'), password: z.string().min(6, 'Минимум 6 символов'), level: z.enum(['A1','A2','B1','B2']), targetLevel: z.enum(['A1','A2','B1','B2']), goal: z.string().min(8, 'Опиши цель обучения')
});
type LoginForm = z.infer<typeof loginSchema>; type RegisterForm = z.infer<typeof registerSchema>;
const input = 'w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20';

export default function Login(){
 const [mode,setMode]=useState<'login'|'register'>('login'); const [error,setError]=useState('');
 const login = useLearningStore(s=>s.login); const registerUser=useLearningStore(s=>s.registerUser); const profile=useLearningStore(s=>s.profile);
 const lf=useForm<LoginForm>({resolver:zodResolver(loginSchema), defaultValues:{email:profile.email,password:profile.password}});
 const rf=useForm<RegisterForm>({resolver:zodResolver(registerSchema), defaultValues:{name:'Blqzi',email:profile.email,password:profile.password,level:profile.level,targetLevel:profile.targetLevel,goal:profile.goal}});
 const onLogin=(v:LoginForm)=>{ const res=login(v.email,v.password); if(!res.ok) setError(res.error || 'Ошибка входа'); };
 const onRegister=(v:RegisterForm)=>{ const res=registerUser(v); if(!res.ok) setError(res.error || 'Ошибка регистрации'); };
 return <div className="neon grid min-h-screen place-items-center p-6"><motion.div initial={{opacity:0,scale:.96,y:20}} animate={{opacity:1,scale:1,y:0}} className="glass w-full max-w-xl rounded-[2rem] p-8">
  <p className="mb-2 text-sm text-cyan-200">Personal Learning Operating System</p><h1 className="text-4xl font-black tracking-tight">Deutsch Learning OS</h1><p className="mt-3 text-slate-400">Электронный дневник, база знаний и AI-проверка для подготовки к Ausbildung.</p>
  <div className="mt-7 grid grid-cols-2 rounded-2xl bg-white/5 p-1"><button onClick={()=>{setMode('login');setError('')}} className={`rounded-xl py-2 font-semibold ${mode==='login'?'bg-cyan-300 text-slate-950':'text-slate-400'}`}>Вход</button><button onClick={()=>{setMode('register');setError('')}} className={`rounded-xl py-2 font-semibold ${mode==='register'?'bg-cyan-300 text-slate-950':'text-slate-400'}`}>Регистрация</button></div>
  {error && <p className="mt-4 rounded-2xl border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-200">{error}</p>}
  {mode==='login' ? <form onSubmit={lf.handleSubmit(onLogin)} className="mt-6 grid gap-4"><input className={input} placeholder="Email" {...lf.register('email')} />{lf.formState.errors.email&&<p className="text-sm text-red-300">{lf.formState.errors.email.message}</p>}<input className={input} placeholder="Пароль" type="password" {...lf.register('password')} />{lf.formState.errors.password&&<p className="text-sm text-red-300">{lf.formState.errors.password.message}</p>}<Button type="submit" className="w-full py-4">Войти</Button><p className="text-center text-xs text-slate-500">Локальная авторизация для GitHub Pages. Для личного дневника нормально; для реальной защиты позже нужен Firebase/Supabase Auth.</p></form> : <form onSubmit={rf.handleSubmit(onRegister)} className="mt-6 grid gap-4"><input className={input} placeholder="Имя" {...rf.register('name')} /><input className={input} placeholder="Email" {...rf.register('email')} /><input className={input} placeholder="Пароль" type="password" {...rf.register('password')} /><div className="grid gap-3 sm:grid-cols-2"><Select {...rf.register('level')}><option>A1</option><option>A2</option><option>B1</option><option>B2</option></Select><Select {...rf.register('targetLevel')}><option>A1</option><option>A2</option><option>B1</option><option>B2</option></Select></div><input className={input} placeholder="Цель обучения" {...rf.register('goal')} />{Object.values(rf.formState.errors)[0]?.message && <p className="text-sm text-red-300">{Object.values(rf.formState.errors)[0]?.message as string}</p>}<Button type="submit" className="w-full py-4">Создать профиль</Button></form>}
 </motion.div></div>;
}
