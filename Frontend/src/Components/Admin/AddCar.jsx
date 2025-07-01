import React from 'react'
import Sidebar from './Sidebar'
import Navbar from '../Home/Navbar'
import AddCarForm from './AddCarForm'

const AddCar = () => {
  return (
    <div>
      <Navbar/>
      <div className='flex'>        <Sidebar/> <AddCarForm/></div>

    </div>
  )
}

export default AddCar
