import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { StoreContext } from '../context/StoreContext'

const Success = () => {
    const {token} = useContext(StoreContext)
    const details = JSON.parse(localStorage.getItem('userdetails'))
      useEffect(async()=>{
  const placeOrder = async () => {
      const details = JSON.parse(localStorage.getItem('userdetails'));
      if (!details) return;

      try {
        const response = await axios.post(
          'https://food-delivery-4z3h.onrender.com/api/order/order-placed',
          {
            name: details.name,
            items: details.items,
            amount: details.amount,
            address: details.address,
            payment: true,
            phone: details.phone,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        if (response.data.success) {
          alert(response.data.message)
          localStorage.removeItem("userdetails") // ✅ Clean up
        } else {
          alert(response.data.message)
        }
      } catch (err) {
        alert("Error placing order")
        console.error(err)
      }
    }

    placeOrder()
      },[])
  return (
    <div className='main-container py-12 flex justify-center items-center'>
        <div className='flex flex-col gap-5 items-center'>
           <img src="/check.png" alt="" className='w-40'/>
           <p className='text-5xl '>Thank you for your ordering !</p>
           <p>we are preparing your order in 15 minutes</p>
           <button className='bg-[tomato] px-4 py-1 font-semibold text-white' >Continue Shopping</button>
        </div>
    </div>
  )
}

export default Success
