import { Route, Routes } from "react-router-dom";
import Home from "./Components/Page/Home";
import Login from "./Components/Page/Login";
import Admin from "./Components/Page/Admin";
import Dashboard from "./Components/Admin/Dashboard";
import AddCar from "./Components/Admin/AddCar";
import ManagesCarsDetails from "./Components/Admin/ManagesCarsDetails";
import ManageBookingsDetails from "./Components/Admin/ManageBookingsDetails";

const App = () => {
  return (
    <div>
     <Routes>
 <Route path="/" element={<Home/>} />
  <Route path="/login" element={<Login/>} />
   <Route path="/admin" element={<Dashboard/>}/>
     <Route path="/admin/add-car" element={<AddCar/>}/>
     <Route path="/admin/manages-cars" element={<ManagesCarsDetails/>}/>
     <Route path="/admin/manage-bookings" element={<ManageBookingsDetails/>}/>
     </Routes>
    </div>
  )
}

export default App
