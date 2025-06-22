import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
const AllItems = () => {
  const [data,setData] = useState(null)
  const url = 'http://localhost:4000'
    const fetchData=async()=>{
try{
    const response = await axios.get(`${url}/api/food/list` )
    if(response.data.success){
      setData(response.data.data)
    }else{
      alert("we have not got anything ")
    }
}
catch(err){}
  }
useEffect(()=>{
  fetchData()
},[])
const handleAction = async(id)=>{
try{
  const response = await axios.post(`${url}/api/food/remove`,{id})
  if(response.data.success){
    toast.success(response.data.message)
    fetchData()
  }
}catch(err){
  alert(err)
}
}

  return (
    <div>
      <p className='text-3xl font-semibold'>All Food Items</p>
     <div className=' grid grid-cols-8 sm:grid-cols-10'>
     <p className='col-span-2'>Images</p>
      <p className='col-span-2 sm:col-span-4'>Name</p>
       <p className='col-span-2'>Category</p>
        <p className='col-span-1'>Price</p>
         <p className=''>Action</p>
     </div>
     {data ? data.map((value,index)=>(
      <div key={value.id} className='grid grid-cols-8 sm:grid-cols-10 border-y-[1px] py-1 border-gray-300'>
     <p className='col-span-2'><img src={`${url}/uploads/` + value.image} alt="" className='w-12' /></p>
      <p className='col-span-2 sm:col-span-4'>{value.name}</p>
       <p className='col-span-2'>{value.category}</p>
        <p className='col-span-1'>{value.price}</p>
         <p className='cursor-pointer' onClick={() => handleAction(value._id)}>X</p>
      </div>
     )): ''}
     
    </div>
  )
}

export default AllItems
