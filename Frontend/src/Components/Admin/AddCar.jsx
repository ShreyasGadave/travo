import React from 'react'
import Sidebar from './Sidebar'
import Navbar from '../Home/Navbar'
import AddCarForm from './AddCarForm'

const AddCar = () => {
  return (
    <div>
      <div className='flex md:flex-row flex-col '>        <Sidebar/> <AddCarForm/></div>

    </div>
  )
}

export default AddCar
