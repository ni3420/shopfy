import React, { useContext, useState,  } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UseContextApi } from '../Context/UseContextApi';
import Related_Products from './Related_Products';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import cartService from '../AppWrite/CartService';
import toast from "react-hot-toast"
import ReviewsSection from './Reviews_page';

const ProductDetails = () => {
    const { id } = useParams();
    const {data,user} = useContext(UseContextApi);
    const [mainImage, setMainImage] = useState('');
    const queryClient=useQueryClient()

     const {data:items}=useQuery({
    queryKey:["items",user?.$id],
    queryFn:async()=>{
      const res=await cartService.getUserCart(user?.$id)
      return res.documents || []

    },
    enabled:!!user?.$id
  })
  const navigate=useNavigate()

    const product = data?.products?.find((p) => p.id === Number(id));
   
// console.log(items)
// const finder=items?.find((p)=>p.productId==product.id)
// console.log(finder)

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center dark:text-white bg-slate-950">
                <p className="text-xl font-medium">Product not found.</p>
            </div>
        );
    }

  const BuyNow=async()=>{
      if (!user) {
    toast.error("Please login to buy the Product");
    
    
    navigate("/login", { state: { from: window.location.pathname } });
    return;
    
  }
  else{
    navigate("/address", { state: { from: window.location.pathname } });
    return;
  }

  }

 
  const Carthandler = async (e) => {
    e.stopPropagation();
     if (!user) {
    toast.error("Please login to add items to cart");
    
    
    navigate("/login", { state: { from: window.location.pathname } });
    return;
  }
    const isDuplicate = items.find((items) => items.productId == product.id);

    if (isDuplicate) {
        toast.error("Item already in cart");
        return;
    }

    const toastId = toast.loading("Adding to cart...");

    try {
        const response = await cartService.addToCart(
            { ...product, quantity: 1 },
            user?.$id
        );

        if (response) {
            toast.success(`${product.title} added!`, { id: toastId });
            queryClient.invalidateQueries({ queryKey: ["items"] });
        }
    } catch (error) {
        console.error(error);
        toast.error("Could not add to cart", { id: toastId });
    } 
};

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-slate-100 dark:border-slate-800">
                <div className="flex flex-col lg:flex-row gap-10 p-6 sm:p-10">
                    
                    <div className="flex-1 space-y-4">
                        <div className="aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                            <img 
                                src={mainImage || product.thumbnail} 
                                alt={product.title} 
                                className="w-full h-full object-contain transition-all duration-500"
                            />
                        </div>
                        
                        {product.images && product.images.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                                {product.images.map((img, index) => (
                                    <button 
                                        key={index}
                                        onClick={() => setMainImage(img)}
                                        className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${
                                            mainImage === img ? 'border-emerald-500 scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                                        }`}
                                    >
                                        <img src={img} alt="preview" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest">
                                {product.brand || 'Premium'}
                            </span>
                            <span className="text-slate-400 dark:text-slate-500">•</span>
                            <span className="text-sm text-slate-500 dark:text-slate-400 capitalize">{product.category}</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-4">
                            {product.title}
                        </h1>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center bg-amber-100 dark:bg-amber-500/10 px-2 py-1 rounded-lg">
                                <span className="text-amber-500 text-sm">★</span>
                                <span className="ml-1 text-sm font-bold text-amber-600 dark:text-amber-400">{product.rating}</span>
                            </div>
                            <span className="text-sm text-slate-500 dark:text-slate-400">{product.stock} items in stock</span>
                        </div>

                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                            {product.description}
                        </p>

                        <div className="mt-auto space-y-6">
                            <div className="flex items-baseline gap-4">
                                <span className="text-4xl font-black text-emerald-600 dark:text-emerald-400">
                                    ${product.price}
                                </span>
                                {product.discountPercentage && (
                                    <span className="text-lg text-slate-400 line-through">
                                        ${(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button className="flex-1 bg-slate-900 dark:bg-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-800 dark:hover:bg-emerald-500 transition-all active:scale-[0.98]" onClick={Carthandler}>
                                    Add to Cart
                                </button>
                                <button className="flex-1 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all" onClick={BuyNow}>
                                    Buy Now
                                </button>
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-100 dark:border-slate-800 pt-8">
                            <div>
                                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Return Policy</p>
                                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">{product.returnPolicy || '30-day returns'}</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Shipping</p>
                                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">{product.shippingInformation || 'Fast delivery'}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Related_Products currentProduct={product.category}/>
            <ReviewsSection reviews={product.reviews}/>
        </div>
    );
};

export default ProductDetails;