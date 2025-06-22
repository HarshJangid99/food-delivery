import React from 'react'
import { assets } from '../../assets/assets'

const AppDownload = () => {
  return (
    <div className='py-16 flex justify-center main-container'>
       <div className=' text-center flex flex-col items-center gap-16 text-4xl font-semibold '>
        <p>For Better Experience Download <span className='text-yellow-600'>Spice</span>Inn App</p>

        <div className='flex flex-col sm:flex-row gap-4'>
            <img src={assets.play_store} alt="" className='cursor-pointer  hover:scale-105' />
            <img src={assets.app_store} alt="" className='cursor-pointer hover:scale-105'/>
        </div>
       </div>
    </div>
  )
}

export default AppDownload
