const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    transmission: { type: String, required: true },
    fuelType: { type: String, required: true },
    seatingCapacity: { type: Number, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },

    // ✅ Change this
    images: {
      type: [String], 
      required: true,
      validate: [(val) => val.length <= 3, "Maximum of 3 images allowed"],
    },
  },
  {
    timestamps: true,
  }
);

const CarModel = mongoose.model("Car", CarSchema);
module.exports = CarModel;
