import React from 'react'
import Navbar from '../Home/Navbar'
import Sidebar from './Sidebar'
import ManageCars from './ManageCars'

const ManagesCarsDetails = () => {
  return (
    <div>
      <Navbar/>
      
      <div className='flex'>
        <Sidebar/> <ManageCars/>
      </div>
    </div>
  )
}

export default ManagesCarsDetails
