import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import cartService from "../AppWrite/CartService";
import toast from "react-hot-toast";
import {UseContextApi} from "../Context/UseContextApi"
import authService from "../AppWrite/auth";

const Card = ({ product }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {user}=useContext(UseContextApi)

  const Carthandler = async (e) => {
    e.stopPropagation();
    setLoading(true);
    const toastId = toast.loading("Adding to cart...");

    try {
      const response = await cartService.addToCart({...product,quantity:1},user.targets[0].userId);
      if (response) {
        toast.success(`${product.title} added!`, { id: toastId });
      }
    } catch (error) {
      console.log(error)
      toast.error("Could not add to cart", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl dark:bg-slate-900 dark:shadow-none dark:ring-1 dark:ring-slate-800">
      
      <div 
        className="relative aspect-[4/3] w-full overflow-hidden cursor-pointer" 
        onClick={() => navigate(`Products_details/${product.title}/${product.id}`)}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-900 backdrop-blur-sm dark:bg-slate-800/90 dark:text-slate-100">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h2 className="line-clamp-1 text-base font-bold text-slate-800 transition-colors dark:text-slate-100 sm:text-lg">
          {product.title}
        </h2>

        <div className="mt-1.5 flex items-center gap-1">
          <span className="text-sm text-amber-500">★</span>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {product.rating}
          </span>
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between gap-2">
          <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 sm:text-xl">
            ${product.price}
          </span>

          <button 
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition-all active:scale-95 hover:bg-slate-700 disabled:opacity-70 disabled:cursor-not-allowed dark:bg-emerald-600 dark:hover:bg-emerald-500 sm:px-5 sm:text-sm" 
            onClick={Carthandler}
          >
            {loading ? (
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
            ) : null}
            {loading ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default Card;