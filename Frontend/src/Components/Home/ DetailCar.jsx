import React, { useState, useContext } from "react";
import Navbar from "./Navbar";
import { Link, useParams } from "react-router-dom";
import { CarContext } from "../Context/CarContext.jsx";
import Footer from "./Footer";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { MdPropaneTank } from "react-icons/md";
import { PiSeatFill } from "react-icons/pi";
import { RiPinDistanceFill } from "react-icons/ri";
import { GiSteeringWheel } from "react-icons/gi";
import CarHome from "./CarHome.jsx";
import { LiaExchangeAltSolid } from "react-icons/lia";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminContext } from "../Context/AdminContext.jsx";

const DetailCar = () => {
  const { id } = useParams();
  const { cars, loading } = useContext(CarContext);

  const [pickUp, setPickUp] = useState({
    date: null,
    time: null,
  });

console.log({ loading });

  

  const [dropOff, setDropOff] = useState({
    date: null,
    time: null,
  });

  const adminData = useContext(AdminContext);
const adminID=adminData.admin.adminId
  

  const [notes, setnotes] = useState("");
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
        ownerId: car.ownerId,
        carId: car._id,
        userId: adminID,
        carDetails: car,
        pickUp,
        dropOff,
        totalPrice,
        totalDays,
        notes,
        adminID
      };
      console.log(bookingData);

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

  if (loading) return <p className="text-center mt-6">Loading...</p>;
  if (!car) return <p className="text-center mt-6">Car not found.</p>;

  // ✅ Now safe to calculate after `car` is confirmed
  const getTotalDays = (pickUpDate, dropOffDate) => {
    const msPerDay = 1000 * 60 * 60 * 24;
    const start = new Date(pickUpDate);
    const end = new Date(dropOffDate);
    const timeDiff = end - start;
    const dayDiff = Math.ceil(timeDiff / msPerDay);
    return dayDiff > 0 ? dayDiff : 1;
  };

  const totalDays =
    pickUp.date && dropOff.date ? getTotalDays(pickUp.date, dropOff.date) : 0;

  const totalPrice = totalDays * car.price;

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
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:gap-6   overflow-hidden">
          {/* Left Panel */}
          <div className="relative w-full sm:w-1/2 rounded-lg shadow-lg overflow-hidden">
            <div className=" z-10 shadow sm:h-full h-[250px] bg-[#e8e8e8] text-black flex flex-col justify-center">
              <img
                src={car.images[0]}
                alt={`${car.brand} ${car.model}`}
                className=" absolute z-20 md:right-5 right-2 md:-top-2 top-5 w-full min-h-[300px] object-contain rounded-lg p-2"
              />
              <div className="md:hidden lg:flex absolute left-38 md:left-60 z-10 p-0.5 rounded-full border-2 border-gray-300">
                <div className="bg-white rounded-full h-40 w-40 sm:h-48 sm:w-48 flex items-center justify-center shadow-md text-center">
                  <div>
                    <p className="text-lg font-semibold text-gray-200">
                      {car.brand}
                    </p>
                    <p className="md:text-8xl text-7xl font-semibold text-gray-200">
                      {car.model}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="relative sm:w-1/2 w-full p-3 mt-1  rounded-lg bg-gradient-to-b from-white/10 via-blue-50 to-blue-100">
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
                className={`px-3 py-1 absolute shadow-lg right-2 top-3 rounded-full font-medium text-base ${
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

            <div className=" gap-2 flex flex-wrap justify-between text-sm text-gray-700">
              {/* Fuel Type */}
              <div className="flex items-center relative w-fit">
                <div className="bg-gray-700/40 rounded-full h-12 w-12 flex items-center justify-center z-10 shadow-md backdrop-blur-sm border border-white/30">
                  <BsFillFuelPumpFill size={20} className="text-gray-100" />
                </div>
                <div className="bg-white rounded-full pl-12 pr-6 py-2 -ml-10 shadow-md flex items-center gap-2">
                  {/* <span className="text-base font-bold text-blue-900">Fuel:</span> */}
                  <span className="text-base font-medium text-gray-600">
                    {car.fuelType}
                  </span>
                </div>
              </div>

              {/* Fuel Capacity */}
              <div className="flex items-center relative w-fit">
                <div className="bg-gray-700/40 rounded-full h-12 w-12 flex items-center justify-center z-10 shadow-md backdrop-blur-sm border border-white/30">
                  <MdPropaneTank size={20} className="text-gray-100" />
                </div>
                <div className="bg-white rounded-full pl-12 pr-6 py-2 -ml-10 shadow-md flex items-center gap-2">
                  {/* <span className="text-base font-bold text-blue-900">Fuel Capacity:</span> */}
                  <span className="text-base font-medium text-gray-600">
                    {car.fuelCapacity} L
                  </span>
                </div>
              </div>

              {/* Transmission */}
              <div className="flex items-center relative w-fit">
                <div className="bg-gray-700/40 rounded-full h-12 w-12 flex items-center justify-center z-10 shadow-md backdrop-blur-sm border border-white/30">
                  <GiSteeringWheel size={20} className="text-gray-100" />
                </div>
                <div className="bg-white rounded-full pl-12 pr-6 py-2 -ml-10 shadow-md flex items-center gap-2">
                  {/* <span className="text-base font-bold text-blue-900">Transmission:</span> */}
                  <span className="text-base font-medium text-gray-600">
                    {car.transmission}
                  </span>
                </div>
              </div>

              {/* Mileage */}
              <div className="flex items-center relative w-fit">
                <div className="bg-gray-700/40 rounded-full h-12 w-12 flex items-center justify-center z-10 shadow-md backdrop-blur-sm border border-white/30">
                  <RiPinDistanceFill size={20} className="text-gray-100" />
                </div>
                <div className="bg-white rounded-full pl-12 pr-6 py-2 -ml-10 shadow-md flex items-center">
                  <span className="text-base font-medium text-gray-600">
                    {car.mileage} km
                  </span>
                </div>
              </div>

              {/* Car Number */}
              <div className="flex items-center relative w-fit">
                <div className="bg-gray-700/40 rounded-full h-12 w-12 flex items-center justify-center z-10 shadow-md backdrop-blur-sm border border-white/30">
                  <RiPinDistanceFill size={20} className="text-gray-100" />
                </div>
                <div className="bg-white rounded-full pl-12 pr-6 py-2 -ml-10 shadow-md flex items-center">
                  <span className="text-base font-medium text-gray-600">
                    {car.registrationNumber}
                  </span>
                </div>
              </div>

              {/* Seats */}
              <div className="flex items-center relative w-fit">
                <div className="bg-gray-700/40 rounded-full h-12 w-12 flex items-center justify-center z-10 shadow-md backdrop-blur-sm border border-white/30">
                  <PiSeatFill size={20} className="text-gray-100" />
                </div>
                <div className="bg-white rounded-full pl-12 pr-6 py-2 -ml-10 shadow-md flex items-center">
                  <span className="text-base font-medium text-gray-600">
                    {car.seatingCapacity}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-5xl mb-5 px-4 md:px-0 space-y-6 ">
        {/* Description Section */}
        <div className="bg-white/30 backdrop-blur-md rounded-lg px-4 py-2 shadow border border-white/20">
          <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-3">
            Description
          </h3>
          <p className="text-base text-gray-700 leading-relaxed tracking-wide">
            {car.description}
          </p>
        </div>

        {/* Features Section */}
        <div className="bg-white/30 backdrop-blur-md rounded-lg px-4 py-2 shadow border border-white/20">
          <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-300 pb-2 mb-3">
            Features
          </h3>

          {Array.isArray(car.features) && car.features.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 text-gray-700 text-base list-disc list-inside">
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
      <div className="  mb-4 max-w-5xl mx-auto">
        <textarea
          id="message"
          name="message"
          value={notes}
          onChange={(e) => {
            setnotes(e.target.value);
          }}
          rows="2"
          placeholder="Type your message..."
          className="w-full rounded-lg bg-white p-3 text-base text-gray-900 shadow outline-none transition
           placeholder:text-gray-400
           focus:border-transparent focus:ring-2 focus:ring-indigo-200
           disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400"
        ></textarea>
      </div>

      <div className="px-4 mb-4">
        <div className="bg-white max-w-5xl w-full mx-auto px-6 py-4 rounded-xl shadow flex items-center justify-between">
          {totalDays > 0 && (
            <p className="text-lg font-semibold text-gray-800">
              Total Price: ₹{totalPrice} for {totalDays}{" "}
              {totalDays === 1 ? "day" : "days"}
            </p>
          )}

<Link to={'/booking'}> 
          <button
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
            onClick={handleBooking}
          >
            Book Now
          </button> </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetailCar;
