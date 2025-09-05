require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ConnectDB = require("./Config/ConnectDB");
const multer = require("multer");
const AddCars = require("./Controller/AddCars");
const ContextRouter = require("./Controller/ContextCar");
const ManageCar = require("./Controller/ManageCar");
const BookingRouter = require("./Controller/Booking");
const { default: Booking } = require("./Model/Booking");
const AdminCarRouter = require("./Controller/AdminCar");
const ProfileData = require("./Controller/AdminProfile");
const UserBookingRouter = require("./Controller/UserBooking");
const AdminBookingRouter = require("./Controller/AdminBooking");
const app = express();
const PORT = process.env.PORT || 4002;
const MONGO_URI = process.env.MONGODB_URI;

app.use(cors());

app.use(express.json());

ConnectDB(MONGO_URI);

app.use(ContextRouter);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use(AdminCarRouter)

app.use(AddCars);

app.use(ManageCar);

app.use(BookingRouter);

app.use(ProfileData)

app.use(UserBookingRouter)

app.use(AdminBookingRouter)

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

module.exports = app;
