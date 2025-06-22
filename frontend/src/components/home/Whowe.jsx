import React from 'react'
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import Diversity1OutlinedIcon from '@mui/icons-material/Diversity1Outlined';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
const Whowe = () => {
  return (
    <div className='main-container py-10 bg-gray-100 rounded-t-[100px]'>
      <div className='flex  w-full flex-wrap flex-col-reverse lg:flex-row gap-5 lg:gap-0'>
        <div className="left lg:w-1/2   justify-center  flex flex-col gap-5">
         <p className='text-3xl sm:text-4xl font-semibold '>We Love To Cook Tasty For You < br className=''/> In Delicious Way</p>
          <div className='text-yellow-600 text-lg flex items-center'>
            <div className='h-px w-12 bg-yellow-600'></div>
            <p>WHO WE ARE</p>
            <div className='h-px w-12  bg-yellow-600'></div>
          </div>
          <p className='text-gray-500  '>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est labore accusantium provident dolorum aliquam error doloremque perferendis blanditiis eaque quod?</p>
          <div className='flex  flex-col sm:flex-row gap-6'>
            <div className='flex gap-3 items-center'>
                <FastfoodOutlinedIcon fontSize='large' className='text-yellow-600'/>
                <div>
                    <p className='text-2xl font-semibold'>Fine Dining</p>
                    <p className='text-gray-500'>Lorem ipsum dolor sit amet.</p>
                </div>
            </div>
             <div className='flex gap-3 items-center'>
                < Diversity1OutlinedIcon fontSize='large' className='text-yellow-600'/>
                <div>
                    <p className='text-2xl font-semibold'>Master Chef</p>
                    <p className='text-gray-500'>Lorem ipsum dolor sit amet.</p>
                </div>
            </div>
          </div>

          <div>
            <p className='text-gray-500'><DoneOutlineOutlinedIcon/> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis, reprehenderit?</p>
            <p className='text-gray-500'><DoneOutlineOutlinedIcon/> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis, reprehenderit?</p>
          </div>

          <button className='px-6 w-fit py-2 bg-yellow-600 text-lg rounded-3xl'>More About Us</button>
        </div>
       <div className="right lg:w-1/2 flex justify-center items-center min-h-[400px] ">
  <div className=' max-w-[500px]'>
    <img src="/foodpng.png" alt="Delicious Food" className='w-full h-auto object-contain' />
  </div>
</div>
      </div>
    </div>
  )
}

export default Whowe
