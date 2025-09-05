import React from 'react'
import Navbar from '../Home/Navbar'
import Sidebar from './Sidebar'
import ManageCars from './ManageCars'

const ManagesCarsDetails = () => {
  return (
    <div>
    
      <div className='flex md:flex-row flex-col'>
        <Sidebar/> <ManageCars/>
      </div>
    </div>
  )
}

export default ManagesCarsDetails
