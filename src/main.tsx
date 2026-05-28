import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { useLearningStore } from './store/useLearningStore';

function Root(){
 const theme = useLearningStore(s=>s.theme);
 useEffect(()=>{ document.body.className = theme === 'light' ? 'light' : ''; },[theme]);
 return <HashRouter><App /></HashRouter>;
}
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><Root /></React.StrictMode>);
