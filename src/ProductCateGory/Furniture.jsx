import React, { useContext } from 'react';
import { UseContextApi } from '../Context/UseContextApi';
import Card from '../Components/Card';

const Furniture = () => {
    const data = useContext(UseContextApi);
    
    const furnitureProducts = data?.data?.products?.filter((p) => p.category === "furniture") || [];

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <header className="mb-10">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white capitalize">
                    Modern Furniture
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2">
                    Transform your living space with our contemporary and durable designs.
                </p>
            </header>

            {furnitureProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {furnitureProducts.map((p) => (
                        <Card key={p.id} product={p} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="text-5xl mb-4">🪑</div>
                    <p className="text-slate-500 text-lg font-medium">
                        Looking for something specific? Our furniture stock is currently being updated.
                    </p>
                </div>
            )}
        </div>
    );
};

export default Furniture;