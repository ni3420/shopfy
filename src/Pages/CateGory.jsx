import React, { useState } from 'react';
import Beauty from '../ProductCateGory/Beauty';
import Fragrances from '../ProductCateGory/Fragrances';
import Furniture from '../ProductCateGory/Furniture';
import Groceries from '../ProductCateGory/Groceries';

const CateGory = () => {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Products' },
    { id: 'beauty', label: 'Beauty' },
    { id: 'fragrances', label: 'Fragrances' },
    { id: 'furniture', label: 'Furniture' },
    { id: 'groceries', label: 'Groceries' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 pt-12 text-center">
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8">
          Browse by Category
        </h2>
        
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pb-20">

        {(activeTab === 'all' || activeTab === 'groceries') && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Groceries />
          </section>
        )}
        

        {(activeTab === 'all' || activeTab === 'fragrances') && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Fragrances />
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'furniture') && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Furniture />
          </section>
        )}

        {(activeTab === 'all' || activeTab === 'beauty') && (
          <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Beauty />
          </section>
        )}

        
      </div>
    </div>
  );
};

export default CateGory;