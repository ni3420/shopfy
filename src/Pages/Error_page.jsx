import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Ghost } from 'lucide-react';

const Error_page = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="relative mb-8 flex justify-center">
          <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full" />
          <Ghost size={120} className="text-emerald-500 relative animate-bounce" />
        </div>

        <h1 className="text-9xl font-black text-slate-200 dark:text-slate-800 tracking-tighter">
          404
        </h1>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mt-[-40px] mb-4">
          Lost in Space?
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-10 leading-relaxed">
          The page you are looking for doesn't exist or has been moved. 
          Don't worry, even the best explorers get lost sometimes.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all active:scale-95"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
          
          <button 
            onClick={() => navigate('/')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-bold shadow-lg shadow-emerald-500/25 transition-all active:scale-95"
          >
            <Home size={18} />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error_page;