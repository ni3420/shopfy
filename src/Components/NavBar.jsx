import React, { useContext, useState } from "react";
import { ShoppingCart, User, Menu, X, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import cartService from "../AppWrite/CartService";
import { UseContextApi } from "../Context/UseContextApi";
// import authService from "../AppWrite/auth";
// import toast from "react-hot-toast";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();
  const { user, logout,loading } = useContext(UseContextApi);

  const { data } = useQuery({
    queryKey: ["cart", user?.$id],
    queryFn: async () => await cartService.getUserCart(user?.$id),
    enabled: !!user?.$id,
  });

  // const logout=async()=>{
  //   const res=await authService.logout()
  //   if(res)
  //   {
  //     toast.success("user will be logout..")
  //     return res
  //   }else{
  //     toast.error("due to some error not logout..")
  //   }
  // }

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 dark:bg-slate-950/80 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-black text-xl">S</span>
            </div>
            <span className="text-xl font-bold tracking-tighter text-slate-900 dark:text-white uppercase">
              Shop<span className="text-emerald-500">fy</span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={({isActive}) => `text-sm font-semibold transition-colors ${isActive ? 'text-emerald-500' : 'text-slate-600 dark:text-slate-300 hover:text-emerald-500'}`}>Home</NavLink>
            <NavLink to="/Product_list" className={({isActive}) => `text-sm font-semibold transition-colors ${isActive ? 'text-emerald-500' : 'text-slate-600 dark:text-slate-300 hover:text-emerald-500'}`}>Product</NavLink>
            <NavLink to="/deals" className={({isActive}) => `text-sm font-semibold transition-colors ${isActive ? 'text-emerald-500' : 'text-slate-600 dark:text-slate-300 hover:text-emerald-500'}`}>Deals</NavLink>
          </div>

          <div className="hidden md:flex items-center space-x-5">
            <button className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-full dark:text-slate-300 dark:hover:bg-slate-800 transition-all" onClick={() => navigate("/cart_page")}>
              <ShoppingCart size={22} />
              {user && data?.total > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {data?.total}
                </span>
              )}
            </button>

            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 hover:border-emerald-500 transition-all"
                >
                  <div className="w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium dark:text-white">{user.name.split(' ')[0]}</span>
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xl py-2 z-50">
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800" onClick={() => navigate("/profile")}>
                      <User size={16} /> Profile
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20" disabled={loading} onClick={() => logout()}>
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 transition-all active:scale-95"
              >
                <User size={18} />
                <span>Login</span>
              </button>
            )}
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button className="relative p-2 text-slate-600 dark:text-slate-300" onClick={() => navigate("/cart_page")}>
              <ShoppingCart size={22} />
              {user && data?.total > 0 && (
                <span className="absolute top-0 right-0 h-4 w-4 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{data?.total}</span>
              )}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 rounded-lg">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 pt-2 pb-6 space-y-2 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
          <NavLink to="/" className="block px-3 py-3 text-base font-bold text-slate-700 dark:text-slate-200">Home</NavLink>
          <NavLink to="/product_list" className="block px-3 py-3 text-base font-bold text-slate-700 dark:text-slate-200">Products</NavLink>
          <NavLink to="/deals" className="block px-3 py-3 text-base font-bold text-slate-700 dark:text-slate-200">Deals</NavLink>
          
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            {user ? (
              <div className="space-y-2 pt-2">
                <button className="w-full flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-white py-3 rounded-xl font-bold" onClick={() => navigate("/profile")}>
                  <User size={18} /> My Profile
                </button>
                <button className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 py-3 rounded-xl font-bold" onClick={() => logout()}>
                  <LogOut size={18} /> Logout
                </button>
              </div>
            ) : (
              <button className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white py-3 rounded-xl font-bold" onClick={() => navigate("/login")}>
                <User size={18} /> Login / Register
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;