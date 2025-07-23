import { Navigate } from "react-router-dom";
import { useAdmin } from "../Context/AdminContext";

const PrivateRoute = ({ children }) => {
  const { admin } = useAdmin();
  return admin?.adminId ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
