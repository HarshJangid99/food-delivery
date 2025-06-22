import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from 'react-router-dom';
const Popular = () => {
  const {food} = useContext(StoreContext)
  const data = food.filter((value)=>{return value.category == 'Pure Veg'})

  const navigate = useNavigate()
   var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    autoplay: true,               // ✅ enables autoplay
  autoplaySpeed: 2000, 
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // for tablets
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768, // for mobile
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  }
  return (
  <div className='py-20'>
  
  <div className='bg-[url("/popularbg.jpg")] relative  bg-cover  rounded-t-[100px] '>
  <div className='absolute h-full w-full top-0 z-20 bg-black/60 rounded-t-[100px]'></div>
  <div className='main-container relative z-40 py-12'>
      <div className='  flex justify-center relative -top-24 '>
<div className='grid py-10 rounded-3xl grid-cols-1 gap-8 sm:gap-0 sm:grid-cols-4 w-[70%] bg-yellow-600'>
   <div className='sm:border-r-2 border-black flex justify-center items-center flex-col'>
  <p className='text-5xl sm:text-6xl font-semibold'>99%</p>
  <p>Positive Reviews</p>
 </div>
<div className='sm:border-r-2 border-black flex justify-center items-center flex-col'>
  <p className='text-5xl sm:text-6xl font-semibold'>25+</p>
  <p>Years Experience</p>
 </div>
 <div className='sm:border-r-2 border-black flex justify-center items-center flex-col'>
  <p className='text-5xl sm:text-6xl font-semibold'>11k+</p>
  <p>Happy Customers</p>
 </div>
<div className=' flex justify-center items-center flex-col'>
  <p className='text-5xl sm:text-6xl font-semibold'>55+</p>
  <p>Official Branches</p>
 </div>
</div>
   
    </div>
     <div className='flex flex-col gap-7'>
      <div className="top grid grid-cols-1 gap-4 lg:gap-0 lg:grid-cols-3 items-center justify-center">
        <div className='flex flex-col items-center'>
            <p className='text-white font-semibold text-3xl text-center sm:text-5xl'>Checkout Popular <br/> Cuisine Dishes</p>
             <div className='text-yellow-600 flex text-lg sm:text-xl items-center gap-2 '>
       <div className="h-px w-10 sm:w-16 bg-yellow-600"></div>
       <p>Chef Recommendation</p>
        <div className="h-px w-10 sm:w-16 bg-yellow-600"></div>
     </div>
        </div>
        <div className='text-white text-center'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus quae architecto ullam sint velit. Ducimus, animi labore laborum deserunt assumenda molestias asperiores repellendus unde mollitia autem porro aut facere nemo?
        </div>
        <div className='flex justify-center'>
            <button onClick={()=>navigate('/menu')} className='px-5 hover:bg-yellow-600 hover:text-white py-2 rounded-3xl w-fit border-2 border-yellow-600 text-yellow-600'>
            View All Dishes
        </button>
        </div>
      </div>

      <div className="bottom ">
        <Slider {...settings}>
  {data.map((value,index)=>(
   <div key={index} className='px-4'>
 <div className='h-[450px] relative bg-transparent/50 text-white ' >
 <div className='image h-[60%] rounded-b-3xl overflow-hidden'>
<img src={`http://localhost:4000/uploads/` + value.image} alt="" className='h-full w-full object-cover' />
 </div>
 <div className='h-[40%] mt-4 flex flex-col items-center gap-3 p-3'>
  <img src={assets.rating_starts} alt="" />
  <p className='font-semibold text-2xl text-white'>{value.name}</p>
  <p className='text-center'>{value.description}</p>
 </div>
<div className='bg-yellow-600 w-20 h-20 font-semibold flex justify-center items-center text-3xl rounded-full  absolute -top-4 left-2'>
  $ {value.price}
</div>
 
    </div>
   </div>
   ))}
        </Slider>
 
      </div>
     </div>
  </div>
    </div>
  </div>
  )
}

export default Popular
