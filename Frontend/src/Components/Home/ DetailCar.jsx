import React, { useState, useContext } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { CarContext } from "../Context/CarContext.jsx";
import Footer from "./Footer";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { MdPropaneTank } from "react-icons/md";
import { PiSeatFill } from "react-icons/pi";
import { RiPinDistanceFill } from "react-icons/ri";
import { GiSteeringWheel } from "react-icons/gi";
import { LiaExchangeAltSolid } from "react-icons/lia";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DetailCar = () => {
  const { id } = useParams();
  const { cars, loading } = useContext(CarContext);

  // ✅ All hooks declared before any early return
  const [showMap, setShowMap] = useState(false);

  const [pickUp, setPickUp] = useState({
    date: null,
    time: null,
  });

  const [dropOff, setDropOff] = useState({
    date: null,
    time: null,
  });

  const car = cars.find((car) => car._id === id);

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (!car) return <p className="text-center mt-6">Car not found.</p>;

  const handleChange = (type, field, value) => {
    if (type === "pickup") {
      setPickUp((prev) => ({ ...prev, [field]: value }));

      if (field === "date" && dropOff.date && value && dropOff.date < value) {
        setDropOff((prev) => ({ ...prev, date: null }));
      }
    } else {
      setDropOff((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleBooking = async () => {
    if (!pickUp.date || !dropOff.date) {
 toast.warn("Please select both pickup and drop-off date/time.");
      return;
    }

    try {
      const bookingData = {
        carId: car._id,
        pickUp,
        dropOff,
      };

      const response = await fetch("http://localhost:4002/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Booking successful!");
        console.log("Booking response:", data);
        // Optionally redirect or clear form
      } else {
        toast.error(data.message || "Booking failed");
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("An error occurred while booking.");
    }
  };

  return (
    <div className="bg-[#F6F7F9]">
      <div className="text-center pt-5 p-4">
        <h2 className="text-2xl lg:text-4xl font-semibold mb-3">
          Car Details — {car.brand} {car.model}
        </h2>
        <p className="text-gray-500 text-lg">
          Subscribe to get the latest offers, new arrivals, and exclusive
          discounts
        </p>
      </div>

      <div className="p-4">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:gap-6 bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Left Panel */}
          <div className="relative w-full sm:w-1/2 rounded-lg shadow-lg overflow-hidden">
            <div className="relative z-10 shadow p-6 h-full bg-[#e8e8e8] text-black flex flex-col justify-center">
              <h3 className="text-2xl font-semibold mb-2">
                Sports car with the best design and acceleration
              </h3>
              <p className="text-sm mb-4">
                Safety and comfort while driving a futuristic and elegant sports
                car
              </p>
              <img
                src={car.images[0]}
                alt={`${car.brand} ${car.model}`}
                className="w-full max-h-35 object-contain rounded-lg p-2"
              />
            </div>
          </div>

          {/* Right Panel */}
          <div className="relative sm:w-1/2 w-full p-3 mt-1">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {car.brand} {car.model}
                </h2>
                <p className="text-base text-gray-500 mt-1">
                  {car.year} • {car.category} • {car.transmission}
                </p>
              </div>
              <span
                className={`px-3 py-1 absolute right-2 top-3 rounded-full font-medium text-base ${
                  car.status === "Available"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {car.status}
              </span>
            </div>

            <p className="text-lg text-green-600 font-semibold mb-4">
              ₹{car.price} / day
            </p>

            <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 mb-6">
              <p className="bg-blue-400/10 px-2 md:px-1 py-2 flex gap-1 rounded-lg">
                <strong className="flex items-center gap-1">
                  <BsFillFuelPumpFill size={20} /> Fuel:
                </strong>{" "}
                {car.fuelType}
              </p>
              <p className="bg-blue-400/10 px-1 py-2 flex gap-1 rounded-lg">
                <strong className="flex items-center gap-1">
                  <MdPropaneTank size={20} /> Fuel Capacity:
                </strong>{" "}
                {car.fuelCapacity} L
              </p>
              <p className="bg-blue-400/10 px-1 py-2 flex gap-1 rounded-lg">
                <strong className="flex items-center gap-1">
                  <PiSeatFill size={20} /> Seats:
                </strong>{" "}
                {car.seatingCapacity}
              </p>
              <p className="bg-blue-400/10 px-1 py-2 flex gap-1 rounded-lg">
                <strong className="flex items-center gap-1">
                  <RiPinDistanceFill size={20} /> Mileage:
                </strong>{" "}
                {car.mileage} km
              </p>
              <p className="bg-blue-400/10 px-1 py-2 flex gap-1 rounded-lg">
                <strong className="flex items-center gap-1">
                  <GiSteeringWheel size={20} /> Transmission:
                </strong>{" "}
                {car.transmission}
              </p>
              <p className="bg-blue-400/10 px-1 py-2 flex gap-1 rounded-lg">
                <strong className="flex items-center gap-1">
                  <RiPinDistanceFill size={20} /> Car No:
                </strong>{" "}
                {car.registrationNumber}
              </p>
            </div>
            {/* Description */}
            {/* Description Section */}
            <div className="my-2 px-4 md:px-6 lg:px-2">
              <h3 className="text-lg font-normal text-gray-800 mb-3 border-b pb-1 border-gray-300">
                Description
              </h3>
              <p className="text-base text-gray-700 leading-relaxed tracking-wide">
                {car.description}
              </p>
            </div>

            {/* Features Section */}
            <div className="my-2 px-4 md:px-6 lg:px-2">
              <h3 className="text-lg font-normla text-gray-800 mb-3 border-b pb-1 border-gray-300">
                Features
              </h3>

              {Array.isArray(car.features) && car.features.length > 0 ? (
                <ul className="list-disc list-inside grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-2 text-gray-700 text-base">
                  {car.features.map((feature, index) => (
                    <li key={index} className="pl-1">
                      {feature}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">No features listed.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pickup & Drop-off */}
      <div className="flex justify-center mb-4 px-4">
        <div className="w-full max-w-5xl flex flex-col md:flex-row justify-between gap-4">
          {/* Pickup */}
          <div className="bg-white rounded-lg shadow px-4 py-3 md:w-[49%] w-full">
            <h3 className="text-sm font-semibold text-blue-600 mb-4">
              <input type="radio" checked readOnly className="mr-2" />
              Pick – Up
            </h3>
            <div className="flex flex-row text-sm text-gray-500 gap-4">
              {/* Date */}
              <div className="flex-1">
                <p className="font-medium text-base text-gray-700">Date</p>
                <DatePicker
                  selected={pickUp.date}
                  onChange={(date) => handleChange("pickup", "date", date)}
                  placeholderText="Select your date"
                  dateFormat="yyyy-MM-dd"
                  minDate={new Date()}
                  className="w-full mt-1 pt-1 rounded text-base outline-none"
                />
              </div>
              {/* Time */}
              <div className="flex-1">
                <p className="font-medium text-base text-gray-700">Time</p>
                <DatePicker
                  selected={pickUp.time}
                  onChange={(time) => handleChange("pickup", "time", time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Select Time"
                  dateFormat="h:mm aa"
                  placeholderText="Select your time"
                  className="w-full mt-1 pt-1 rounded text-base outline-none"
                />
              </div>
            </div>
          </div>

          {/* Drop-off */}
          <div className="bg-white rounded-lg shadow px-4 py-3 md:w-[49%] w-full">
            <h3 className="text-sm font-semibold text-blue-600 mb-4">
              <input type="radio" checked readOnly className="mr-2" />
              Drop – Off
            </h3>
            <div className="flex flex-row text-sm text-gray-500 gap-4">
              {/* Date */}
              <div className="flex-1">
                <p className="font-medium text-base text-gray-700">Date</p>
                <DatePicker
                  selected={dropOff.date}
                  onChange={(date) => handleChange("dropoff", "date", date)}
                  placeholderText="Select your date"
                  dateFormat="yyyy-MM-dd"
                  minDate={pickUp.date || new Date()}
                  className="w-full mt-1 pt-1 text-base rounded outline-none"
                />
              </div>
              {/* Time */}
              <div className="flex-1">
                <p className="font-medium text-base text-gray-700">Time</p>
                <DatePicker
                  selected={dropOff.time}
                  onChange={(time) => handleChange("dropoff", "time", time)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Select Time"
                  dateFormat="h:mm aa"
                  placeholderText="Select your time"
                  className="w-full mt-1 pt-1 text-base rounded outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mb-4">
        <div className="bg-white max-w-5xl w-full mx-auto px-6 py-4 rounded-xl shadow flex items-center justify-between">
          <p className="text-lg font-semibold text-gray-800">
            ₹{car.price} / day
          </p>
          <button
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            onClick={handleBooking}
          >
            Book Now
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DetailCar;
