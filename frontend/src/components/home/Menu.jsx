import React, { useContext, useState } from 'react'
import { assets, menu_list } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom'

const Menu = () => {
const {activeMenu , setActiveMenu} = useContext(StoreContext)
const navigate = useNavigate()
const handleclick = (value)=>{
setActiveMenu(value);
navigate(`/menu?category=${value}`)
}
  return (
    <div className='py-10 main-container'>
       <div className='flex flex-col gap-6 '>
        <div className='flex justify-center'>
           <div className='flex flex-col items-center gap-2 md:w-[60%]'>
            <h1 className='text-3xl sm:text-5xl font-semibold'>What We Offer You !</h1>
            <div className='text-yellow-600 text-lg flex items-center'>
            <div className='h-px w-12 bg-yellow-600'></div>
            <p>VISIT US FOR BEST</p>
            <div className='h-px w-12  bg-yellow-600'></div>
          </div>
         <p className='mt-3 text-center'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam accusantium quo ipsum culpa? Minima praesentium veniam, provident nostrum ipsum porro!</p>
         </div>
        </div>

        <div className='flex gap-4 justify-between overflow-x-auto whitespace-nowrap flex-nowrap'>
  {menu_list.map((value, index) => (
    <div
      key={index}
      className='flex flex-col cursor-pointer items-center gap-2 text-lg min-w-[150px] shrink-0'
      onClick={()=>handleclick(value.menu_name )}
    >
      <img src={value.menu_image} alt=""  className={`rounded-full w-36 ${activeMenu == value.menu_name ? 'border-4 p-1 border-[tomato]' : ''}`}/>
      <p className='text-[#49557e]'>{value.menu_name}</p>
    </div>
  ))}
</div>
<hr className="border-t-2 border-gray-300 " />
       </div>
    </div>
  )
}

export default Menu
