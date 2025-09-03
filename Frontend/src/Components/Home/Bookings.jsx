import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Bookings = () => {
  const [bookingData, setBookingData] = useState('')
  
  useEffect(()=>{
   const bookedcars= async ()=>{
    try {
      const res = await axios.get('')
      setBookingData(res)
    } catch (error) {
      
    }
   }
  })
  return (
    <div> jhbjh</div>
  )
}

export default Bookings