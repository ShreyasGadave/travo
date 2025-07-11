import React, { useContext } from "react";
import Navbar from '../Home/Navbar'
import Header from '../Home/Header'
import PickDrop from '../Home/PickDrop'
import CarList from '../Home/CarHome'
import LuxuryBanner from '../Home/LuxuryBanner'
import Testimonials from '../Home/Testimonials'
import SubscribeSection from '../Home/SubscribeSection'
import Footer from '../Home/Footer';
import carData from '../../assets/carData.json'
import ClickableMap from '../Home/Map.jsx'
import { CarContext } from '../Context/CarContext.jsx'

const Home = () => {
  const { cars, loading } = useContext(CarContext);

  return (
    <div className='bg-[#F6F7F9]'>
      <Header/>
      <PickDrop/>
        <CarList data={cars} limit={4}  title={"Popular Cars"} Navi={false} />
        <CarList data={cars} limit={8}  title={"Recomendation Car"} Navi={true} />
      < LuxuryBanner/> 
      <Testimonials/>
      <ClickableMap/>
      <SubscribeSection/>
      <Footer/>
    </div>
  )
}

export default Home
