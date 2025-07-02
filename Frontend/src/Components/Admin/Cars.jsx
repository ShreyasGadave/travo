import React, { useContext, useState } from "react";
import { CarContext } from "../Context/CarContext.jsx";

const Cars = () => {
  const { cars, loading } = useContext(CarContext);
  const [expandedCarId, setExpandedCarId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedCarId((prevId) => (prevId === id ? null : id));
  };

  if (loading)
    return <p className="text-center text-lg mt-10">Loading cars...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {cars.map((car) => {
        const isExpanded = expandedCarId === car._id;

        return (
          <div
            key={car._id}
            className="bg-white h-fit rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            {/* Car Image */}
            <img
              src={car.images[0]}
              alt={`${car.brand} ${car.model}`}
              className="w-full h-56 object-contain bg-gray-100 p-3"
            />

            {/* Car Basic Info */}
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {car.brand} {car.model}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {car.year} • {car.category} • {car.transmission}
                  </p>
                </div>
                <div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${
                      car.status === "Available"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {car.status}
                  </span>
                </div>
              </div>

              <p className="text-lg text-green-600 font-semibold mt-3">
                ₹{car.price} / day
              </p>

              <div className="mt-3 text-sm text-gray-600 space-y-1">
                <p><strong>Fuel:</strong> {car.fuelType}</p>
                <p><strong>Seats:</strong> {car.seatingCapacity}</p>
                <p><strong>Pickup:</strong> {car.pickupLocation?.address}</p>
              </div>

              {/* Toggle Details Button */}
              <button
                onClick={() => toggleExpand(car._id)}
                className="mt-3 text-blue-600 text-sm font-medium hover:underline"
              >
                {isExpanded ? "Show Less" : "More Info"}
              </button>

              {/* Expandable Details */}
              {isExpanded && (
                <div className="mt-3 text-sm text-gray-700 space-y-1">
                  <p><strong>Fuel Capacity:</strong> {car.fuelCapacity} L</p>
                  <p><strong>Mileage:</strong> {car.mileage} km</p>
                  <p><strong>Owner:</strong> {car.owner}</p>
                  <p><strong>Mobile:</strong> {car.mobile}</p>
                  <p><strong>Registration No:</strong> {car.registrationNumber}</p>

                  {car.description && (
                    <p className="mt-2"><strong>Description:</strong> {car.description}</p>
                  )}

                  {car.features?.length > 0 && (
                    <div className="mt-2">
                      <strong>Features:</strong>
                      <ul className="list-disc list-inside mt-1">
                        {car.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="text-yellow-500 font-medium mt-2">
                    ⭐ {car.rating?.toFixed(1) || 0} / 5
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cars;
