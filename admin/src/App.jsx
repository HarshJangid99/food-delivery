import React from 'react'
import AdminLayout from './components/AdminLayout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import AllItems from './components/AllItems'
import AddItem from './components/AddItem'
import Orders from './components/Orders'
const App = () => {
  return (
   <BrowserRouter>
   <Routes>
   <Route path='/' element = {<AdminLayout/>}>
   <Route index element = {<AllItems/>}/>
   <Route path='AddItem' element = {<AddItem/>}/>
   <Route path='Order' element = {<Orders/>}/>
   </Route>
   </Routes>
   </BrowserRouter>
  )
}

export default App
