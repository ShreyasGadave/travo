import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./Components/Page/Home";
import Login from "./Components/Page/Login";
import Dashboard from "./Components/Admin/Dashboard";
import AddCar from "./Components/Admin/AddCar";
import ManagesCarsDetails from "./Components/Admin/ManagesCarsDetails";
import ManageBookingsDetails from "./Components/Admin/ManageBookingsDetails";
import CarsList from "./Components/Admin/CarsList";
import AllCars from "./Components/Home/AllCars";
import DetailCar from "./Components/Home/ DetailCar";
import Navbar from "./Components/Home/Navbar";

const App = () => {
  const [showLogin, setshowLogin] = useState(false);
  
  return (
    <div>
      {showLogin && <Login setshowLogin={setshowLogin} />}
      <Navbar setshowLogin={setshowLogin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/add-car" element={<AddCar />} />
        <Route path="/admin/manages-cars" element={<ManagesCarsDetails />} />
        <Route
          path="/admin/manage-bookings"
          element={<ManageBookingsDetails />}
        />
        <Route path="/admin/cars-list" element={<CarsList />} />
        <Route path="/car/:id" element={<DetailCar />} />
        <Route path="/all-cars" element={<AllCars />} />
      </Routes>
    </div>
  );
};

export default App;
