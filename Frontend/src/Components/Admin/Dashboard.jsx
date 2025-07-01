import React from 'react'
import Navbar from '../Home/Navbar'
import Sidebar from './Sidebar'
import AdminDashboard from './AdminDashboard'

const Dashboard = () => {
  return (
    <div>
      <Navbar/>
      <div className='flex'> <Sidebar/> <AdminDashboard/> </div>
    </div>
  )
}

export default Dashboard
