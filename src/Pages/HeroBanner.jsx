import React from "react";

const HeroBanner = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute -top-24 -left-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="absolute -bottom-24 -right-20 h-96 w-96 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-28 flex flex-col md:flex-row items-center justify-between gap-12">
        
        <div className="flex-1 text-center md:text-left z-10">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
            New Summer Collection 2026
          </span>
          
          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight">
            Elevate Your <br />
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Digital Lifestyle
            </span>
          </h1>

          <p className="mt-6 text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed">
            Experience the next generation of premium tech and lifestyle essentials. 
            Curated quality, lightning-fast shipping, and 24/7 support.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <button className="w-full sm:w-auto bg-emerald-500 text-slate-950 px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(52,211,153,0.4)] transition-all active:scale-95">
              Shop Collection
            </button>

            <button className="w-full sm:w-auto border border-slate-700 bg-slate-900/50 backdrop-blur-md px-8 py-4 rounded-full font-bold text-lg hover:bg-slate-800 transition-all">
              View Flash Deals
            </button>
          </div>
        </div>

        <div className="flex-1 relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop"
            alt="Premium Tech"
            className="relative w-full max-w-[500px] rounded-3xl object-cover shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;