import React, { useContext } from 'react'
import { UseContextApi } from '../Context/UseContextApi'
import Card from '../Components/Card'

const ProductList = () => {
    const data=useContext(UseContextApi)
  return (
   <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {data?.data.products.map((item) => (
    <Card key={item.id} product={item} />
  ))}
</div>
  )
}

export default ProductList