import React from 'react'
import Navbar from '../Home/Navbar'
import Header from '../Home/Header'
import PickDrop from '../Home/PickDrop'
import CarList from '../Home/CarHome'
import LuxuryBanner from '../Home/LuxuryBanner'
import Testimonials from '../Home/Testimonials'
import SubscribeSection from '../Home/SubscribeSection'
import Footer from '../Home/Footer';
import carData from '../../assets/carData.json'
import { CarProvider } from '../Context/CarContext.jsx'
import ClickableMap from '../Home/Map.jsx'

const Home = () => {
  return (
    <div>
       <Navbar/>
      <Header/>
      <PickDrop/>
    
      < CarList   data={carData} limit={4} tittle={'Popular Cars'} Navi={false}/>
       < CarList  data={carData} limit={8} tittle={'Recomendation Car'} Navi={true}/>

      < LuxuryBanner/> 
      <Testimonials/>
      <ClickableMap/>
      <SubscribeSection/>
      <Footer/>
    </div>
  )
}

export default Home
