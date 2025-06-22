import React from 'react'
import { assets } from '../assets/assets'
import { NavLink, Outlet } from 'react-router-dom'
  import { ToastContainer, toast } from 'react-toastify';
const AdminLayout = () => {

  const menuItems = [
    {
      icon : assets.add_icon,
      title : ' Add items',
      path : '/AddItem'
    },
     {
      icon : assets.order_icon,
      title : ' All items',
      path : '/'
    },
    {
      icon : assets.order_icon,
      title : ' Orders',
      path : '/Order'
    },
  ]
  return (
    <div className='main-container flex flex-col '>
      <ToastContainer/>
        <nav className='h-[13vh] sticky top-0 bg-white flex justify-between items-center py-2 border-b-2 border-black '>
        <p className='text-3xl font-bold flex items-center gap-1'> <span className='text-yellow-600'>Spice</span>Inn</p>
       <img src={assets.profile_image} alt="" />
        </nav>
      <div className='flex '>
        {/* aside */}
        <div className='w-[10vw] md:w-[20vw] h-[calc(100vh-13vh)] border-r-2 border-black '>
          <div className='pt-8 pr-2'>
            <div className='flex flex-col gap-4'>
                {menuItems.map((value,index)=>(
                  <NavLink to={value.path} key={index}  className={({ isActive }) =>
    `flex gap-4 p-2 border-2 border-black rounded-md ${
      isActive ? 'bg-[tomato] text-white' : 'bg-white text-black'
    }`
  }> <img src={value.icon} alt=""   /><span className='hidden md:block'>{value.title} </span></NavLink>
                ))}
            </div> 
          </div>
        </div>
        <div className='w-[90vw] md:w-[70vw] h-[calc(100vh-13vh)] overflow-auto p-4'>
<Outlet/>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
