import React from "react";
import { motion } from "framer-motion";
import carImage from "../../assets/13.png";  

const LuxuryBanner = () => {
  return (
 <div className="p-4">
  <div className="relative rounded-2xl overflow-hidden shadow-md">
    {/* Gradient background */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#1f71f5]/90 to-[#7fb4f6]/60 z-0" />

    {/* Glass content layer */}
    <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row items-center justify-between text-white">
      
      {/* Text content */}
      <div className="max-w-xl">
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          Do You Own a Luxury Car?
        </h2>
        <p className="text-lg mb-6 leading-relaxed text-white/90">
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
</div>


  );
};

export default LuxuryBanner;
