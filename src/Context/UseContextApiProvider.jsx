import { UseContextApi } from './UseContextApi'
import axios from 'axios'
import { confi } from '../confi/confi'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import authservice from "../AppWrite/auth"
import { useState } from 'react'
import toast from 'react-hot-toast'
import Layout from '../Components/Layout'
import LoadingSpinner from "../Components/LoadingSpinner"
const api=async()=>{
    const res=await axios.get(`${confi.api_url}`)
    return res.data
}

const CurrentUser=async()=>{
    const res= await authservice.getCurrentUser()
    return res || null
}

const UseContextApiProvider = ({children}) => {
const {data,isError,isLoading}=useQuery({
    queryKey:["products"],
    queryFn:api
})

const {data:user}=useQuery({
    queryKey:["User"],
    queryFn:CurrentUser,
    staleTime:10000,
})
const [loading,setLoading]=useState(false)

const queryClient=useQueryClient()
const logout=async()=>{
    const res=await authservice.logout()
    setLoading(true)
    if(res)
    {
        queryClient.removeQueries({queryKey:["User","cart","item"]})
        setLoading(false)
        toast.success("User successfully logout")
    }else{
        toast.error("something is wrong")
    }
    return res || null
}
if(isError)
{
    return <h1>Something is wrong check the internet and refresh...</h1>
}
if(isLoading)
{
    return <LoadingSpinner/>
}

  return (
    <UseContextApi.Provider value={{data,user,logout,loading}}>
        {children}
    </UseContextApi.Provider>
  )
}



export default UseContextApiProvider