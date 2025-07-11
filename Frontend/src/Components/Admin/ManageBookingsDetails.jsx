import React from "react";
import Navbar from "../Home/Navbar";
import Sidebar from "./Sidebar";
import ManageBookings from "./ManageBookings";
import Map from "../Home/Map";
import ClickableMap from "../Home/Map";

const ManageBookingsDetails = () => {
  return (
    <div>
      <div className="flex">
        <Sidebar /> <ManageBookings />
      </div>
    </div>
  );
};

export default ManageBookingsDetails;
