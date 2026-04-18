import React from "react";
import { Trash2, Plus, Minus } from "lucide-react";

const CartItem = ({ item, onUpdateQty, onRemove }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 mb-4 transition-all hover:shadow-md">
      <div className="w-24 h-24 flex-shrink-0 bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden">
        <img src={item.thumbnail} alt={item.title} className="w-full h-full object-contain" />
      </div>

      <div className="flex-1 text-center sm:text-left">
        <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">{item.title}</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">${item.price}</p>
      </div>

      <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
        <button 
          onClick={() => onUpdateQty(item.$id, item.quantity - 1)}
          className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-colors"
        >
          <Minus size={16} className="text-slate-600 dark:text-slate-300" />
        </button>
        <span className="px-4 font-bold text-slate-900 dark:text-white">{item.quantity}</span>
        <button 
          onClick={() => onUpdateQty(item.$id, item.quantity + 1)}
          className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-colors"
        >
          <Plus size={16} className="text-slate-600 dark:text-slate-300" />
        </button>
      </div>

      <div className="hidden sm:block text-right min-w-[100px]">
        <p className="text-lg font-black text-emerald-600 dark:text-emerald-400">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      <button 
        onClick={() => onRemove(item.$id)}
        className="p-2 text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};

export default CartItem;