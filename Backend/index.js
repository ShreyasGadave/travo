require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ConnectDB = require("./Config/ConnectDB");
const multer = require("multer");
const AddCars = require("./Controller/AddCars");
const ContextRouter = require("./Controller/ContextCar");
const ManageCar = require("./Controller/ ManageCar");
const app = express();
const PORT = process.env.PORT || 3009;
const MONGO_URI = process.env.MONGODB_URI;

app.use(cors());

app.use(express.json());

ConnectDB(MONGO_URI);

app.use(ContextRouter)

app.use(AddCars)

app.use(ManageCar)

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

module.exports = app;
