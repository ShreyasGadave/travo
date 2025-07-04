import React from "react";
import whiteCar from "../../assets/Lembo.png";
import silverCar from "../../assets/silver-car.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row gap-4 px-4 py-6">
      {/* Card 1 */}
      <div className="flex-1 bg-blue-400 text-white rounded-xl p-4 shadow-md relative overflow-hidden">
        <h2 className="text-3xl font-bold leading-tight mb-3">
          The Best Platform
          <br />
          for Car Rental
        </h2>
        <p className="text-sm mb-4">
          Ease of doing a car rental safely and
          <br />
          reliably. Of course at a low price.
        </p>
        <Link
          to={"/all-cars"}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-blue-700 hover:bg-blue-800 transition text-white px-4 py-2 rounded-md"
        >
          Rental Car
        </Link>
        <motion.img
          src={whiteCar}
          alt="white car"
          className="absolute -bottom-2.5 right-3 w-[60%] -rotate-1 object-contain"
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 to-transparent pointer-events-none"></div>
      </div>

      {/* Card 2 */}
      <div className="flex-1 bg-[#275CFF] text-white shadow-md rounded-xl p-4 relative overflow-hidden">
        <h2 className="text-3xl font-bold leading-tight mb-3">
          Easy way to rent a<br />
          car at a low price
        </h2>
        <p className="text-sm mb-4">
          Providing cheap car rental services
          <br />
          and safe and comfortable facilities.
        </p>
        <Link
          to={"/all-cars"}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-blue-400 hover:bg-blue-500 transition text-white px-4 py-2 rounded-md"
        >
          Rental Car
        </Link>
        <motion.img
          src={silverCar}
          alt="white car"
          className="absolute bottom-0 right-3 w-[60%] object-contain"
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        <div className="absolute inset-0 bg-[url('/your-pattern.svg')] bg-cover opacity-20 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default Header;
