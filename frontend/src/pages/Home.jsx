import React, { useState } from 'react'
import Header from '../components/home/Header'
import Menu from '../components/home/Menu'
import Dishes from '../components/home/Dishes'
import AppDownload from '../components/home/AppDownload'
import Whowe from '../components/home/Whowe'
import Popular from '../components/home/Popular'

const Home = () => {
    
  return (
    <div className=' '>
      <Header/>
      <Whowe/>
      <Menu />
      <Popular/>
      
      <AppDownload/>
    </div>
  )
}

export default Home
