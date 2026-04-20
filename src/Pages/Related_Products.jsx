import React, { useContext } from 'react';
import { UseContextApi } from '../Context/UseContextApi';
import Card from '../Components/Card';

const Related_Products = ({ currentProduct }) => {
    const data = useContext(UseContextApi);

    const related = data?.data?.products.filter((p) => p.category === currentProduct ) || []

    if (related?.length === 0) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 py-16 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                        Related Products
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">
                        More from the <span className="font-bold text-emerald-500">{currentProduct?.category}</span> collection
                    </p>
                </div>
                <button className="hidden sm:block text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline">
                    View All
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related?.map((p) => (
                    <Card key={p.id} product={p} />
                ))}
            </div>
        </div>
    );
};

export default Related_Products;