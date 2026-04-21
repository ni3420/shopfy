import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderSummary from '../Cart/OrderSummary';
import CartItem from '../Cart/CartItem';
import AddressForm from './Address'; 

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract data from navigation state
  const { checkoutItems, type } = location.state || { checkoutItems: [], type: null };

  // Guard: Redirect if no data exists
  if (checkoutItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-slate-50 dark:bg-slate-950">
        <div className="bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-xl text-center border border-slate-100 dark:border-slate-800">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Your Session Expired</h2>
          <p className="text-slate-500 mb-6">No items found for checkout. Please return to the shop.</p>
          <button 
            onClick={() => navigate('/Product_list')} 
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold transition-all"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  // Calculate totals based on the passed items
  const subtotal = checkoutItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const delivery = subtotal > 500 ? 0 : 50; 
   const discount = subtotal > 10 ? 10.0 : 0;
  const total = subtotal + delivery;

  const handleFinalOrder = (addressData) => {
    console.log("Processing Order for:", checkoutItems);
    console.log("Shipping to:", addressData);
    // Here you would call your orderService.createOrder(...)
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
              Checkout
            </h1>
            <p className="text-slate-500 font-medium">
              {type === 'BUY_NOW' ? 'Direct Purchase' : `Reviewing ${checkoutItems.length} items from cart`}
            </p>
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* LEFT COLUMN: Items Review & Address */}
          <div className="flex-[2] space-y-8">
            
            {/* 1. Items List Section */}
            <section>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full flex items-center justify-center text-sm">1</span>
                Review Items
              </h2>
              <div className="space-y-4">
                {checkoutItems.map((product) => (
                  <div key={product.$id || product.id} className="opacity-90">
                    <CartItem 
                      item={product} 
                      isReadOnly={true} // Custom prop to hide +/- buttons
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* 2. Shipping Address Section */}
            <section>
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full flex items-center justify-center text-sm">2</span>
                Shipping Details
              </h2>
              <AddressForm onSubmitAddress={handleFinalOrder} />
            </section>
          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="flex-1">
            <div className="sticky top-28">
              <OrderSummary 
                subtotal={subtotal} 
                delivery={delivery} 
                discount={discount}
                total={total}
                isCheckoutPage={true} // This will hide the 'Proceed' button in Summary
              />
              
              {/* <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl">
                <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed text-center font-medium">
                  🔒 Secure SSL Encrypted Checkout. <br/> Your data is safe with us.
                </p>
              </div> */}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;