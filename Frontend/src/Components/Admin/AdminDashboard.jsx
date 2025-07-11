import React, { useEffect, useState } from "react";
import { FaCar, FaClipboardList, FaExclamationTriangle } from "react-icons/fa";
import { useAdmin } from "../Context/AdminContext.jsx";
import axios from "axios";

const AdminDashboard = () => {
  
  const { admin, cars, loading, fetchCars } = useAdmin();
  
  useEffect(() => {
    if (admin?.adminId) {
      fetchCars(admin.adminId);
    } else {
     
    }
  }, [admin]);
  
  const [totalCars, setTotalCars] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [pendingBookings, setPendingBookings] = useState(0);
  const [confirmedBookings, setConfirmedBookings] = useState(0);
  const [revenue, setRevenue] = useState(0);

useEffect(() => {
  setTotalCars(cars.length);
}, [cars]);


  return (
    <div className="p-5 sm:p-10">
      <h1 className="text-3xl font-semibold mb-1">Admin Dashboard</h1>
      <p className="text-gray-500 mb-6">
        Monitor overall platform performance including total cars, bookings, revenue, and recent activities
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Cars", value: totalCars, icon: <FaCar /> },
          { label: "Total Bookings", value: totalBookings, icon: <FaClipboardList /> },
          { label: "Pending", value: pendingBookings, icon: <FaExclamationTriangle /> },
          { label: "Confirmed", value: confirmedBookings, icon: <FaClipboardList /> },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 justify-between p-4 border border-gray-300 rounded shadow-sm bg-white"
          >
            <div>
              <h4 className="text-sm text-gray-500">{item.label}</h4>
              <p className="text-xl font-medium">{item.value}</p>
            </div>
            <div className="bg-blue-100 text-blue-500 p-2 rounded-full">{item.icon}</div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="col-span-2 border border-gray-300 rounded p-4 bg-white shadow-sm">
          <h3 className="font-medium text-lg">Recent Bookings</h3>
          <p className="text-sm text-gray-500">Latest customer bookings</p>
          {/* You can map bookings here later */}
        </div>

        <div className="border border-gray-300 rounded p-4 bg-white shadow-sm">
          <h3 className="font-medium text-lg">Monthly Revenue</h3>
          <p className="text-sm text-gray-500 mb-2">Revenue for current month</p>
          <p className="text-3xl font-bold text-blue-600">₹{revenue}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
