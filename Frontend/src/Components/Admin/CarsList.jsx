import React from 'react'
import Navbar from '../Home/Navbar'
import Sidebar from './Sidebar'
import Cars from './Cars'

const CarsList = () => {
  return (
    <div>
      <Navbar/>
      <div className=' flex'>
      <Sidebar/> <Cars/> </div>
    </div>
  )
}

export default CarsList
