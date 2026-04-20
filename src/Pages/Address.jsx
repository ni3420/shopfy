import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../Components/Input'; // Import the reusable component
import { UseContextApi } from '../Context/UseContextApi';
import { useQueryClient,useMutation, useQuery } from '@tanstack/react-query';
import addressService from '../AppWrite/AddressService';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
const AddressForm = ({ onSubmitAddress }) => {
  const {user}=useContext(UseContextApi)
  const {data:address}=useQuery({
    queryKey:["address",user?.$id],
    queryFn:async()=>{
        const res=await addressService.getMyAddresses(user?.$id)
        return res.documents[0] || []
    },
    enabled:!!user?.$id
  },
  
)

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    values:{
        fullName:user?.name || "",
        state:address?.state || "",
        city:address?.city || "",
        street:address?.street || "tara",
        phone:address?.phone || "",
        zip:address?.zip || "",

    }
  });
  
const queryClient = useQueryClient();

const { mutate: saveAddressMutation, isPending, } = useMutation({
  mutationFn: async (formData) => {
    return await addressService.saveAddress({
      userId: user?.$id,
      ...formData
    });
  },
  onSuccess: (response) => {
    <Navigate to="/"/>
    toast.success("Address saved successfully!");
    queryClient.invalidateQueries({ queryKey: ["addresses"] });
    
    // onSubmitAddress(response); 
  },
  onError: (error) => {
    toast.error("Failed to save address: " + error.message);
  }
});
  const onSubmit = (data) => {

    saveAddressMutation(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Shipping Address</h2>
        <p className="text-sm text-slate-500">Please enter your delivery details manually.</p>
      </div>

      <Input
        label="Full Name"
        placeholder="e.g. John Doe"
        
        
        {...register("fullName", { required: "Name is required" })}
        error={errors.fullName?.message}
      />

      <Input
        label="Street Address"
        placeholder="House No, Building, Street Name"
        {...register("street", { required: "Street address is required" })}
        error={errors.street?.message}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="City"
          placeholder="New York"
          {...register("city", { required: "City is required" })}
          error={errors.city?.message}
        />
        <Input
          label="State / Province"
          placeholder="NY"
          {...register("state", { required: "State is required" })}
          error={errors.state?.message}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="ZIP / Postal Code"
          placeholder="10001"
          {...register("zip", { 
            required: "ZIP is required",
            pattern: { value: /^\d+$/, message: "Numbers only" }
          })}
          error={errors.zip?.message}
        />
        <Input
          label="Phone Number"
          placeholder="+1 234..."
          {...register("phone", { required: "Phone is required" })}
          error={errors.phone?.message}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
      >
        {isSubmitting ? "Saving..." : "Deliver to this Address"}
      </button>
    </form>
  );
};

export default AddressForm;