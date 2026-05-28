import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Diary from './pages/Diary';
import Knowledge from './pages/Knowledge';
import AiAssistant from './pages/AiAssistant';
import Roadmap from './pages/Roadmap';
import Analytics from './pages/Analytics';
import ReportCard from './pages/ReportCard';
import Settings from './pages/Settings';
import { useLearningStore } from './store/useLearningStore';

export default function App(){ const loggedIn=useLearningStore(s=>s.loggedIn); if(!loggedIn) return <Login/>; return <Routes><Route element={<AppLayout/>}><Route index element={<Dashboard/>}/><Route path="diary" element={<Diary/>}/><Route path="report" element={<ReportCard/>}/><Route path="knowledge" element={<Knowledge/>}/><Route path="ai" element={<AiAssistant/>}/><Route path="roadmap" element={<Roadmap/>}/><Route path="analytics" element={<Analytics/>}/><Route path="settings" element={<Settings/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Route></Routes> }
