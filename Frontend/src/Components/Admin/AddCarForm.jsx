import React, { useState } from "react";
import axios from "axios";
import { IoIosAddCircleOutline } from "react-icons/io";

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
    <div className="sm:p-10 p-5 max-w-5xl">
      <h1 className="text-3xl font-semibold mb-2">Add New Car</h1>
      <p className="text-gray-600 mb-6">
        Fill in details to list a new car for booking, including pricing,
        availability, and car specifications.
      </p>

      <form onSubmit={handleSubmit} className=" text-gray-600">
        <div className="mt-4">
          <label htmlFor="image" className="block mb-1 font-normal">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="input w-full border px-4 py-2 rounded bg-white text-gray-900"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="brand" className="block mb-1 font-normal">
              Brand
            </label>
            <input
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="e.g. BMW, Mercedes, Audi..."
              className="input border px-4 py-2 rounded w-full"
            />
          </div>
          <div>
            <label htmlFor="model" className="block mb-1 font-normal">
              Model
            </label>
            <input
              id="model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              placeholder="e.g. X5, E-Class, M4..."
              className="input border px-4 py-2 rounded w-full"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label htmlFor="year" className="block mb-1 font-normal">
              Year
            </label>
            <input
              id="year"
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="Year"
              className="input border px-4 py-2 rounded w-full placeholder-gray-400"
            />
          </div>
          <div>
            <label htmlFor="price" className="block mb-1 font-normal">
              Daily Price ($)
            </label>
            <input
              id="price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Daily Price ($)"
              className="input border px-4 py-2 rounded w-full placeholder-gray-400"
            />
          </div>
          <div>
            <label htmlFor="category" className="block mb-1 font-normal">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`input border px-4 py-2 rounded w-full 
      ${formData.category === "" ? "text-gray-400" : "text-gray-900"}`}
            >
              <option value="" disabled hidden>
                Select a category
              </option>
              <option value="SUV">SUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Coupe">Coupe</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label htmlFor="transmission" className="block mb-1 font-normal">
              Transmission
            </label>
            <select
              id="transmission"
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
              className={`input border px-4 py-2 rounded w-full ${
                formData.transmission === "" ? "text-gray-400" : "text-gray-900"
              }`}
            >
              <option value="" disabled hidden>
                Select a transmission
              </option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>

          <div>
            <label htmlFor="fuelType" className="block mb-1 font-normal">
              Fuel Type
            </label>
            <select
              id="fuelType"
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
              className={`input border px-4 py-2 rounded w-full ${
                formData.fuelType === "" ? "text-gray-400" : "text-gray-900"
              }`}
            >
              <option value="" disabled hidden>
                Select a fuel type
              </option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
            </select>
          </div>

          <div>
            <label htmlFor="seatingCapacity" className="block mb-1 font-normal">
              Seating Capacity
            </label>
            <input
              id="seatingCapacity"
              type="number"
              name="seatingCapacity"
              value={formData.seatingCapacity}
              onChange={handleChange}
              placeholder="Seating Capacity"
              className="input border px-4 py-2 rounded w-full placeholder-gray-400"
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="location" className="block mb-1 font-normal">
            Location
          </label>
          <select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className={`input w-full border px-4 py-2 rounded ${
              formData.location === "" ? "text-gray-400" : "text-gray-900"
            }`}
          >
            <option value="" disabled hidden>
              Select a location
            </option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Kolhapur">Kolhapur</option>
            <option value="Bangalore">Bangalore</option>
          </select>
        </div>

        <div className="mt-4">
          <label htmlFor="description" className="block mb-1 font-normal">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="e.g. A luxurious SUV with a spacious interior and a powerful engine."
            className="input w-full border px-4 py-2 rounded h-24"
          />
        </div>

        <button
          type="submit"
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded"
        >
          List Your Car
        </button>
      </form>
    </div>
  );
};

export default AddCarForm;
