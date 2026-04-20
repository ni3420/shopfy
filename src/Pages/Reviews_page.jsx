import React from 'react';
import { Star, User } from 'lucide-react';

const ReviewsSection = ({ reviews = [] }) => {
  return (
    <div className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-10">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Community Reviews
        </h2>
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
          {reviews.length} Reviews
        </span>
      </div>
      
      {reviews.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800">
          <p className="text-slate-500 dark:text-slate-400">Be the first to share your thoughts!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review,index) => (
            <div 
              key={review.$id || review.id || index} 
              className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {/* User Avatar Circle */}
                  <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                    {review.reviewerName?.charAt(0).toUpperCase() || <User size={18} />}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                      {review.reviewerName}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-500">
                      Verified Purchaser
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-lg">
                  <Star size={12} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-bold ml-1 text-slate-700 dark:text-slate-300">
                    {review.rating}
                  </span>
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed italic">
                "{review.comment}"
              </p>
              
              <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-200 dark:text-slate-700"} 
                    />
                  ))}
                </div>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;