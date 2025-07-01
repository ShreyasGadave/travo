import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const res = await axios.get("http://localhost:3009/bookings");
//         setBookings(res.data);
//       } catch (error) {
//         console.error("Error fetching bookings:", error);
//       }
//     };

//     fetchBookings();
//   }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-2">Manage Bookings</h2>
      <p className="text-gray-500 mb-6">
        Track all customer bookings, approve or cancel requests, and manage booking statuses.
      </p>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-50 text-gray-600 text-left">
              <th className="px-6 py-3">Car</th>
              <th className="px-6 py-3">Date Range</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3">Payment</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-gray-400 py-6">
                  No bookings found.
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking._id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4">{booking.carName || "N/A"}</td>
                  <td className="px-6 py-4">
                    {booking.startDate} - {booking.endDate}
                  </td>
                  <td className="px-6 py-4">${booking.total}</td>
                  <td className="px-6 py-4">{booking.paymentStatus}</td>
                  <td className="px-6 py-4 space-x-2">
                    <button className="text-green-500 hover:underline">Approve</button>
                    <button className="text-red-500 hover:underline">Cancel</button>
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

export default ManageBookings;
