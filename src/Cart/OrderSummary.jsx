import React from "react";

const OrderSummary = ({ subtotal, discount, delivery }) => {
  const total = subtotal - discount + delivery;

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
      <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6">Order Summary</h2>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <span>Subtotal</span>
          <span className="font-bold text-slate-900 dark:text-white">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <span>Discount</span>
          <span className="font-bold text-emerald-500">-${discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <span>Delivery</span>
          <span className="font-bold text-slate-900 dark:text-white">${delivery.toFixed(2)}</span>
        </div>
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between">
          <span className="text-lg font-bold text-slate-900 dark:text-white">Total</span>
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">${total.toFixed(2)}</span>
        </div>
      </div>

      <button className="w-full bg-slate-950 dark:bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 dark:hover:bg-emerald-500 transition-all active:scale-[0.98] mb-3">
        Checkout Now
      </button>
      <button className="w-full bg-transparent text-slate-500 dark:text-slate-400 py-3 rounded-2xl font-bold hover:text-slate-900 dark:hover:text-white transition-all">
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderSummary;