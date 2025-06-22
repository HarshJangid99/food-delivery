import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { StoreContext } from '../context/StoreContext'
import { assets } from '../assets/assets'
const Orders = () => {
    const [data,setData] = useState([])
    const {token} = useContext(StoreContext)
    const fetchorders = async()=>{
    try{
 const response = await axios.get('https://food-delivery-4z3h.onrender.com/api/order/userorders' , {
    headers : {
        Authorization  : `Bearer ${token}`
    }
 })
 if(response.data.success){
    setData(response.data.data)
    
 }else{
    alert(response.data.message)
 }
    }catch(err){
        alert("error")
    }
    }
useEffect(()=>{
   if(token){
    fetchorders()
   }else{
    alert("lola")
   }
},[])
useEffect(()=>{
    console.log(data)
},[data])

  return (
    <div className='main-container py-12'>
       <div className='flex flex-col gap-4'>
         <p className='text-3xl font-semibold'>My Orders</p>

         {data && (
            <div className='flex flex-col gap-3'>
   {data.map((value,index)=>(
   <div className='grid grid-cols-3 sm:grid-cols-6 gap-2 p-2 border-2 border-black items-center'>
    <div className='flex gap-4 col-span-2 items-center'>
     <img src={assets.parcel_icon} alt="" />
  <div className='itemnames '>
 {value.items.map((item,index)=>{return item.name + 'x' + item.quantity + ','})}
    </div>
    </div>
  
    <p >$ {value.amount}</p>
    <p>Items : <span>{value.items.length}</span></p>
    <p className='flex gap-2 items-center'><span className='w-3 inline-block h-3 rounded-full bg-[tomato] '></span> {value.status} </p>
    <button className='bg-[tomato]/70 text-white px-2 py-1 '>Track Order</button>
   </div>
   ))}
         </div>
         )}
       </div>
    </div>
  )
}

export default Orders
