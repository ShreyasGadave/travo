import React from "react";
import Navbar from "../Home/Navbar";
import Sidebar from "../Admin/Sidebar";
import AddCarForm from "../Admin/AddCarForm";
import { AdminProvider } from "../Context/AdminContext";

const Admin = () => {
  return (
    <div>
      <Navbar />
      <div className="flex">   <Sidebar />
    <AdminProvider> <AddCarForm /> </AdminProvider>
     </div>
    
    </div>
  );
};

export default Admin;
