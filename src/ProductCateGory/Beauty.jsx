import React, { useContext } from 'react';
import { UseContextApi } from '../Context/UseContextApi';
import Card from '../Components/Card';

const Beauty = () => {
    const data = useContext(UseContextApi);
    
    const beautyProducts = data?.data?.products?.filter((p) => p.category === "beauty") || [];

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <header className="mb-10">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white capitalize">
                    Beauty Collection
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2">
                    Explore our curated premium beauty essentials.
                </p>
            </header>

            {beautyProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {beautyProducts.map((p) => (
                        <Card key={p.id} product={p} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20">
                    <p className="text-slate-500 text-lg">No products found in this category.</p>
                </div>
            )}
        </div>
    );
};

export default Beauty;