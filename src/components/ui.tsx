import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export function Card({children, className=''}:{children:ReactNode;className?:string}){ return <motion.div initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:.35}} className={`glass rounded-3xl p-5 ${className}`}>{children}</motion.div>; }
export function Badge({children}:{children:ReactNode}){ return <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-200">{children}</span>; }
export function Button({children,onClick,type='button',className=''}:{children:ReactNode;onClick?:()=>void;type?:'button'|'submit';className?:string}){ return <button type={type} onClick={onClick} className={`rounded-2xl bg-cyan-400 px-4 py-2 font-semibold text-slate-950 transition hover:scale-[1.02] hover:bg-cyan-300 ${className}`}>{children}</button>; }
export function Input(props: React.InputHTMLAttributes<HTMLInputElement>){ return <input {...props} className={`w-full rounded-2xl border border-slate-700/70 bg-slate-950/60 px-4 py-3 outline-none transition focus:border-cyan-300 ${props.className||''}`} />; }
export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>){ return <select {...props} className={`w-full rounded-2xl border border-slate-700/70 bg-slate-950/60 px-4 py-3 outline-none transition focus:border-cyan-300 ${props.className||''}`} />; }
export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>){ return <textarea {...props} className={`w-full rounded-2xl border border-slate-700/70 bg-slate-950/60 px-4 py-3 outline-none transition focus:border-cyan-300 ${props.className||''}`} />; }
export function Progress({value}:{value:number}){ return <div className="h-2 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-violet-400" style={{width:`${Math.min(100,Math.max(0,value))}%`}} /></div>; }
