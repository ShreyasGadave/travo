import React, { useContext } from "react";
import CarList from "./CarHome";
import { CarContext } from "../Context/CarContext.jsx";
import { CiSearch } from "react-icons/ci";
import { IoSearchSharp } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";

const AllCars = () => {
  const { cars, loading, searchQuery, setSearchQuery } = useContext(CarContext);

const filteredCars = cars.filter((car) =>
  car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
  car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
  car.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
  (car.features || []).join(", ").toLowerCase().includes(searchQuery.toLowerCase())
);


  return (
    <div className="bg-[#F6F7F9]">
      <Navbar />
      <div className="pt-16 text-center px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Available Cars
        </h2>
        <p className="text-gray-500 mt-2 text-sm md:text-base">
          Browse our selection of premium vehicles available for your next
          adventure
        </p>

        {/* Search Bar */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center bg-white w-full max-w-2xl px-4 py-3 rounded-full shadow-md">
            <IoSearchSharp className="text-gray-400 text-xl mr-3" />
            <input
              type="text"
              placeholder="Search by make, model, or features"
              className="flex-1 outline-none text-sm text-gray-700 placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            < FaFilter  className="text-gray-400 text-lg ml-3 cursor-pointer" />
          </div>
        </div>
      </div>

      <CarList data={filteredCars} title={`Showing ${filteredCars.length} Result${filteredCars.length !== 1 ? "s" : ""}`} Navi={false} />
      <Footer />
    </div>
  );
};

export default AllCars;
