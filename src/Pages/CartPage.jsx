import React, { useContext,  useState,  } from "react";
import CartItem from "../Cart/CartItem";
import OrderSummary from "../Cart/OrderSummary";
import { useQuery, useQueryClient,useMutation} from "@tanstack/react-query";
import cartService from "../AppWrite/CartService";
import { UseContextApi } from "../Context/UseContextApi";



const CartPage = () => {
  const [cartItems, setCartItems] = useState([]); // 
  const {user}=useContext(UseContextApi)
const queryClient=useQueryClient()

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = subtotal > 10 ? 10.0 : 0;
  const delivery = subtotal > 0 ? 5.0 : 0;
const {data}=useQuery({
  queryKey:['cartItem',user?.$id],
  queryFn:async()=>{
    
   const res= await cartService.getUserCart(user?.$id);
   setCartItems(res.documents || [])
   return res
  },
enabled:!!user?.$id,
} )

const { mutate: updateQty } = useMutation({
  mutationFn: ({ productId, newQty }) => 
    cartService.updateQuantityByProductId(productId, newQty),
  
  onMutate: async ({ productId, newQty }) => {
    await queryClient.cancelQueries({ queryKey: ['cartItem'] });
    const previousCart = queryClient.getQueryData(['cartItem']);

    queryClient.setQueryData(['cartItem'], (old) => 
      old?.map((item) => 
        item.productId === productId ? { ...item, quantity: newQty } : item
      )
    );

    return { previousCart };
  },

  onError: (err, variables, context) => {
    queryClient.setQueryData(['cartItem'], context.previousCart);
  },

  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['cartItem'] });
  }
});

const onUpdateQty = (productId, newQty) => {
  if (newQty < 1) return;
  updateQty({ productId, newQty });
};


const { mutate: removeItem } = useMutation({
  mutationFn: (productId) => cartService.removeByProductId(productId),
  
  onMutate: async (productId) => {
    await queryClient.cancelQueries({ queryKey: ['cartItem', user?.$id] });
    const previousCart = queryClient.getQueryData(['cartItem', user?.$id]);

    queryClient.setQueryData(['cartItem', user?.$id], (old) => {
      if (!old) return previousCart;
      return {
        ...old,
        documents: old.documents?.filter((item) => item.productId !== productId)
      };
    });

    return { previousCart };
  },

  onError: (err, variables, context) => {
    if (context?.previousCart) {
      queryClient.setQueryData(['cartItem', user?.$id], context.previousCart);
    }
  },

  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ['cartItem', user?.$id] });
    queryClient.invalidateQueries({queryKey:["cart",user?.$id]})
  }
});



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
          <div className="flex-2">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItem 
                  key={item.$id} 
                  item={item} 
                  onUpdateQty={(qty) => {onUpdateQty(item.productId,qty)}} // Connect to CartService.updateQuantity
                  onRemove={(id) => {removeItem(id)}}    // Connect to CartService.removeItem
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