import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { AdminContext } from "../Context/AdminContext";
import Footer from "./Footer";

const Bookings = () => {
  const [bookingData, setBookingData] = useState([]);
  const [cancelbox, setCancelbox] = useState(false);
  const [cancelResone, setcancelResone] = useState("");
  const [detailsBox, setDetailsBox] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
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
    } catch (error) {
      console.log("Error fetching bookings:", error);
    }
  };

  const handleCancelBooking = async (_id, reason) => {
    try {
      const cancel = await axios.put(
        `http://localhost:4002/bookings/${_id}/cancel`,
        {
          status: "Cancelled",
          cancellationReason: reason,
          cancelledBy: "User",
        }
      );

      console.log("Booking cancelled:", cancel.data);

      setCancelbox(false);
      setSelectedBookingId(null);
      setcancelResone("");
      fetchBookings(); // refresh list after cancellation
    } catch (error) {
      console.error("Error cancelling booking:", error);
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
          Review your recent bookings and track details of your reserved
          vehicles
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
                className={`  border bg-gray-100 border-gray-200 max-w-5xl w-full rounded-2xl shadow-md p-3 flex-col md:flex-row gap-4 transition `}
              >
                <div className="flex">
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
                          className={`px-4 py-2 border border-gray-500/10 shadow text-xs font-medium rounded-lg ${
                            b.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700 "
                              : b.status === "Confirmed"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {b.status}
                        </span>
                        {b.status === "Confirmed" && (
                          <button
                            onClick={() => {
                              setSelectedBooking(b); // store booking details
                              setDetailsBox(true);
                            }}
                            className="px-4 py-2 text-xs font-medium text-white bg-blue-400 border border-gray-500/10 hover:bg-blue-500 rounded-lg shadow transition"
                          >
                            View Details
                          </button>
                        )}
                        {/* Cancel Button (mobile friendly) */}
                        {b.status !== "Cancelled" && (
                          <button
                            onClick={() => {
                              setSelectedBookingId(b._id); // store the correct booking id
                              setCancelbox(true);
                            }}
                            className="px-4 py-2 text-xs font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg shadow transition"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>

                    {cancelbox ? (
                      <div
                        onClick={() => setCancelbox(false)}
                        className="fixed inset-0 flex items-center justify-center z-50"
                      >
                        {/* Background Overlay */}
                        <div className="absolute inset-0 backdrop-blur-xs"></div>

                        {/* Cancel Box */}
                        <div
                          onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside box
                          className="relative w-80 min-w-2xl bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4"
                        >
                          <h3 className="text-lg font-semibold text-gray-800 text-center">
                            Cancel Booking
                          </h3>

                          {/* Textarea for Cancel Reason */}
                          <textarea
                            placeholder="Enter cancel reason..."
                            name="cancelReasone"
                            value={cancelResone}
                            onChange={(e) => {
                              setcancelResone(e.target.value);
                            }}
                            rows={4}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-400"
                          />

                          {/* Action Buttons */}
                          <div className="flex justify-end gap-3">
                            <button
                              onClick={() => setCancelbox(false)}
                              className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-100"
                            >
                              Close
                            </button>
                            <button
                              onClick={() => {
                                handleCancelBooking(
                                  selectedBookingId,
                                  cancelResone
                                ); // use stored id
                              }}
                              className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-600"
                            >
                              Confirm Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : null}

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
                        <span className="font-medium">Total Days:</span>{" "}
                        {b.totalDays}
                      </p>
                      <p>
                        <span className="font-medium">Total Price:</span> ₹
                        {b.totalPrice}
                      </p>

                      {/* <p>
                      <span className="font-medium">Payment:</span>{" "}
                      {b.paymentMethod} - {b.paymentStatus}
                    </p> */}

                      {b.notes && (
                        <p className="col-span-2 text-gray-600">
                          <span className="font-medium">Notes:</span> {b.notes}
                        </p>
                      )}
                    </div>
                  </div>{" "}
                </div>

                {b.status === "Cancelled" && (
                  <div className="flex justify-between items-center p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700  text-sm">
                      <span className="font-medium">Cancelled By:</span>{" "}
                      {b.cancelledBy}
                    </p>
                    <p className="text-red-700 text-sm ">
                      <span className="font-medium">Reason:</span>{" "}
                      {b.cancellationReason}
                    </p>
                    <p className="text-red-700 text-sm mt-1">
                      <span className="font-medium">Cancelled At:</span>{" "}
                      {b.cancelledAt
                        ? new Date(b.cancelledAt).toLocaleString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "N/A"}
                    </p>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}

      {detailsBox && selectedBooking && (
        <div
          onClick={() => setDetailsBox(false)}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          {/* Background Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Modal Box */}
          <div
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            className="relative w-[90%] max-w-2xl bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4 overflow-y-auto max-h-[90vh]"
          >
            <h3 className="text-xl font-bold text-gray-800 text-center">
              Car Booking Details
            </h3>

            {/* Car Image */}
            <img
              src={selectedBooking.carDetails?.images?.[0]}
              alt={selectedBooking.carDetails?.model}
              className="w-full h-56 object-cover rounded-lg"
            />

            {/* Car + Booking Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700">
              <p>
                <span className="font-medium">Brand:</span>{" "}
                {selectedBooking.carDetails?.brand}
              </p>
              <p>
                <span className="font-medium">Model:</span>{" "}
                {selectedBooking.carDetails?.model}
              </p>
              <p>
                <span className="font-medium">Reg No:</span>{" "}
                {selectedBooking.carDetails?.registrationNumber}
              </p>
              <p>
                <span className="font-medium">Booking Code:</span>{" "}
                {selectedBooking.bookingCode}
              </p>
              <p>
                <span className="font-medium">Pickup Date:</span>{" "}
                {new Date(selectedBooking.pickUp?.date).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Pickup Time:</span>{" "}
                {new Date(selectedBooking.pickUp?.time).toLocaleTimeString()}
              </p>
              <p>
                <span className="font-medium">Drop Date:</span>{" "}
                {new Date(selectedBooking.dropOff?.date).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Drop Time:</span>{" "}
                {new Date(selectedBooking.dropOff?.time).toLocaleTimeString()}
              </p>
              <p>
                <span className="font-medium">Total Days:</span>{" "}
                {selectedBooking.totalDays}
              </p>
              <p>
                <span className="font-medium">Total Price:</span> ₹
                {selectedBooking.totalPrice}
              </p>
              <p>
                <span className="font-medium">Payment:</span>{" "}
                {selectedBooking.paymentMethod} ({selectedBooking.paymentStatus}
                )
              </p>
              <p>
                <span className="font-medium">Amount Paid:</span> ₹
                {selectedBooking.amountPaid}
              </p>
            </div>

            {selectedBooking.notes && (
              <p className="text-gray-600">
                <span className="font-medium">Notes:</span>{" "}
                {selectedBooking.notes}
              </p>
            )}

            {/* Close Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setDetailsBox(false)}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Bookings;
