import React, { useContext } from 'react';
import { UseContextApi } from '../Context/UseContextApi';
import Card from '../Components/Card';

const Fragrances = () => {
    const data = useContext(UseContextApi);
    
    const fragranceProducts = data?.data?.products?.filter((p) => p.category === "fragrances") || [];

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <header className="mb-10">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white capitalize">
                    Luxury Fragrances
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2">
                    Define your presence with our signature scents and perfumes.
                </p>
            </header>

            {fragranceProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {fragranceProducts.map((p) => (
                        <Card key={p.id} product={p} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="text-5xl mb-4">✨</div>
                    <p className="text-slate-500 text-lg font-medium">
                        Our fragrance collection is arriving soon.
                    </p>
                </div>
            )}
        </div>
    );
};

export default Fragrances;