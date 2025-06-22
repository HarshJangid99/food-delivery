import React from 'react'
import { assets } from '../../assets/assets'
import { motion } from 'framer-motion';
const Header = () => {
  return (
   <div className='py-5 h-[695px] bg-[url("/herobg.jpg")] bg-cover bg-center relative rounded-b-[100px] overflow-hidden'>
     <div className='h-full w-full absolute top-0 bg-black/55 z-20'>
</div>
    <div className='main-container relative z-30 flex justify-center items-center h-full w-full '>
     
     <div className='flex  lg:w-[80%] xl:w-[70%] 2xl:w-[60%] flex-col gap-6 justify-center items-center h-full'>
      <p className='text-4xl sm:text-7xl font-semibold text-white text-center'>Welcome And Taste <br className='hidden sm:block'/>
     The Best Cuisine ! 
     </p>
     <div className='text-yellow-600 flex text-lg sm:text-xl items-center gap-2 '>
       <div className="h-px w-10 sm:w-16 bg-yellow-600"></div>
       <p>Taste,Eat & Enjoy</p>
        <div className="h-px w-10 sm:w-16 bg-yellow-600"></div>
     </div>
     < p className='text-center text-lg text-white'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos soluta nemo, beatae cum cupiditate ducimus nobis odit adipisci doloribus Lorem ipsum dolor sit amet..</p>
     <div className='flex gap-3'>
      <button className='bg-yellow-600 rounded-3xl px-5 text-xl py-2 text-black'>Learn More</button>
      <button className='bg-transparent px-5 text-xl py-2 rounded-3xl text-yellow-600 border-2  border-yellow-600'>Discover Menu</button>
     </div>
     </div>
    </div>
   </div>

  )
}

export default Header
