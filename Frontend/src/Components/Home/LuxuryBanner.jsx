import React from "react";
import { motion } from "framer-motion";
import carImage from "../../assets/13.png";  

const LuxuryBanner = () => {
  return (
    <div className="p-6">
      <div className="bg-gradient-to-r from-[#1f71f5] to-[#7fb4f6] rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-center justify-between text-white overflow-hidden">
        {/* Text content */}
        <div className="max-w-xl">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Do You Own a Luxury Car?
          </h2>
          <p className="text-lg mb-6 leading-relaxed">
            Monetize your vehicle effortlessly by listing it on travo. <br />
            We take care of insurance, driver verification and secure payments —
            so you can earn passive income, stress-free.
          </p>
          <button className="bg-white text-blue-600 font-medium px-6 py-2 rounded-lg hover:bg-blue-100 transition">
            List your car
          </button>
        </div>

        {/* Motion image */}
        <motion.img
          src={carImage}
          alt="Luxury Car"
          className="w-full md:w-1/2 max-w-sm mt-8 md:mt-0"
          initial={{ x: 200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </div>
    </div>
  );
};

export default LuxuryBanner;
