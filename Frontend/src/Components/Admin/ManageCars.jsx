import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageCars = () => {
  const [cars, setCars] = useState([]);

//   useEffect(() => {
//     // Fetch cars from backend
//     const fetchCars = async () => {
//       try {
//         const response = await axios.get("http://localhost:3009/cars");
//         setCars(response.data);
//       } catch (error) {
//         console.error("Failed to fetch cars:", error);
//       }
//     };

//     fetchCars();
//   }, []);

  return (
    <div className="p-5 sm:p-10">
      <h2 className="text-3xl font-semibold mb-2">Manage Cars</h2>
      <p className="text-gray-500 mb-6">
        View all listed cars, update their details, or remove them from the booking platform.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-left">
              <th className="px-6 py-3 font-medium  ">Car</th>
              <th className="px-6 py-3 font-medium hidden sm:block">Category</th>
              <th className="px-6 py-3 font-medium">Price</th>
              <th className="px-6 py-3 font-medium hidden sm:block" >Status</th>
              <th className="px-6 py-3 font-medium ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-gray-400 py-6">
                  No cars listed yet.
                </td>
              </tr>
            ) : (
              cars.map((car) => (
                <tr key={car._id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center gap-3">
                    {car.images && car.images[0] && (
                      <img
                        src={car.images[0]}
                        alt={car.model}
                        className="w-16 h-10 object-cover rounded"
                      />
                    )}
                    <span>{car.brand} {car.model}</span>
                  </td>
                  <td className="px-6 py-4">{car.category}</td>
                  <td className="px-6 py-4">${car.price}</td>
                  <td className="px-6 py-4">Available</td>
                  <td className="px-6 py-4 space-x-2">
                    <button className="text-blue-500 hover:underline">Edit</button>
                    <button className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCars;
