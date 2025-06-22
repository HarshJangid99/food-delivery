import React, { useContext, useEffect } from 'react'
import { StoreContext } from '../context/StoreContext'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    const {cartItems , removeFromCart , food} = useContext(StoreContext)
    const data = food.filter((value)=>{
        return cartItems[value._id]
    })
   const total = data.reduce((acc, item) => {
  return acc + item.price * cartItems[item._id];
}, 0);
const navigate = useNavigate()

useEffect
  return (
    <div className=' main-container py-10'>
        {data.length>=1 ? <div>
            <div className="first">
            <div className='grid grid-cols-6'>
                <p>Items</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr className='border-t-[1px] border-gray-400'/>
       <div className='flex flex-col '>
           {data.map((value,index)=>(
            <div key={index} className='grid grid-cols-6 py-3'>
            <img src={`http://localhost:4000/uploads/${value.image}`} alt="" className='w-14'/>
            <p>{value.name}</p>
            <p className='font-semibold'>$ {value.price}</p>
            <p>{cartItems[value._id]}</p>
            <p className='font-semibold'>$ {value.price * cartItems[value._id]}</p>
            <img src={assets.cross_icon} alt="" className='w-5' onClick={()=>removeFromCart(value._id)}/>
            <hr className='border-t-[1px] mt-3 border-gray-400 col-span-full'/>
            </div>
          ))}
       </div>
        </div>

        <div className="second flex justify-between ">
            <div className="left w-[40%] flex flex-col gap-4">
                <p className='font-semibold text-2xl'>Cart Totals</p>
                  
                        <p className='flex justify-between'><span>Sub Total </span><span>{total} </span></p>
                        <p className='flex justify-between'>Delivery Fee <span>$5</span></p>
                        <p className='flex justify-between'>Total <span>${total + 5}</span></p>
                    
                    <button className=' w-fit bg-[tomato] text-white px-5 py-1' onClick={()=>navigate("/place-order")}>Proceed To Checkout</button>
            </div>
            <div className="right w-[40%]">
                <p>If you have a promocode , Enter it here</p>
              <div className='flex '>
                  <input type="text" placeholder='promocode' className='py-2 border-2 px-4 w-[70%]'/>
                  <button className='bg-black text-white px-3'>Submit</button>
              </div>

            </div>
        </div>
        </div> : <div className='flex flex-col items-center'>
            <p className='text-4xl font-semibold'>Your cart is empty </p>
            <img src="/empty.png" alt="" />
        </div> }
      
    </div>
  )
}

export default Cart
