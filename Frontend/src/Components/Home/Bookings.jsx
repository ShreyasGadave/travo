import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AdminContext } from "../Context/AdminContext";
import Footer from "./Footer";
import {
  FaCalendarAlt,
  FaGasPump,
  FaChair,
  FaTachometerAlt,
} from "react-icons/fa";
import AgentMap from "./AgentMap";
import { FaUserCircle, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import {
  FaClipboardList,
  FaClock,
  FaMoneyBillWave,
  FaCreditCard,
} from "react-icons/fa";
import { FaStickyNote } from "react-icons/fa";

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
                      <span className="font-medium">Cancelled By : </span>{" "}
                      {b.cancelledBy}
                    </p>
                    <p className="text-red-700 text-sm ">
                      <span className="font-medium">Reason : </span>{" "}
                      {b.cancellationReason}
                    </p>
                    <p className="text-red-700 text-sm mt-1">
                      <span className="font-medium">Cancelled At : </span>{" "}
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

                  {b.status === "Confirmed" && (
  <div className="flex flex-col gap-3 p-1 bg-green-50 border border-green-200 rounded-lg">
    {/* Cancelled info */}
    {b.cancelledBy && (
      <p className="text-green-700 text-sm">
        <span className="font-medium">Cancelled By : </span> {b.cancelledBy}
      </p>
    )}

    {/* Payment & Confirm section */}
    <div className="flex flex-col sm:flex-row pl-3 sm:items-center sm:justify-between gap-2">
      <p className="text-green-700 text-sm">
        Please make the payment to confirm your booking.
      </p>
      <button
        className="px-4 py-2 text-base shadow bg-green-300 text-green-700 rounded-lg hover:bg-green-400 transition"
        onClick={() => {setSelectedBooking(b); setDetailsBox(true);}} >
        Make Payment & Confirm Booking
      </button>
    </div>
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
          {/* Background */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

          {/* Modal */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-[95%] max-w-5xl bg-white rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-blue-200 text-white rounded-t-2xl px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold tracking-wide">
                Booking Summary
              </h2>
              <button
                onClick={() => setDetailsBox(false)}
                className="text-black text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-8">
              {/* Top Section: Car Image + Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                {/* Car Image */}
                <div className="w-full -right-3 relative h-54 md:h-72 overflow-hidden">
                  <img
                    src={selectedBooking.carDetails?.images?.[0]}
                    alt={selectedBooking.carDetails?.model}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Basic Car Info */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">
                      {selectedBooking.carDetails?.brand}{" "}
                      {selectedBooking.carDetails?.model}
                    </h3>
                    <p className="text-gray-600 mt-1">
                      {selectedBooking.carDetails?.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {/* Year */}
                    <div className="bg-gray-50 p-3 rounded-lg shadow-sm flex items-center gap-3">
                      <FaCalendarAlt className="text-indigo-600 text-xl" />
                      <div className="flex justify-center items-center gap-2">
                        <p className=" text-gray-500">Year :</p>
                        <p className="font-medium text-gray-800">
                          {selectedBooking.carDetails?.year}
                        </p>
                      </div>
                    </div>

                    {/* Fuel */}
                    <div className="bg-gray-50 p-3 rounded-lg shadow-sm flex items-center gap-3">
                      <FaGasPump className="text-indigo-600 text-xl" />
                      <div className="flex justify-center items-center gap-2">
                        <p className=" text-gray-500">Fuel :</p>
                        <p className="font-medium text-gray-800">
                          {selectedBooking.carDetails?.fuelType} (
                          {selectedBooking.carDetails?.fuelCapacity}L)
                        </p>
                      </div>
                    </div>

                    {/* Seats */}
                    <div className="bg-gray-50 p-3 rounded-lg shadow-sm flex items-center gap-3">
                      <FaChair className="text-indigo-600 text-xl" />
                      <div className="flex justify-center items-center gap-2">
                        <p className=" text-gray-500">Seats :</p>
                        <p className="font-medium text-gray-800">
                          {selectedBooking.carDetails?.seatingCapacity}
                        </p>
                      </div>
                    </div>

                    {/* Mileage */}
                    <div className="bg-gray-50 p-3 rounded-lg shadow-sm flex items-center gap-3">
                      <FaTachometerAlt className="text-indigo-600 text-xl" />
                      <div className="flex justify-center items-center gap-2">
                        <p className=" text-gray-500">Mileage :</p>
                        <p className="font-medium text-gray-800">
                          {selectedBooking.carDetails?.mileage} km/l
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features */}
              {selectedBooking.carDetails?.features?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Features
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedBooking.carDetails.features.map((f, i) => (
                      <span
                        key={i}
                        className="bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full text-xs text-blue-700"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Owner Info */}
              <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
                {/* Header */}
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b border-gray-200 pb-3">
                  <FaUserCircle className="text-indigo-600 text-2xl" />
                  Owner Details
                </h3>

                <div className="space-y-4">
                  {/* Owner Name */}
                  <div className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-indigo-50 transition">
                    <FaUserCircle className="text-indigo-500 text-lg" />
                    <p className="text-gray-700 text-sm">
                      <span className="font-semibold text-gray-800">Name:</span>{" "}
                      {selectedBooking.carDetails?.owner}
                    </p>
                  </div>

                  {/* Contact Number */}
                  <div className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-indigo-50 transition">
                    <FaPhoneAlt className="text-indigo-500 text-lg" />
                    <p className="text-gray-700 text-sm">
                      <span className="font-semibold text-gray-800">
                        Contact:
                      </span>{" "}
                      {selectedBooking.carDetails?.mobile}
                    </p>
                  </div>

                  {/* Pickup Address */}
                  <div className="flex items-start gap-4 p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-indigo-50 transition">
                    <FaMapMarkerAlt className="text-indigo-500 text-lg mt-1" />
                    <p className="text-gray-700 text-sm">
                      <span className="font-semibold text-gray-800">
                        Pickup Location:
                      </span>{" "}
                      {selectedBooking.carDetails?.pickupLocation?.address}
                    </p>
                  </div>
                </div>
              </div>
              <div className="  rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
                {/* Header */}
                <h3 className="text-lg p-6 font-bold text-gray-800 mb-3 flex items-center gap-2 border-b border-gray-200 pb-2">
                  <FaMapMarkerAlt className="text-blue-500 text-xl" />
                  Pickup Location
                </h3>

                {/* Map */}
                <div className="w-full h-full  overflow-hidden ">
                  <AgentMap
                    location_lat={selectedBooking.carDetails.pickupLocation.lat}
                    location_lng={selectedBooking.carDetails.pickupLocation.lng}
                  />
                </div>
              </div>
              {/* Booking Info */}
              <div className="bg-gradient-to-br from-white to-indigo-50 p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
                {/* Header */}
                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2 border-b border-gray-200 pb-3">
                  <FaClipboardList className="text-indigo-600 text-2xl" />
                  Booking Details
                </h3>

                {/* Booking Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                  {/* Booking Code */}
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-indigo-50 transition">
                    <FaClipboardList className="text-indigo-500 text-lg" />
                    <p>
                      <span className="font-semibold text-gray-800">Code:</span>{" "}
                      {selectedBooking.bookingCode}
                    </p>
                  </div>

                  {/* Pickup */}
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-indigo-50 transition">
                    <FaCalendarAlt className="text-indigo-500 text-lg" />
                    <p>
                      <span className="font-semibold text-gray-800">
                        Pickup:
                      </span>{" "}
                      {new Date(
                        selectedBooking.pickUp?.date
                      ).toLocaleDateString()}{" "}
                      <span className="text-gray-500">at</span>{" "}
                      {new Date(
                        selectedBooking.pickUp?.time
                      ).toLocaleTimeString()}
                    </p>
                  </div>

                  {/* Dropoff */}
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-indigo-50 transition">
                    <FaClock className="text-indigo-500 text-lg" />
                    <p>
                      <span className="font-semibold text-gray-800">
                        Dropoff:
                      </span>{" "}
                      {new Date(
                        selectedBooking.dropOff?.date
                      ).toLocaleDateString()}{" "}
                      <span className="text-gray-500">at</span>{" "}
                      {new Date(
                        selectedBooking.dropOff?.time
                      ).toLocaleTimeString()}
                    </p>
                  </div>

                  {/* Total Days */}
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-indigo-50 transition">
                    <FaCalendarAlt className="text-indigo-500 text-lg" />
                    <p>
                      <span className="font-semibold text-gray-800">
                        Total Days:
                      </span>{" "}
                      {selectedBooking.totalDays}
                    </p>
                  </div>

                  {/* Total Price */}
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-indigo-50 transition">
                    <FaMoneyBillWave className="text-green-500 text-lg" />
                    <p>
                      <span className="font-semibold text-gray-800">
                        Total Price:
                      </span>{" "}
                      <span className="text-green-600 font-bold">
                        ₹{selectedBooking.totalPrice}
                      </span>
                    </p>
                  </div>

                  {/* Payment Method & Status */}
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-indigo-50 transition">
                    <FaCreditCard className="text-indigo-500 text-lg" />
                    <p>
                      <span className="font-semibold text-gray-800">
                        Payment:
                      </span>{" "}
                      {selectedBooking.paymentMethod} (
                      <span
                        className={
                          selectedBooking.paymentStatus === "Pending"
                            ? "text-red-500 font-medium"
                            : "text-green-600 font-medium"
                        }
                      >
                        {selectedBooking.paymentStatus}
                      </span>
                      )
                    </p>
                  </div>

                  {/* Amount Paid */}
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:bg-indigo-50 transition">
                    <FaMoneyBillWave className="text-indigo-500 text-lg" />
                    <p>
                      <span className="font-semibold text-gray-800">
                        Amount Paid:
                      </span>{" "}
                      ₹{selectedBooking.amountPaid}
                    </p>
                  </div>
                </div>
              </div>
              {/* Notes */}
              {selectedBooking.notes && (
                <div className="bg-gradient-to-br from-white to-yellow-50 p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition duration-300">
                  {/* Header */}
                  <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2 border-b border-gray-200 pb-2">
                    <FaStickyNote className="text-yellow-500 text-xl" />
                    Notes
                  </h3>

                  {/* Note Text */}
                  <p className="text-gray-700 text-sm leading-relaxed italic">
                    "{selectedBooking.notes}"
                  </p>
                </div>
              )}

              {/* Close Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => setDetailsBox(false)}
                  className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Bookings;
