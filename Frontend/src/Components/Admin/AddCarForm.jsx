import React, { useState } from "react";
import axios from "axios";

const AddCarForm = () => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    price: "",
    category: "",
    transmission: "",
    fuelType: "",
    seatingCapacity: "",
    location: "",
    description: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      const res = await axios.post("http://localhost:4002/cars", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Car listed successfully!");
      console.log(res.data);

      // Optional: reset form
      setFormData({
        brand: "",
        model: "",
        year: "",
        price: "",
        category: "",
        transmission: "",
        fuelType: "",
        seatingCapacity: "",
        location: "",
        description: "",
        image: null,
      });
    } catch (err) {
      console.error("Error submitting car:", err);
      alert("Error submitting car.");
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Add New Car</h1>
      <p className="text-gray-600 mb-6">
        Fill in details to list a new car for booking, including pricing, availability, and car specifications.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Upload */}
        <div className="flex items-center gap-4">
          <label className="w-28 h-20 flex flex-col items-center justify-center bg-gray-100 border rounded cursor-pointer text-sm text-gray-500 hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Upload
            <input type="file" name="image" className="hidden" onChange={handleChange} />
          </label>
          <span className="text-gray-500">Upload a picture of your car</span>
        </div>

        {/* Brand & Model */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="e.g. BMW, Mercedes, Audi..."
            className="input border px-4 py-2 rounded"
          />
          <input
            name="model"
            value={formData.model}
            onChange={handleChange}
            placeholder="e.g. X5, E-Class, M4..."
            className="input border px-4 py-2 rounded"
          />
        </div>

        {/* Year, Price, Category */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="Year"
            className="input border px-4 py-2 rounded"
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Daily Price ($)"
            className="input border px-4 py-2 rounded"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="input border px-4 py-2 rounded"
          >
            <option value="">Select a category</option>
            <option value="SUV">SUV</option>
            <option value="Sedan">Sedan</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Coupe">Coupe</option>
          </select>
        </div>

        {/* Transmission, Fuel Type, Seating */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            name="transmission"
            value={formData.transmission}
            onChange={handleChange}
            className="input border px-4 py-2 rounded"
          >
            <option value="">Select a transmission</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
          <select
            name="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
            className="input border px-4 py-2 rounded"
          >
            <option value="">Select a fuel type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>
          <input
            type="number"
            name="seatingCapacity"
            value={formData.seatingCapacity}
            onChange={handleChange}
            placeholder="Seating Capacity"
            className="input border px-4 py-2 rounded"
          />
        </div>

        {/* Location */}
        <select
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="input w-full border px-4 py-2 rounded"
        >
          <option value="">Select a location</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
          <option value="Kolhapur">Kolhapur</option>
          <option value="Bangalore">Bangalore</option>
        </select>

        {/* Description */}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="e.g. A luxurious SUV with a spacious interior and a powerful engine."
          className="input w-full border px-4 py-2 rounded h-24"
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded"
        >
          ✓ List Your Car
        </button>
      </form>
    </div>
  );
};

export default AddCarForm;
