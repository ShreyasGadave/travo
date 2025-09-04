import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { AdminContext } from "../Context/AdminContext";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";

const Bookings = () => {
  const [bookingData, setBookingData] = useState([]);
  const admin = useContext(AdminContext);
  const adminID = admin?.admin?.adminId;

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4002/booking-data/${adminID}`,
        {
          headers: { "Cache-Control": "no-cache" },
        }
      );
      setBookingData(res.data);
      console.log("Latest bookings:", res.data);
    } catch (error) {
      console.log("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (adminID) {
        fetchBookings();
      }
    }, 10);

    // cleanup (in case component unmounts before 1s)
    return () => clearTimeout(timer);
  }, []); // ✅ empty array → runs once when component mounts

  return (
   <div className="p-6">
  {/* Page Heading */}
  <div className="text-center mb-6">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
      Booked Cars
    </h2>
    <p className="text-gray-500 mt-2 text-sm md:text-base">
      Review your recent bookings and track details of your reserved vehicles
    </p>
  </div>

  {bookingData.length === 0 ? (
    <p className="text-gray-500 text-center">No bookings yet</p>
  ) : (
    <div className="flex flex-col justify-center items-center gap-4">
      {bookingData
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((b, i) => (
          <div
            key={i}
            className="bg-gray-100 border border-gray-200 max-w-5xl w-full rounded-2xl shadow-md p-4 flex flex-col md:flex-row gap-4 transition"
          >
            {/* Car Image */}
            <div className="w-full md:w-1/3">
              <img
                src={b.carDetails?.images?.[0]}
                alt={b.carDetails?.model}
                className="w-full h-48 md:h-full object-cover rounded-lg"
              />
            </div>

            {/* Booking Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-2">
                <h3 className="text-lg font-semibold">
                  {b.carDetails?.brand} {b.carDetails?.model}
                </h3>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-4 py-2 border border-gray-500/10 shadow text-xs font-medium rounded-full ${
                      b.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : b.status === "Confirmed"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {b.status}
                  </span>
                  {/* Cancel Button (mobile friendly) */}
                  {b.status !== "Cancelled" && (
                    <button
                      onClick={() => handleCancelBooking(b._id)}
                      className="px-4 py-2 text-xs font-medium shadow text-white bg-red-500 hover:bg-red-600 rounded-full shadow transition"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>

              {/* Booking details in 2-column grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 mt-4 text-sm text-gray-700">
                <p>
                  <span className="font-medium">Booking Code:</span>{" "}
                  {b.bookingCode}
                </p>
                <p>
                  <span className="font-medium">Booked on:</span>{" "}
                  {new Date(b.createdAt).toLocaleString()}
                </p>

                <p>
                  <span className="font-medium">Pickup:</span>{" "}
                  {new Date(b.pickUp?.date).toLocaleDateString()}{" "}
                  {new Date(b.pickUp?.time).toLocaleTimeString()}
                </p>
                <p>
                  <span className="font-medium">Drop-off:</span>{" "}
                  {new Date(b.dropOff?.date).toLocaleDateString()}{" "}
                  {new Date(b.dropOff?.time).toLocaleTimeString()}
                </p>

                <p>
                  <span className="font-medium">Total Days:</span> {b.totalDays}
                </p>
                <p>
                  <span className="font-medium">Total Price:</span> ₹
                  {b.totalPrice}
                </p>

                <p>
                  <span className="font-medium">Payment:</span>{" "}
                  {b.paymentMethod} - {b.paymentStatus}
                </p>

                {b.notes && (
                  <p className="col-span-2 text-gray-600">
                    <span className="font-medium">Notes:</span> {b.notes}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
    </div>
  )}

  <Footer />
</div>

  );
};

export default Bookings;
