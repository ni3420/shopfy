
const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-emerald-500/20 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 bg-emerald-500/10 blur-xl rounded-full"></div>
      </div>
      
      <div className="flex flex-col items-center">
        <p className="text-xl font-black tracking-widest text-slate-900 dark:text-white uppercase italic">
          Shopfy
        </p>
        <span className="text-xs font-medium text-slate-400 animate-pulse">
          Fetching your experience...
        </span>
      </div>
    </div>
  );
};

export default LoadingSpinner;