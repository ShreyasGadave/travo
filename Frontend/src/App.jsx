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
import DetailCar from ".//Components/Home/ DetailCar";
import Navbar from "./Components/Home/Navbar";
import Profile from "./Components/Admin/Profile";
import PrivateRoute from "./Components/Home/PrivateRoute";

const App = () => {
  const [showLogin, setshowLogin] = useState(false);

  return (
    <div>
      <Navbar setshowLogin={setshowLogin} />
      {showLogin && <Login setshowLogin={setshowLogin} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/admin" element={      <PrivateRoute> <Dashboard /></PrivateRoute>  } />
        <Route path="/admin/add-car" element={   <PrivateRoute>  <AddCar /> </PrivateRoute> } />
        <Route path="/admin/manages-cars" element={<PrivateRoute><ManagesCarsDetails /> </PrivateRoute> } />
        <Route
          path="/admin/manage-bookings"
          element={  <PrivateRoute> <ManageBookingsDetails />  </PrivateRoute> }
        />
        <Route path="/admin/cars-list" element={ <PrivateRoute> <CarsList />  </PrivateRoute> } />
        <Route path="/car/:id" element={<DetailCar />} />
        <Route path="/all-cars" element={<AllCars />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
