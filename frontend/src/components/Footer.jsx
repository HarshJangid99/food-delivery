import React from 'react';
import { assets } from '../assets/assets';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';

const Footer = () => {
  return (
    <div className='py-12 bg-[url("/herobg.jpg")] bg-cover bg-center relative'>
      <div className='absolute inset-0 bg-black/60 z-10'></div>

      <div className='relative z-20 text-[#d9d9d9] max-w-7xl mx-auto px-4 flex flex-col gap-8'>
        {/* Top Section */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
          {/* Logo + Description */}
          <div className='flex flex-col items-center md:items-start gap-4'>
            <p className='text-3xl font-bold flex items-center gap-2'>
              <DinnerDiningIcon className='text-yellow-600' fontSize='large' />
              <span className='text-yellow-600'>Spice</span>Inn
            </p>
            <p className='text-center md:text-left text-sm'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit ut soluta veritatis ducimus, excepturi vero, veniam aut, dolore ab commodi quo!
            </p>
            <div className='flex gap-3'>
              <img src={assets.facebook_icon} alt="Facebook" className='w-8 hover:scale-105 transition' />
              <img src={assets.twitter_icon} alt="Twitter" className='w-8 hover:scale-105 transition' />
              <img src={assets.linkedin_icon} alt="LinkedIn" className='w-8 hover:scale-105 transition' />
            </div>
          </div>

          {/* Company Links */}
          <div className='flex flex-col items-center md:items-start gap-4'>
            <p className='text-2xl font-semibold text-white'>COMPANY</p>
            <ul className='space-y-2 text-sm'>
              <li className='hover:text-white cursor-pointer'>Home</li>
              <li className='hover:text-white cursor-pointer'>About us</li>
              <li className='hover:text-white cursor-pointer'>Delivery</li>
              <li className='hover:text-white cursor-pointer'>Privacy policy</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className='flex flex-col items-center md:items-start gap-4'>
            <p className='text-2xl font-semibold text-white'>GET IN TOUCH</p>
            <div className='text-sm space-y-2'>
              <p>+1-2121-457-89</p>
              <p>contact@tomato.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <hr className='border-t border-[#d9d9d9]/40' />
        <p className='text-center text-sm'>© 2025 tomato.com - All Rights Reserved</p>
      </div>
    </div>
  );
};

export default Footer;
