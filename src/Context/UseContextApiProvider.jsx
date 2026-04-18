import { UseContextApi } from './UseContextApi'
import axios from 'axios'
import { confi } from '../confi/confi'
import { useQuery } from '@tanstack/react-query'
import authservice from "../AppWrite/auth"
const api=async()=>{
    const res=await axios.get(`${confi.api_url}`)
    return res.data
}

const CurrentUser=async()=>{
    return await authservice.getCurrentUser()
}

const UseContextApiProvider = ({children}) => {
const {data,isError,isLoading}=useQuery({
    queryKey:["products"],
    queryFn:api
})

const {data:user}=useQuery({
    queryKey:["User"],
    queryFn:CurrentUser
})



if(isError)
{
    return <h1>Something is wrong check the internet and refresh...</h1>
}
if(isLoading)
{
    return <h1>Loading ...</h1>
}

  return (
    <UseContextApi.Provider value={{data,user}}>
        {children}
    </UseContextApi.Provider>
  )
}

export default UseContextApiProvider