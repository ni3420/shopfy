import React, { useContext } from 'react'
import { UseContextApi } from './Context/UseContextApi'
import Card from './Components/Card'
import Home from './Pages/ProductList'
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

const App = () => {
  // const {user}=useContext(UseContextApi)
  // console.log(user?.$id)


  return (
    <>
    <Toaster position="bottom-right" reverseOrder={false}/>
    <Routes>
<Route path="/" element={<Home/>}/>
<Route path="/Products_details/:item/:id" element={<ProductDetails/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/cart' element={<CartPage/>}/>
<Route path='/sign_up' element={<Signup/>}/>
<Route path='/cart_page' element={<CartPage/>}/>


    </Routes>
    
    
    </>
  )
}

export default App