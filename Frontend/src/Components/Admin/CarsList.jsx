import {useContext} from 'react'
import Navbar from '../Home/Navbar'
import Sidebar from './Sidebar'
import Cars from './Cars'

const CarsList = () => {
  return (
    <div>
      <div className=' flex md:flex-row flex-col '>
      <Sidebar/> <Cars/> </div>
    </div>
  )
}

export default CarsList
