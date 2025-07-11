import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { CarProvider } from "./Components/Context/CarContext.jsx";
import { ToastContainer } from "react-toastify";
import { AdminProvider } from "./Components/Context/AdminContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdminProvider>
      <CarProvider>
        <App />
        <ToastContainer />
      </CarProvider>
    </AdminProvider>
  </BrowserRouter>
);
