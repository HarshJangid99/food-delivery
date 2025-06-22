import React, { useContext } from 'react'
import { assets, menu_list } from '../assets/assets'
import { StoreContext } from '../context/StoreContext'

const Menu = () => {
    const {food , activeMenu , setActiveMenu} = useContext(StoreContext)
    const categories = [{menu_name : 'All' } ,  ...menu_list]
   const filteredFood = activeMenu === "All" ? food : food.filter(item => item.category === activeMenu)
  return (
    <div >
       <div className="banner relative bg-[url('/herobg.jpg')] bg-cover bg-top h-[200px]">
  <div className='absolute h-full w-full bg-cover top-0 bg-black/50 z-10'></div>
  <div className='main-container h-full relative z-30 flex justify-center items-center'>
  <p className='text-white'>Home  // <span className='text-yellow-600'> Menus</span></p>
  </div>
       </div>

       <div className='bottom relative py-6 bg-gray-100 main-container flex flex-col gap-5 lg:gap-0 lg:flex-row min-h-[500px] h-screen'>
    <div className="left lg:w-[30%] lg:sticky top-0 space-y-3">
        <p className='text-2xl font-bold'>Category </p>
        <div className='flex lg:flex-col flex-row  gap-5 overflow-auto whitespace-nowrap'>
            {categories.map((value,index)=>(
                <div key={index} onClick={()=>setActiveMenu(value.menu_name)} className={`font-semibold text-lg ${value.menu_name == activeMenu ? 'text-yellow-600' : ''}`}>
                    {value.menu_name}
                </div>
            ))}
        </div>
    </div>
    <div className="items lg:w-[70%] overflow-auto">
        <p>Showing {filteredFood.length} results</p>
         <div>
       
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-3'>
            { filteredFood.map((value,index)=>(
               <Foodcard key={value._id} id={value._id} name={value.name} description={value.description} price={value.price} image = {value.image}/>
            )) }
        </div>
       </div>
    </div>
       </div>
    </div>
  )
}

export default Menu
const Foodcard = ({id , name , image , description , price})=>{

  const {cartItems , addToCart , removeFromCart , setCartItems , token} = useContext(StoreContext)
  const handleadd=(id)=>{
if(token){
addToCart(id)
}else{
  alert("Please login first ")
}
}
  return(
     <div  className=' flex flex-col gap-2 shadow-lg rounded-t-3xl overflow-hidden '>
                  <div className='h-[60%] relative'>
  <img src={`http://localhost:4000/uploads/` + image} alt="" className='h-full w-full object-fit ' />
  {!cartItems[id] ? <img src={assets.add_icon_white} className='cursor-pointer absolute bottom-2 h-10 right-2' onClick={() => handleadd(id)}/> : <div className=' flex items-center p-1 rounded-3xl bg-white gap-3 absolute right-2 bottom-2'>
    <img src={assets.remove_icon_red} className='cursor-pointer' alt="" onClick={()=>removeFromCart(id)} />
    {cartItems[id]}
    <img src={assets.add_icon_green} className='cursor-pointer' alt="" onClick={()=>addToCart(id)} />
  </div> }
                  </div>
                  <div className='px-4  flex flex-col gap-3 h-[40%]'>
                   <div className='flex justify-between items-center'>
                    <p className='text-xl font-semibold'>{name}</p>
                    <img src={assets.rating_starts} alt="" />
                   </div>
                   <p className='text-[#49557e]'>{description}</p>
                   <p className='text-xl font-semibold text-[tomato]'>$ {price}</p>
                  </div>
              </div>
  )
}
