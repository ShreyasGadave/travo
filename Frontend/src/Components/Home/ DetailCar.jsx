import Navbar from "./Navbar";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CarContext } from "../Context/CarContext.jsx";
import Footer from "./Footer";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { MdPropaneTank } from "react-icons/md";
import { PiSeatFill } from "react-icons/pi";
import { RiPinDistanceFill } from "react-icons/ri";

const DetailCar = () => {
  const { id } = useParams();
  const { cars, loading } = useContext(CarContext);

  const car = cars.find((car) => car._id === id);

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (!car) return <p className="text-center mt-6">Car not found.</p>;

  return (
    < div className="bg-[#F6F7F9]">
      <Navbar />

      <div className="text-center pt-5 p-4">
        <h2 className="text-2xl lg:text-4xl font-semibold mb-3">
          Car Details — {car.brand} {car.model}
        </h2>
        <p className="text-gray-500 text-lg">
          Subscribe to get the latest offers, new arrivals, and exclusive discounts
        </p>
      </div>

   <div className="p-4">
  <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:gap-6 bg-white rounded-lg shadow-lg overflow-hidden">
    
    {/* Left Panel */}
   <div className="relative w-full sm:w-1/2 rounded-t-lg sm:rounded-t-none sm:rounded-l-lg overflow-hidden">

      <div className="relative z-10 p-6 h-full bg-[#e8e8e8] text-black flex flex-col justify-center">
        <h3 className="text-2xl font-semibold mb-2">
          Sports car with the best design and acceleration
        </h3>
        <p className="text-sm mb-4">
          Safety and comfort while driving a futuristic and elegant sports car
        </p>
        <img 
          src={car.images[0]}
          alt={`${car.brand} ${car.model}`}
          className="w-full max-h-40 object-contain rounded-lg p-2"
        />
      </div>
    </div>

    {/* Right Panel */}
    <div className=" relative sm:w-1/2 w-full p-3 mt-1">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {car.brand} {car.model}
          </h2>
          <p className="text-base text-gray-500 mt-1">
            {car.year} • {car.category} • {car.transmission}
          </p>
        </div>
        <span
          className={`px-3 py-1 absolute right-2 top-3 rounded-full font-medium text-base ${
            car.status === "Available"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {car.status}
        </span>
      </div>

      <p className="text-lg text-green-600 font-semibold mb-4">
        ₹{car.price} / day
      </p>

      <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 mb-6">
        <p className="bg-black/10  p-2 flex gap-2 rounded "><strong className="flex justify-center items-center gap-2"> < BsFillFuelPumpFill size={20}/> Fuel:</strong> {car.fuelType}</p>
        <p className="bg-black/10  p-2 flex gap-2 rounded "><strong className="flex justify-center items-center gap-2"> < MdPropaneTank size={20}/> Fuel Capacity:</strong> {car.fuelCapacity} L</p>
        <p className="bg-black/10  p-2 flex gap-2 rounded "><strong className="flex justify-center items-center gap-2"> < PiSeatFill  size={20}/> Seats:</strong> {car.seatingCapacity}</p>
        <p className="bg-black/10  p-2 flex gap-2 rounded "><strong className="flex justify-center items-center gap-2"> < RiPinDistanceFill size={20}/> Mileage:</strong> {car.mileage} km</p>
      </div>
    </div> 
  </div>
</div>

 <div className="max-w-5xl mx-auto">
      {/* Step 1: Billing Info */}
      <div className="mb-6 shadow-lg rounded-lg bg-white p-4">
        
        <h2 className="text-xl font-semibold mb-2">Billing Info</h2>
        <p className="text-gray-500 mb-4">Please enter your billing info</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="input bg-gray-200" type="text" placeholder="Your name" />
          <input className="input bg-gray-200" type="text" placeholder="Phone number" />
          <input className="input bg-gray-200" type="text" placeholder="Address" />
          <input className="input bg-gray-200" type="text" placeholder="Town or city" />
        </div>
      </div>

      {/* Step 2: Rental Info */}
      <div className="mb-4 shadow-lg rounded-lg bg-white p-4">
        <h2 className="text-xl font-semibold mb-2">Rental Info</h2>
        <p className="text-gray-500 mb-4">Please select your rental date</p>

        <div className="mb-4">
          <label className="block font-medium mb-1">Pick-Up</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <select className="bg-gray-200 px-4 appearance-none">
  <option>Select your city</option>
</select>

            <input className="input bg-gray-200" type="date" />
            <select className="input bg-gray-200">
              <option>Select your time</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1">Drop-Off</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select className="input bg-gray-200 appearance-none">
              <option>Select your city</option>
            </select>
            <input className="input bg-gray-200" type="date" />
            <select className="input bg-gray-200 appearance-none">
              <option>Select your time</option>
            </select>
          </div>
        </div>
      </div>

      {/* Step 3: Payment Method */}
      <div className="mb-4 shadow-lg rounded-lg bg-white p-4">
        <h2 className="text-xl font-semibold mb-2">Payment Method</h2>
        <p className="text-gray-500 mb-4">Please enter your payment method</p>

        <div className="mb-4">
          <label className="block font-medium mb-2">
            <input type="radio" name="payment" className="mr-2" /> Credit Card
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="input" type="text" placeholder="Card number" />
            <input className="input" type="text" placeholder="DD / MM / YY" />
            <input className="input" type="text" placeholder="Card holder" />
            <input className="input" type="text" placeholder="CVC" />
          </div>
        </div>

        <label className="block font-medium mb-2">
          <input type="radio" name="payment" className="mr-2" /> PayPal
        </label>
        <label className="block font-medium mb-2">
          <input type="radio" name="payment" className="mr-2" /> Bitcoin
        </label>
      </div>

      {/* Step 4: Confirmation */}
      <div className="mb-4 shadow-lg rounded-lg bg-white p-4">
        <h2 className="text-xl font-semibold mb-2">Confirmation</h2>
        <p className="text-gray-500 mb-4">
          We are getting to the end. Just few clicks and your rental is ready!
        </p>
        <div className="mb-4">
          <label className="flex items-center mb-2">
            <input type="checkbox" className="mr-2" /> I agree with sending marketing and newsletter emails. No spam, promised!
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> I agree with our terms and conditions and privacy policy.
          </label>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Rent Now</button>
        <p className="text-xs text-gray-400 mt-2">
          We are using the most advanced security to provide you the best experience ever.
        </p>
      </div>
    </div>
      <Footer />
    </div>
  );
};

export default DetailCar;
