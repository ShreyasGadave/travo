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
      <div className="relative">
  <div className="sticky top-0  z-0 bg-white shadow-sm">
    <Header />
  </div>

  {/* Main Scrollable Stacked Section */}
  <div className="relative z-10 -mt-16 sm:-mt-24 rounded-t-4xl bg-[#F6F7F9] pt-1">
    {/* This section appears to “stack” below header */}
    <CarList data={cars} limit={4} title="Popular Cars" Navi={false} />
    <CarList data={cars} limit={8} title="Recommendation Car" Navi={true} />
    <LuxuryBanner />
    <Testimonials />
    <ClickableMap />
    <SubscribeSection />
    <Footer />
  </div>
</div>

    </div>
  )
}

export default Home
