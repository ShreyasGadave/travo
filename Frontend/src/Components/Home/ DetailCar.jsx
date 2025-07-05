import Navbar from "./Navbar";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CarContext } from "../Context/CarContext.jsx";
import Footer from './Footer'
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
      <div className=" text-center pt-5 ">
        <h2 className="text-2xl lg:text-4xl font-semibold mb-3">
         Car Details —  {car.brand} {car.model}
        </h2>
        <p className="text-gray-500 text-lg">
          Subscribe to get the latest offers, new arrivals, and exclusive
          discounts
        </p>{" "}
      </div>
<div className="p-4">
      <div className="bg-white flex flex-col sm:flex-row  max-w-4xl mx-auto rounded-lg shadow-lg">
        <div className="bg-[url('/src/assets/JBG.jpg')] h-80 bg-cover bg-center rounded-lg p-6 text-white mb-6">
          <h3 className="text-2xl font-semibold mb-2">
            Sports car with the best design and acceleration
          </h3>
          <p className="text-sm">
            Safety and comfort while driving a futuristic and elegant sports car
          </p>
          <img
            src={car.images[0]}
            alt={`${car.brand} ${car.model}`}
            className="w-full object-contain mt-4 h-48"
          />
        </div>

        <div className="px-5">
          {/* Car Info */}
          <div className=" flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {car.brand} {car.model}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {car.year} • {car.category} • {car.transmission}
              </p>
            </div>
            <span
              className={`text- px-3 py-2 rounded-full font-medium ${
                car.status === "Available"
                  ? "bg-green-100 text-green-700 shadow"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {car.status}
            </span>
          </div>

          <p className="text-lg text-green-600 font-semibold mb-4">
            ₹{car.price} / day
          </p>

          {/* Car Specs */}
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-6">
            <p>
              <strong>Fuel:</strong> {car.fuelType}
            </p>
            <p>
              <strong>Fuel Capacity:</strong> {car.fuelCapacity} L
            </p>
            <p>
              <strong>Seats:</strong> {car.seatingCapacity}
            </p>
            <p>
              <strong>Mileage:</strong> {car.mileage} km
            </p>
            <p>
              <strong>Pickup:</strong> {car.pickupLocation?.address}
            </p>
            {/* <p><strong>Owner:</strong> {car.owner}</p> */}
            {/* <p><strong>Mobile:</strong> {car.mobile}</p> */}
            {/* <p><strong>Registration No:</strong> {car.registrationNumber}</p> */}
          </div>

          {/* Status and Rating */}
          {/* <div className="mb-4">
    <p><strong>Rating:</strong> ⭐ {car.rating?.toFixed(1) || 0} / 5</p>
  </div> */}

          {/* Description */}
          {/* <p className="text-sm text-gray-800 mb-4"><strong>Description:</strong> {car.description}</p> */}

          {/* Features */}
          {/* {car.features?.length > 0 && (
    <div>
      <strong className="font-semibold">Features:</strong>
      <ul className="list-disc list-inside mt-2 text-sm text-gray-700">
        {car.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  )} */}
        </div>
        
      </div>  </div>
      <Footer/>
    </>
  );
};

export default DetailCar;
