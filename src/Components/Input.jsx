import React, { useId, forwardRef } from "react";

const Input = ({ 
    label, 
    type = "text", 
    className = "", 
    error = "",
    ...props 
}, ref) => {
    const id = useId();
    
    return (
        <div className="w-full space-y-2">
            {label && (
                <label 
                    htmlFor={id} 
                    className="block text-sm font-bold text-slate-700 dark:text-slate-300 ml-1"
                >
                    {label}
                </label>
            )}
            
            <div className="relative">
                <input
                    type={type}
                    id={id}
                    ref={ref}
                    className={`
                        w-full px-4 py-3 rounded-xl border transition-all duration-200 outline-none
                        bg-slate-50 dark:bg-slate-900 
                        text-slate-900 dark:text-slate-100
                        placeholder:text-slate-400 dark:placeholder:text-slate-600
                        ${error 
                            ? "border-red-500 focus:ring-2 focus:ring-red-200 dark:focus:ring-red-900/30" 
                            : "border-slate-200 dark:border-slate-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                        }
                        ${className}
                    `}
                    {...props}
                />
            </div>

            {error && (
                <p className="text-xs font-semibold text-red-500 ml-1 animate-in fade-in slide-in-from-top-1">
                    {error}
                </p>
            )}
        </div>
    );
}

export default forwardRef(Input);