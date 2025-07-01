import React from "react";
import Navbar from "../Home/Navbar";
import Sidebar from "../Admin/Sidebar";
import AddCarForm from "../Admin/AddCarForm";

const Admin = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">   <Sidebar />
      <AddCarForm /></div>
    
    </div>
  );
};

export default Admin;
