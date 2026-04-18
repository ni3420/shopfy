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

const App = () => {
const data=useContext(UseContextApi)


  return (
    <>
    <Routes>
<Route path="/" element={<Home/>}/>
<Route path="/Products_details/:item/:id" element={<ProductDetails/>}/>


    </Routes>
    
    
    </>
  )
}

export default App