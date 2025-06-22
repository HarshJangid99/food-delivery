import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { assets, food_list } from '../../assets/assets'
import axios from 'axios'

const Dishes = ({activeMenu}) => {
const {food} = useContext(StoreContext)



 
  return (
    <div className='py-5'>
       <div>
        <h1 className='text-3xl font-semibold'>Top Dishes near you</h1>
        <div className='grid grid-cols-4 gap-8 mt-3'>
            {activeMenu == "All" ? food.map((value,index)=>(
               <Foodcard key={value._id} id={value._id} name={value.name} description={value.description} price={value.price} image = {value.image}/>
            )) : food.filter((value)=> value.category == activeMenu).map((value,index)=>(
              <Foodcard key={value._id} id={value._id} name={value.name} description={value.description} price={value.price} image = {value.image}/>
            ))}
        </div>
       </div>
    </div>
  )
}
const Foodcard = ({id , name , image , description , price})=>{

  const {cartItems , addToCart , removeFromCart , setCartItems , token} = useContext(StoreContext)
  const handleadd=(id)=>{
if(token){
addToCart(id)
}else{
  alert("Please login first ")
}
}
  return(
     <div  className=' flex flex-col gap-2 shadow-lg rounded-t-3xl overflow-hidden '>
                  <div className='h-[60%] relative'>
  <img src={`http://localhost:4000/uploads/` + image} alt="" className='h-full w-full object-fit ' />
  {!cartItems[id] ? <img src={assets.add_icon_white} className='cursor-pointer absolute bottom-2 h-10 right-2' onClick={() => handleadd(id)}/> : <div className=' flex items-center p-1 rounded-3xl bg-white gap-3 absolute right-2 bottom-2'>
    <img src={assets.remove_icon_red} className='cursor-pointer' alt="" onClick={()=>removeFromCart(id)} />
    {cartItems[id]}
    <img src={assets.add_icon_green} className='cursor-pointer' alt="" onClick={()=>addToCart(id)} />
  </div> }
                  </div>
                  <div className='px-4  flex flex-col gap-3 h-[40%]'>
                   <div className='flex justify-between items-center'>
                    <p className='text-xl font-semibold'>{name}</p>
                    <img src={assets.rating_starts} alt="" />
                   </div>
                   <p className='text-[#49557e]'>{description}</p>
                   <p className='text-xl font-semibold text-[tomato]'>$ {price}</p>
                  </div>
              </div>
  )
}
export default Dishes
