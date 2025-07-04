// src/components/CarList.jsx
import React, { useContext, useState } from "react";
import { CarContext } from "../Context/CarContext.jsx";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { GiSteeringWheel } from "react-icons/gi";
import { MdPeopleAlt } from "react-icons/md";
import { Link } from "react-router-dom"; 

const CarList = ({ limit = 8, title = "Top Cars", Navi = true }) => {
  const { cars, loading } = useContext(CarContext);
  const [likedCars, setLikedCars] = useState({});

  const handleToggleLike = (index) => {
    setLikedCars((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (loading) return <p className="text-center mt-6">Loading cars...</p>;

  return (
    <div className="mt-10 px-4">
      <div className="flex justify-between px-4">
        <p className="text-gray-400">{title}</p>
        <a href="#" className="text-blue-500 hover:underline">
          View All
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
       {cars.slice(0, limit).map((car, index) => (
  <Link
    to={`/car/${car._id}`} // 👈 Navigate to car detail page
    key={car._id || index}
    className="bg-white shadow-md p-4 rounded-lg relative transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-lg block"
  >
    <div className="flex relative justify-between items-center">
      <div>
        <h3 className="font-semibold text-gray-800">
          {car.brand} {car.model}
        </h3>
        <p className="text-sm text-gray-400">{car.category}</p>
      </div>
      <div >
       <p className="px-3 text-sm bg-green-200 rounded-2xl absolute -right-1 text-gray-500 top-0">{car.status}</p>
      </div>
    </div>

    <img
      src={car.images?.[0] || carImages[index % carImages.length]}
      alt={`${car.brand} ${car.model}`}
      className="w-full h-28 object-contain my-3"
    />

    <div className="flex justify-between text-sm text-gray-400 mb-2">
      <span className="flex items-center gap-1">
        <BsFillFuelPumpFill /> {car.fuelCapacity}
      </span>
      <span className="flex items-center gap-1">
        <GiSteeringWheel size={18} /> {car.transmission}
      </span>
      <span className="flex items-center gap-1">
        <MdPeopleAlt size={18} /> {car.seatingCapacity}
      </span>
    </div>

    <div className="flex justify-between items-center">
      <div>
        <span className="font-bold text-lg">₹{car.price}</span>
        <span className="text-xs text-gray-400"> /day</span>
      </div>
      <button className="bg-blue-400 text-white px-2 text-sm rounded hover:bg-blue-700 transition">
        Rent Now
      </button>
    </div>
  </Link>
))}
      </div>

      <div className="flex justify-center mt-6">
        {Navi && (
          <button className="bg-blue-400 px-6 py-3 rounded text-white hover:bg-blue-500 transition">
            Show more cars
          </button>
        )}
      </div>
    </div>
  );
};

export default CarList;
