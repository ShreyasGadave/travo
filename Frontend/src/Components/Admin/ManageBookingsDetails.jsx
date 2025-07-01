import React from "react";
import Navbar from "../Home/Navbar";
import Sidebar from "./Sidebar";
import ManageBookings from "./ManageBookings";

const ManageBookingsDetails = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar /> <ManageBookings />
      </div>
    </div>
  );
};

export default ManageBookingsDetails;
