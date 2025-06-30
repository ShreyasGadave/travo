import React from 'react'
import Navbar from './Components/Navbar'
import Header from './Components/Header'
import PickDrop from './Components/PickDrop'
import CarList from './Components/CarList'
import LuxuryBanner from './Components/LuxuryBanner'
import carData from "./assets/carData.json";
import Testimonials from './Components/Testimonials'
import SubscribeSection from './Components/SubscribeSection'
import Footer from './Components/Footer'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Header/>
      <PickDrop/>
      < CarList data={carData} limit={10}/>
      < LuxuryBanner/>
      <Testimonials/>
      <SubscribeSection/>
      <Footer/>
    </div>
  )
}

export default App
