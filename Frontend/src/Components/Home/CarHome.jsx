// src/components/CarList.jsx
import React, { useContext } from "react";
import { CarContext } from "../Context/CarContext.jsx";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { GiSteeringWheel } from "react-icons/gi";
import { MdPeopleAlt } from "react-icons/md";
import { Link } from "react-router-dom";

const carImages = [
  /* fallback image URLs if needed */
];

const CarList = ({ data = [], limit = 8, title = "", Navi = true }) => {
  const { loading } = useContext(CarContext);

  if (loading) return <p className="text-center mt-6">Loading cars...</p>;

  return (
    <div className="mt-10 px-4">
      <div className="flex justify-between px-4">
        <p className="text-gray-400">{title}</p>
        {Navi && (
          <Link to={"/all-cars"} className="text-blue-500 hover:underline">
            View All
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
        {data
          .filter((car) => car.status === "Available")
          .slice(0, limit)
          .map((car, index) => (
            <Link
              to={`/car/${car._id}`}
              key={car._id || index}
              className=" relative transition-all mt-25 duration-300 ease-in-out transform hover:-translate-y-2  block"
            >
              <div>
                <span
                  className={` absolute -top-25 right-0 text-xs px-3 py-1 rounded-full font-medium ${
                    car.status === "Available"
                      ? "bg-green-100 text-green-700 shadow"
                      : "bg-red-100 text-red-600 shadow"
                  }`}
                >
                  {car.status}
                </span>
              </div>
              <div>
                <img
                  src={car.images?.[0] || carImages[index % carImages.length]}
                  alt={`${car.brand} ${car.model}`}
                  className=" absolute bottom-24 w-full left-3  h-[200px] md:h-[190px] object-cover mx-auto"
                />
              </div>
              <div className="bg-gradient-to-b from-white/10 via-blue-50 to-blue-100 p-3 pt-20 pb-3 rounded-b-2xl ">
                <div className="flex relative bottom-4 justify-between ">
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {car.brand} {car.model}
                    </h3>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">{car.category}</p>{" "}
                  </div>
                </div>
                <div className="flex justify-between  text-sm text-gray-400 mb-4">
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
                  <button className="bg-blue-400 text-white px-2 py-0.5 text-sm rounded hover:bg-blue-700 transition">
                    Rent Now
                  </button>
                </div>
              </div>
            </Link>
          ))}
      </div>

      <div className="flex justify-center mt-6">
        {Navi && (
          <Link
            to={"/all-cars"}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-blue-400 px-6 py-3 rounded text-white hover:bg-blue-500 transition"
          >
            Show more cars
          </Link>
        )}
      </div>
    </div>
  );
};

export default CarList;
