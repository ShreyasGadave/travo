import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { GiSteeringWheel } from "react-icons/gi";
import { MdPeopleAlt } from "react-icons/md";

import A from "../../assets/1.png";
import B from "../../assets/2.png";
import C from "../../assets/3.png";
import D from "../../assets/4.png";
import E from "../../assets/5.png";
import F from "../../assets/6.png";
import G from "../../assets/7.png";
import H from "../../assets/8.png";
import I from "../../assets/9.png";
import J from "../../assets/10.png";
import K from "../../assets/11.png";
import L from "../../assets/12.png";

// Map images
const carImages = [
  A,
  C,
  F,
  D,
  H,
  B,
  L,
  G,
  J,
  A,
  I,
  E,
  K,
  D,
  F,
  C,
  B,
  L,
  H,
  G,
  E,
  A,
  D,
  J,
  I,
  C,
  K,
  G,
  B,
  L,
];

const CarList = ({ data, limit, tittle, Navi }) => {
  const [cars, setCars] = useState(data);

  const handleToggleLike = (index) => {
    const updatedCars = [...cars];
    updatedCars[index].liked = !updatedCars[index].liked;
    setCars(updatedCars);
  };

  return (
    <div className="mt-10 px-6 ">
      <div className="flex justify-between px-6">
        {" "}
        <p className="text-gray-400">{tittle}</p>{" "}
        <a href="#" className="text-blue-500">
          View All
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-3">
        {cars.slice(0, limit).map((car, index) => (
          <div
            key={car.id}
            className="bg-white shadow-md p-4 rounded-lg relative transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-lg"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-gray-800">{car.title}</h3>
                <p className="text-sm text-gray-400">{car.type}</p>
              </div>
              <div
                onClick={() => handleToggleLike(index)}
                className="cursor-pointer"
              >
                {car.liked ? (
                  <AiFillHeart className="text-red-500" size={20} />
                ) : (
                  <AiOutlineHeart className="text-gray-400" size={20} />
                )}
              </div>
            </div>

            <img
              src={carImages[index % carImages.length]}
              alt={car.title}
              className="w-full h-28 object-contain my-3"
            />

            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span className="flex items-center gap-1">
                <BsFillFuelPumpFill /> {car.fuel}
              </span>
              <span className="flex items-center gap-1">
                <GiSteeringWheel size={18} /> {car.gear}
              </span>
              <span className="flex items-center gap-1">
                <MdPeopleAlt size={18} /> {car.seats}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <span className="font-bold text-lg">${car.price}.00</span>
                <span className="text-xs text-gray-400">/day</span>
                {car.oldPrice && (
                  <div className="text-xs line-through text-gray-400">
                    ${car.oldPrice}.00
                  </div>
                )}
              </div>
              <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition">
                Rent Now
              </button>
            </div>
          </div>
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
