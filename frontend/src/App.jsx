import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Footer from './components/Footer'
import FormDialog from './components/FormDialog'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import Success from './pages/Success'
import Orders from './pages/Orders'
import Menu from './pages/Menu'

const App = () => {
  const [open , setOpen] = useState(false)
  const handleOpen = ()=>{
    setOpen(true)
  }
  const handleClose = ()=>{
    setOpen(false)
  }
  return (
    <div className='app'>
      <Navbar handleOpen = {handleOpen}/>
      <FormDialog open = {open} handleClose = {handleClose}/>
      <Routes>
       <Route path='/' element = {<Home/>}/>
       <Route path='/cart' element = {<Cart/>}/>
       <Route path='/menu' element = {<Menu/>}/>
       <Route path='/place-order' element = {<PlaceOrder/>}/>
       <Route path='/order-success' element = {<Success/>}/>
        <Route path='/myorders' element = {<Orders/>}/>
      </Routes>
      
      <Footer/>
    </div>
  )
}

export default App
