import { TextField } from '@mui/material'
import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import {loadStripe} from '@stripe/stripe-js'
import axios from 'axios'
const PlaceOrder = () => {
    const stripePromise = loadStripe('pk_test_51RZUQdPJb59Munp2HNd48QjMb9t6jiuf91ArgZeW1oh1AlgPD4PiXLMyXsOhJUcczVL1yWPVYOfYEyrtEB4ICjWx00Gcq0tpUJ')
     const {cartItems , token ,  removeFromCart , food} = useContext(StoreContext)
        const data = food.filter((value)=>{
            return cartItems[value._id]
        })
       const total = data.reduce((acc, item) => {
      return acc + item.price * cartItems[item._id];
    }, 0);
    const formik = useFormik({
        initialValues : {
            firstname : '',
            lastname : '',
            email : '',
            street : '',
            city : '',
            state : '',
            zipcode : '',
            country : '',
            phone : ''
        },
        onSubmit : async(value)=>{
            const fooddata = await food.filter((value)=>{
                return cartItems[value._id]
            })
            const data = fooddata.map((value)=>{
               return { 
                 ...value,
                quantity : cartItems[value._id]
               }
            })
           localStorage.setItem('userdetails', JSON.stringify({
  name: value.firstname + " " + value.lastname,
  items: data,
  amount: total + 5,
  address: {
    street: value.street,
    city: value.city,
    state: value.state,
    zipcode: value.zipcode,
    country: value.country,
  },
  phone: value.phone
}));

            const stripe  = await stripePromise
        try{
            const response = await axios.post('https://food-delivery-4z3h.onrender.com/api/order/create-checkout-session' , {cartItems} , {
    headers: { Authorization: `Bearer ${token}` }, // ✅ corrected Bearer spelling & colon
  })
            if(response.data.success){
                await stripe.redirectToCheckout({sessionId : response.data.id})
            }else{
                alert(response.data.message)
            }
        }catch(err){}
        }
    })
   
    console.log(formik.values)
  return (
    <div className='flex justify-between main-container py-16'>
     <div className="left sm:w-[40%] w-full">
        <p className='text-3xl font-semibold'>Delivery Information</p>
     <form className='flex flex-col gap-4 mt-2' onSubmit={formik.handleSubmit} >
<div className='flex gap-2 w-full'>
    <TextField name='firstname' fullWidth placeholder='First name' value={formik.values.firstname} onChange={formik.handleChange}/>
    <TextField name='lastname' fullWidth placeholder = 'Last name'value={formik.values.lastname} onChange={formik.handleChange}/>
</div>
<TextField name='email' placeholder='Email address' fullWidth value={formik.values.email} onChange={formik.handleChange}/>
<TextField name='street' placeholder='Street' fullWidth value={formik.values.street} onChange={formik.handleChange}/>
<div className='flex gap-2'>
    <TextField name='city' fullWidth placeholder='City' value={formik.values.city} onChange={formik.handleChange}/>
    <TextField name='state' fullWidth placeholder='State' value={formik.values.state} onChange={formik.handleChange}/>
</div>
<div className='flex gap-2'>
    <TextField name='zipcode' fullWidth placeholder='Zip code' value={formik.values.zipcode} onChange={formik.handleChange}/>
    <TextField name='country' fullWidth placeholder='Country' value={formik.values.country} onChange={formik.handleChange}/>
</div>
<TextField name='phone' placeholder='Phone' value={formik.values.phone} onChange={formik.handleChange}/>
<button type='submit' className=' w-fit bg-[tomato] text-white px-5 py-1' onClick={()=>navigate("/place-order")}>Proceed To Checkout</button>
     </form>
     </div>
     <div className="right sm:w-[50%] w-full flex flex-col gap-4">
                <p className='font-semibold text-2xl'>Cart Totals</p>
                  
                        <p className='flex justify-between'><span>Sub Total </span><span>{total} </span></p>
                        <p className='flex justify-between'>Delivery Fee <span>$5</span></p>
                        <p className='flex justify-between'>Total <span>${total + 5}</span></p>
                    
                    
            </div>
    </div>
  )
}

export default PlaceOrder
