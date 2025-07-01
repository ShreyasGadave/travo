require("dotenv").config();
const express = require("express");
const cors = require("cors");
const ConnectDB = require("./Config/ConnectDB");
const multer = require("multer");
const UploadCloudinary = require("./Model/CloudinaryStorage");
const app = express();
const PORT = process.env.PORT || 3009;
const MONGO_URI = process.env.MONGODB_URI;

app.use(cors());

app.use(express.json());

ConnectDB(MONGO_URI);

const upload = multer({ dest: "uploads/" });

app.post("/cars", UploadCloudinary.single("image"), async (req, res) => {
  try {
    const {
      brand,
      model,
      year,
      price,
      category,
      transmission,
      fuelType,
      seatingCapacity,
      location,
      description,
    } = req.body;

    // ✅ Check required fields
    if (
      !brand ||
      !model ||
      !year ||
      !price ||
      !category ||
      !transmission ||
      !fuelType ||
      !seatingCapacity ||
      !location ||
      !description ||
      !req.file
    ) {
      return res.status(400).json({
        message: "All fields and a single image are required.",
      });
    }

    // ✅ For single upload: use req.file
    const imageURL = req.file.path;

    const CarModel = require("./Model/Car"); // make sure this is correct path

    const newCar = new CarModel({
      brand,
      model,
      year: Number(year),
      price: Number(price),
      category,
      transmission,
      fuelType,
      seatingCapacity: Number(seatingCapacity),
      location,
      description,
      images: [imageURL], // ✅ still saving as array
    });

    await newCar.save();

    res.status(201).json({
      message: "Car listed successfully!",
      car: newCar,
    });
  } catch (error) {
    console.error("Error creating car:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

module.exports = app;
