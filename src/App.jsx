import React, { useContext } from 'react'
import { UseContextApi } from './Context/UseContextApi'
import Card from './Components/Card'
import ProductList from './Pages/ProductList'
import HeroBanner from './Pages/HeroBanner'
import Beauty from './ProductCateGory/Beauty'
import CateGory from './Pages/CateGory'
import { Routes ,Route} from 'react-router-dom'
import ProductDetails from './Pages/ProductDetails'
import CartPage from './Pages/CartPage'
import CartItem from './Cart/CartItem'
import Login from './Pages/Login'
import AuthProtected from './Components/AuthProtected'
import { Toaster } from 'react-hot-toast'
import Signup from './Pages/Signup'
import AddressForm from './Pages/Address'
import Layout from './Components/Layout'
import Deals from './Pages/Deals'
import Profile from './Pages/Profile'

const App = () => {
  // const {user}=useContext(UseContextApi)
  // console.log(user?.$id)


  return (
    <>
    <Toaster position="bottom-right" reverseOrder={false}/>
    <Routes>
<Route path="/" element={<Layout/>}>
<Route index element={<CateGory/>}/>
<Route path='/deals' element={<Deals/>}/>
<Route path='/product_list' element={<ProductList/>}/>
<Route path='/cart_page' element={<AuthProtected><CartPage/></AuthProtected>}/>
<Route path='/login' element={<AuthProtected authentication={false}><Login/></AuthProtected>}/>
<Route path='/signup' element={<AuthProtected authentication={false}><Signup/></AuthProtected>}/>
<Route path='/profile' element={<AuthProtected><Profile/></AuthProtected>}/>
<Route path='/address' element={<AuthProtected><AddressForm/></AuthProtected>}/>
<Route path="/Products_details/:item/:id" element={<ProductDetails/>}/>

</Route>




    </Routes>
    
    
    </>
  )
}

export default App