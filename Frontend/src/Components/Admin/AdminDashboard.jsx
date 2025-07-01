import React from "react";
import { FaCar, FaClipboardList, FaExclamationTriangle } from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <div className="p-5 sm:p-10">
      <h1 className="text-3xl font-semibold mb-1">Admin Dashboard</h1>
      <p className="text-gray-500 mb-6">
        Monitor overall platform performance including total cars, bookings, revenue, and recent activities
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="flex items-center gap-2 justify-between p-4 border border-gray-300 rounded shadow-sm bg-white">
          <div>
            <h4 className="text-sm text-gray-500">Total Cars</h4>
            <p className="text-xl font-medium ">0</p>
          </div>
          <div className="bg-blue-100 text-blue-500 p-2 rounded-full">
            <FaCar />
          </div>
        </div>

        <div className="flex items-center gap-2 justify-between p-4 border border-gray-300  rounded shadow-sm bg-white">
          <div>
            <h4 className="text-sm text-gray-500">Total Bookings</h4>
            <p className="text-xl font-medium ">0</p>
          </div>
          <div className="bg-blue-100 text-blue-500 p-2 rounded-full">
            <FaClipboardList />
          </div>
        </div>

        <div className="flex items-center gap-2 justify-between p-4 border border-gray-300  rounded shadow-sm bg-white">
          <div>
            <h4 className="text-sm text-gray-500">Pending</h4>
            <p className="text-xl font-medium ">0</p>
          </div>
          <div className="bg-blue-100 text-blue-500 p-2 rounded-full">
            <FaExclamationTriangle />
          </div>
        </div>

        <div className="flex gap-2 items-center justify-between p-4 border border-gray-300  rounded shadow-sm bg-white">
          <div>
            <h4 className="text-sm text-gray-500">Confirmed</h4>
            <p className="text-xl font-medium ">0</p>
          </div>
          <div className="bg-blue-100 text-blue-500 p-2 rounded-full">
            <FaClipboardList />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Recent Bookings */}
        <div className="col-span-2 border border-gray-300  rounded p-4 bg-white shadow-sm">
          <h3 className="font-medium text-lg">Recent Bookings</h3>
          <p className="text-sm text-gray-500">Latest customer bookings</p>
          {/* Booking list will go here */}
        </div>

        {/* Monthly Revenue */}
        <div className="border border-gray-300  rounded p-4 bg-white shadow-sm">
          <h3 className="font-medium  text-lg">Monthly Revenue</h3>
          <p className="text-sm text-gray-500 mb-2">Revenue for current month</p>
          <p className="text-3xl font-bold text-blue-600">$0</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
