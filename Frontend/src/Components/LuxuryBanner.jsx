import React from "react";
import carImage from "../assets/13.png"; // make sure this matches your file name and location

const LuxuryBanner = () => {
  return (
    <div className="p-6">
    <div className="bg-gradient-to-r from-[#1f71f5] to-[#7fb4f6] rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-center justify-between text-white overflow-hidden">
      <div className="max-w-xl">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          Do You Own a Luxury Car?
        </h2>
        <p className="text-lg mb-6 leading-relaxed">
          Monetize your vehicle effortlessly by listing it on CarRental. <br />
          We take care of insurance, driver verification and secure payments —
          so you can earn passive income, stress-free.
        </p>
        <button className="bg-white text-blue-600 font-medium px-6 py-2 rounded-lg hover:bg-blue-100 transition">
          List your car
        </button>
      </div>
      <img
        src={carImage}
        alt="Luxury Car"
        className="w-full md:w-1/2 max-w-sm mt-8 md:mt-0"
      />
    </div> </div>
  );
};

export default LuxuryBanner;
