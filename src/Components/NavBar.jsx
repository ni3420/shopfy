import React, { useState } from "react";
import { ShoppingCart, User, Menu, X, Search, Moon, Sun } from "lucide-react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 dark:bg-slate-950/80 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xl">S</span>
            </div>
            <span className="text-xl font-bold tracking-tighter text-slate-900 dark:text-white uppercase">
              Shop<span className="text-emerald-500">Mern</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-sm font-semibold text-slate-600 hover:text-emerald-500 dark:text-slate-300 dark:hover:text-emerald-400 transition-colors">Home</a>
            <a href="#" className="text-sm font-semibold text-slate-600 hover:text-emerald-500 dark:text-slate-300 dark:hover:text-emerald-400 transition-colors">Categories</a>
            <a href="#" className="text-sm font-semibold text-slate-600 hover:text-emerald-500 dark:text-slate-300 dark:hover:text-emerald-400 transition-colors">Deals</a>
          </div>

          <div className="hidden md:flex items-center space-x-5">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-slate-100 dark:bg-slate-900 border-none rounded-full py-1.5 px-4 pl-10 text-sm focus:ring-2 focus:ring-emerald-500 w-48 transition-all duration-300 focus:w-64 dark:text-white"
              />
              <Search className="absolute left-3 top-2 text-slate-400" size={16} />
            </div>

            <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full dark:text-slate-300 dark:hover:bg-slate-800 transition-all">
              <ShoppingCart size={22} />
              <span className="absolute top-0 right-0 h-4 w-4 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </button>

            <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-all active:scale-95">
              <User size={18} />
              <span>Login</span>
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button className="relative p-2 text-slate-600 dark:text-slate-300">
              <ShoppingCart size={22} />
              <span className="absolute top-0 right-0 h-4 w-4 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">0</span>
            </button>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100 border-t border-slate-100 dark:border-slate-800' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pt-4 pb-6 space-y-2 bg-white dark:bg-slate-950">
          <a href="#" className="block px-3 py-3 text-base font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl">Home</a>
          <a href="#" className="block px-3 py-3 text-base font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl">Categories</a>
          <a href="#" className="block px-3 py-3 text-base font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl">Deals</a>
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <button className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white py-3 rounded-xl font-bold">
              <User size={18} />
              Login / Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;