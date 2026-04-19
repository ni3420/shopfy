import React from 'react'

const Button = ({
    type = "button",
    className = "",
    children,
    ...props
}) => {
  return (
    <button 
      type={type} 
      className={`
        flex items-center justify-center gap-2 
        px-6 py-2.5 font-bold text-sm
        bg-slate-900 text-white 
        dark:bg-emerald-600 dark:hover:bg-emerald-500 
        rounded-xl shadow-md 
        transition-all duration-200 
        active:scale-95 hover:shadow-lg 
        disabled:opacity-50 disabled:pointer-events-none
        ${className}
      `} 
      
      {...props} 
    >
      {children}
    </button>
  )
}

export default Button