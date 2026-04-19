import React, { useContext,  useState,  } from "react";
import CartItem from "../Cart/CartItem";
import OrderSummary from "../Cart/OrderSummary";
import { useQuery, useQueryClient,useMutation} from "@tanstack/react-query";
import cartService from "../AppWrite/CartService";
import { UseContextApi } from "../Context/UseContextApi";



const CartPage = () => {
  const [cartItems, setCartItems] = useState([]); // Fetch this from your CartService
  const {user}=useContext(UseContextApi)
const queryClient=useQueryClient()

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  console.log(subtotal)
  const discount = subtotal > 100 ? 10.0 : 0;
  const delivery = subtotal > 0 ? 5.0 : 0;
const {data}=useQuery({
  queryKey:['items',user?.$id],
  queryFn:async()=>{
    
    console.log("staring")
   const res= await cartService.getUserCart(user?.$id);
   console.log("ending..")
   setCartItems(res.documents || [])
   return res
  },
enabled:!!user?.$id,
} )


const { mutate: updateQty, isPending } = useMutation({
  mutationFn: async ({ productId, newQty}) => {
    console.log(typeof(newQty),newQty)
    if (newQty < 1) throw new Error("Invalid Quantity");
    return await cartService.updateQuantityByProductId(productId, newQty);
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['cartItem'] });
  },
  onError: (error) => {
    console.error(error.message);
  }
});

const onUpdateQty = (productId, newQty) => {
  if (newQty < 1) return;
  updateQty({ productId, newQty });
};




  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white">Your Cart</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            You have <span className="text-emerald-500 font-bold">{cartItems.length} items</span> in your bag
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-[2]">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItem 
                  key={item.$id} 
                  item={item} 
                  onUpdateQty={() => {onUpdateQty(item)}} // Connect to CartService.updateQuantity
                  onRemove={() => {}}    // Connect to CartService.removeItem
                />
              ))
            ) : (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-dashed border-slate-200 dark:border-slate-800">
                <p className="text-slate-500 dark:text-slate-400 text-lg">Your cart is empty</p>
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="sticky top-24">
              <OrderSummary 
                subtotal={subtotal} 
                discount={discount} 
                delivery={delivery} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;