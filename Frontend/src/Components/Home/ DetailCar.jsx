import Navbar from "./Navbar";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CarContext } from "../Context/CarContext.jsx";
import Footer from "./Footer";
import BG from "../../assets/JBG.jpg";

const DetailCar = () => {
  const { id } = useParams();
  const { cars, loading } = useContext(CarContext);

  const car = cars.find((car) => car._id === id);

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (!car) return <p className="text-center mt-6">Car not found.</p>;

  return (
    <>
      <Navbar />

      <div className="text-center pt-5">
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
    <div className="relative sm:w-1/2 w-full rounded-t-lg sm:rounded-l-lg overflow-hidden">
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
    <div className="sm:w-1/2 w-full p-6">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {car.brand} {car.model}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {car.year} • {car.category} • {car.transmission}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full font-medium text-xs ${
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
        <p><strong>Fuel:</strong> {car.fuelType}</p>
        <p><strong>Fuel Capacity:</strong> {car.fuelCapacity} L</p>
        <p><strong>Seats:</strong> {car.seatingCapacity}</p>
        <p><strong>Mileage:</strong> {car.mileage} km</p>
        <p className="col-span-2">
          <strong>Pickup:</strong> {car.pickupLocation?.address}
        </p>
      </div>
    </div>
  </div>
</div>


      <Footer />
    </>
  );
};

export default DetailCar;
