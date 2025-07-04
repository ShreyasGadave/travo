import React, { useState } from "react";
import { LiaExchangeAltSolid } from "react-icons/lia";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PickDrop = () => {

  const [showMap, setShowMap] = useState(false);
  
  const [pickUp, setPickUp] = useState({
    location: "",
    date: null,
    time: null,
  });

  const [dropOff, setDropOff] = useState({
    location: "",
    date: null,
    time: null,
  });

  const handleChange = (type, field, value) => {
    if (type === "pickup") {
      setPickUp((prev) => ({ ...prev, [field]: value }));

      // Reset dropOff date if pickup date is after it
      if (field === "date" && dropOff.date && value && dropOff.date < value) {
        setDropOff((prev) => ({ ...prev, date: null }));
      }
    } else {
      setDropOff((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSwap = () => {
    const newPickup = { ...dropOff };
    const newDropoff = { ...pickUp };

    // 🛡️ Validate: if new pickup date is after new drop-off, reset drop-off date
    if (
      newPickup.date &&
      newDropoff.date &&
      new Date(newPickup.date) > new Date(newDropoff.date)
    ) {
      newDropoff.date = null;
    }

    setPickUp(newPickup);
    setDropOff(newDropoff);
  };

  return (
    <div className="  flex items-center justify-center ">
      <div className="flex flex-col md:flex-row items-center md:gap-4 px-4">
        {/* Pickup */}
        <div className=" bg-white rounded-lg shadow px-3 py-2 md:w-1/2 w-full">
          <h3 className="text-sm font-semibold text-blue-600 mb-4">
            <input type="radio" checked readOnly className="mr-2" />
            Pick – Up
          </h3>
          <div className="flex text-sm text-gray-500 space-x-6">
            {/* Location */}
            <div className="flex-1">
              <p className="font-medium text-base text-gray-700">Location</p>
              <input
                type="text"
                value={pickUp.location}
                onChange={(e) =>
                  handleChange("pickup", "location", e.target.value)
                }
                placeholder="Enter your city"
                className="w-full mt-1 pt-1 rounded text-base"
              />
            </div>

            {/* Date */}
            <div className="flex-1">
              <p className="font-medium text-base text-gray-700">Date</p>
              <DatePicker
                selected={pickUp.date}
                onChange={(date) => handleChange("pickup", "date", date)}
                placeholderText="Select your date"
                dateFormat="yyyy-MM-dd"
                minDate={new Date()}
                className="w-full mt-1  pt-1 rounded text-base outline-none focus:ring-0 focus:outline-none"
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
                className="w-full mt-1 pt-1 rounded outline-none text-base focus:ring-0 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <button
          onClick={handleSwap}
          className="bg-blue-600 text-white shadow-md p-4 -mt-1 -mb-3 md:m-0 rounded hover:bg-blue-700 transition z-10"
        >
          <LiaExchangeAltSolid className="rotate-90" size={18} />
        </button>

        {/* Dropoff */}
        <div className=" bg-white rounded-lg shadow px-3 py-2 md:w-1/2 w-full">
          <h3 className="text-sm font-semibold text-blue-600 mb-4">
            <input type="radio" checked readOnly className="mr-2" />
            Drop – Off
          </h3>
          <div className="flex text-sm text-gray-500 space-x-6">
            {/* Location */}
            <div className="flex-1">
              <p className="font-medium text-base  text-gray-700">Location</p>
              <input
                type="text"
                value={dropOff.location}
                onChange={(e) =>
                  handleChange("dropoff", "location", e.target.value)
                }
                placeholder="Enter your city"
                className="w-full mt-1 pt-1 text-base rounded"
              />
            </div>

            {/* Date */}
            <div className="flex-1">
              <p className="font-medium text-base text-gray-700">Date</p>
              <DatePicker
                selected={dropOff.date}
                onChange={(date) => handleChange("dropoff", "date", date)}
                placeholderText="Select your date"
                dateFormat="yyyy-MM-dd"
                minDate={pickUp.date || new Date()}
                className="w-full mt-1 pt-1 rounded outline-none text-base focus:ring-0 focus:outline-none"
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
                className="w-full mt-1 pt-1 rounded outline-none text-base focus:ring-0 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickDrop;
