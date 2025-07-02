import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { CarProvider } from "./Components/Context/CarContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <CarProvider>
      <App />
    </CarProvider>
  </BrowserRouter>
);
