import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import axios from 'axios'
export const StoreContext = createContext()

const StoreContextProvider = ({children})=>{
const [activeMenu, setActiveMenu] = useState(() => localStorage.getItem("category") || "All");
    const [cartItems , setCartItems] = useState({})
    const [token , setToken] = useState(localStorage.getItem("token") || "")
    const [food , setFood] = useState([])
const addToCart = (itemId)=>{
   if(!cartItems[itemId]){
    setCartItems((prev)=>({...prev , [itemId] : 1}))
   }else { 
    setCartItems((prev)=>({...prev , [itemId]:prev[itemId]+1} ))
   }
   
}
const removeFromCart = (itemId)=>{
setCartItems((prev)=>{
    const updateCart = {...prev}
    const key = String(itemId)
    if(updateCart[key]<=1){
        delete updateCart[itemId]
    }else{
        updateCart[key] -= 1
    }
    return updateCart
})
}

const contextValue = {
    food_list,
    cartItems,
    addToCart,
    removeFromCart,
    setCartItems,
    token,
    setToken,
    food,
    activeMenu,
    setActiveMenu
}
        const updateCart = async()=>{
try{
    const response =await axios.patch('https://food-delivery-4z3h.onrender.com/api/cart/updatecart' ,{cart : cartItems} , {
    headers : {
          
      Authorization: `Bearer ${token}` // if using auth
   
    }
   })
 
        } catch (err) {
          console.error("Cart update failed:", err.response?.data);
        }
        }
useEffect(()=>{
    if(token && Object.keys(cartItems).length>0){

       const timer = setTimeout(()=>{
        updateCart()
       },2000)
       return ()=> clearTimeout(timer)
    }
   
},[cartItems])
useEffect(()=>{
    localStorage.setItem('category' , activeMenu)
},[activeMenu])


const cartReload = async()=>{
    try{
        const response = await axios.get('https://food-delivery-4z3h.onrender.com/api/cart/refreshcart' , {
            headers : {
                Authorization : `Bearer ${token}`
            }
        })
        setCartItems(response.data.data)
    }catch(err){
        alert(err)
    }
}
 const fetchFood = async()=>{
  try{
    const response =await axios.get('https://food-delivery-4z3h.onrender.com/api/food/list')
    if(response.data.success){
      setFood(response.data.data)
     
    }else{
      alert(response.data.message)
    }
  }catch(err){
alert(err)
  }
 }
 useEffect(()=>{
    fetchFood()
 },[])
 
useEffect(()=>{
    if(token){
        cartReload()
    }else{
        setCartItems({})
    }
},[token])
return(
    <StoreContext.Provider value={contextValue }>
        {children}
    </StoreContext.Provider>
)


}
export default StoreContextProvider