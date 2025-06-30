import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import { LuCalendarDays } from "react-icons/lu";

const cities = [
  "Use My Location",
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Pune",
  "Hyderabad",
];

const PickDrop = () => {
  const [selectedCity, setSelectedCity] = useState("Pickup Location");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();
          const city =
            data?.address?.city ||
            data?.address?.town ||
            data?.address?.village ||
            "Unknown Location";
          setSelectedCity(city);
        } catch (error) {
          console.error("Error fetching location:", error);
          setSelectedCity("Location error");
        }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleCitySelect = (city) => {
    setDropdownOpen(false);
    if (city === "Use My Location") {
      getCurrentLocation();
    } else {
      setSelectedCity(city);
    }
  };

  return (
    <div className="px-6">
    <div className="bg-white px-6 py-6 md:py-4 rounded-xl md:rounded-full shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 max-w-4xl mx-auto md:mt-5">
      {/* City Dropdown */}
      <div className="relative">
        <div className="flex flex-col">
          <span className="font-medium text-black text-lg">{selectedCity}</span>
          <span
            className="text-sm text-gray-400 cursor-pointer flex items-center gap-1"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Choose location <IoMdArrowDropdown />
          </span>
        </div>
        {dropdownOpen && (
          <ul className="absolute z-10 mt-2 bg-white border rounded shadow w-40 text-gray-700 max-h-40 overflow-y-auto">
            {cities.map((city, index) => (
              <li
                key={index}
                className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleCitySelect(city)}
              >
                {city}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Pick-up Date */}
      <div className="flex flex-col">
        <span className="font-medium text-black">Pick-up Date</span>
        <div className="flex items-center gap-2 text-gray-500">
          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="text-sm outline-none bg-transparent appearance-none"
          />
          <LuCalendarDays size={18} />
        </div>
      </div>

      {/* Return Date */}
      <div className="flex flex-col">
        <span className="font-medium text-black">Return Date</span>
        <div className="flex items-center gap-2 text-gray-500">
          <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            min={pickupDate || new Date().toISOString().split("T")[0]}
            className="text-sm outline-none bg-transparent appearance-none"
          />
          <LuCalendarDays size={18} />
        </div>
      </div>

      {/* Search Button */}
      <button className="bg-blue-600 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-blue-700 transition whitespace-nowrap">
        <FiSearch />
        Search
      </button>
    </div> </div>
  );
};

export default PickDrop;
