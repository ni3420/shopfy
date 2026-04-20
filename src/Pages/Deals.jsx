import React, { useContext } from 'react';
import ProductCard from '../Components/Card'; 
import { Flame } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { UseContextApi } from '../Context/UseContextApi';

const Deals = () => {
    const {data}=useContext(UseContextApi)
  const { data: deals, isLoading } = useQuery({
    queryKey: ['hot-deals'],
    queryFn:  () => {
        const deals=data?.products.filter((items)=>items.discountPercentage>10)
        return deals
      
    }
  });

  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-grow bg-slate-50 dark:bg-slate-950">
        {/* Banner Section */}
        <section className="bg-gradient-to-r from-orange-600 to-red-600 py-10 px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
            <Flame className="text-white animate-bounce" size={32} />
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">
              Hot Deals Today
            </h1>
            <Flame className="text-white animate-bounce" size={32} />
          </div>
        </section>

        {/* Product Grid Section */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-64 bg-slate-200 dark:bg-slate-800 animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* If you have products, map them here */}
             {
                deals?.map((pro)=>(
                    <ProductCard
                    product={pro}

                    />
                ))
             } 
              
              {/* Placeholder Card for UI Reference */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-2xl shadow-sm">
                <div className="aspect-square bg-slate-100 rounded-xl mb-4" />
                <div className="h-4 w-3/4 bg-slate-200 rounded mb-2" />
                <div className="h-4 w-1/4 bg-blue-100 text-blue-600 font-bold rounded" />
              </div>
            </div>
          )}
        </section>
      </main>

    </div>
  );
};

export default Deals;