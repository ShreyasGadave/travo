// src/components/CarList.jsx
import React, { useContext } from "react";
import { CarContext } from "../Context/CarContext.jsx";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { GiSteeringWheel } from "react-icons/gi";
import { MdPeopleAlt } from "react-icons/md";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa6";


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

      <div className="flex flex-wrap justify-center gap-4 mt-3">
        {data
          .filter((car) => car.status === "Available")
          .slice(0, limit)
          .map((car, index) => (
            <Link
              to={`/car/${car._id}`}
              key={car._id || index}
              className=" relative transition-all mt-25 w-90 duration-300 ease-in-out transform hover:-translate-y-2  block"
            >
              <div>
                <span
                  className={`absolute -top-24 right-0 text-xs px-3 py-0.5 rounded-full font-medium backdrop-blur-sm bg-green-500/20 border border-white/30 shadow-sm ${
                    car.status === "Available"
                      ? "text-green-700"
                      : "text-red-600"
                  }`}
                >
                  {car.status}
                </span>
                <span
                  className={`absolute flex gap-1 items-center -top-24 left-0 text-xs px-3 py-0.5 rounded-full font-medium backdrop-blur-sm bg-yellow-500/20 border border-white/10 shadow-sm`}
                >
                < FaStar className=" text-yellow-500"/> {" "}{car.rating}/5
                </span>
              </div>
              <div>
                <img
                  src={car.images?.[0] || carImages[index % carImages.length]}
                  alt={`${car.brand} ${car.model}`}
                  className=" absolute bottom-24 w-full left-3 transition-all duration-100 ease-in  h-[200px] md:h-[190px] object-cover mx-auto"
                />
              </div>
              <div className=" bg-gradient-to-b from-white/10 via-blue-50 to-blue-100 p-3 pt-20 pb-3 rounded-b-2xl ">
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
                  <button className="bg-blue-200/80 backdrop-blur-sm text-blue-900 px-3 py-1 text-sm rounded-2xl border border-black/10 hover:bg-blue-500/30 transition shadow-sm">
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
            className="px-6 py-3 rounded text-blue-900 bg-blue-600/20 backdrop-blur-sm border border-white/30 shadow-sm hover:bg-blue-600/40 transition"
          >
            Show more cars
          </Link>
        )}
      </div>
    </div>
  );
};

export default CarList;
