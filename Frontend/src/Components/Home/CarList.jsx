import React, { useContext, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { CarContext } from "../Context/CarContext.jsx";
import { FaRegEdit } from "react-icons/fa";

const Cars = () => {
  const { cars, loading, fetchCars } = useContext(CarContext);
  const [expandedCarId, setExpandedCarId] = useState(null);
  const [editCarId, setEditCarId] = useState(null);
  const [editData, setEditData] = useState({});

  const toggleExpand = (id) => {
    setExpandedCarId((prevId) => (prevId === id ? null : id));
  };

  const handleEditClick = (car) => {
    setEditCarId(car._id);
    setEditData({
      ...car,
      features: car.features?.join(", ") || "",
      pickupAddress: car.pickupLocation?.address || "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedCar = {
      ...editData,
      features: editData.features.split(",").map((f) => f.trim()),
      pickupLocation: {
        ...editData.pickupLocation,
        address: editData.pickupAddress,
      },
    };

    try {
      const res = await fetch(`http://localhost:5000/api/cars/${editCarId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCar),
      });

      if (res.ok) {
        alert("Car updated successfully");
        setEditCarId(null);
        fetchCars();
      } else {
        alert("Failed to update car");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/cars/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Car deleted successfully");
        fetchCars();
      } else {
        alert("Failed to delete car");
      }
    } catch (err) {
      console.error("Error deleting car:", err);
      alert("Something went wrong");
    }
  };

  if (loading)
    return <p className="text-center text-lg mt-10">Loading cars...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {cars.map((car) => {
        const isExpanded = expandedCarId === car._id;
        const isEditing = editCarId === car._id;

        return (
          <div
            key={car._id}
            className="bg-white h-fit rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            <img
              src={car.images[0]}
              alt={`${car.brand} ${car.model}`}
              className="w-full h-56 object-contain bg-gray-100 p-3"
            />

            <div className="p-4">
              {isEditing ? (
                <form
                  onSubmit={handleUpdate}
                  className="space-y-2 text-sm text-gray-700"
                >
                  <input
                    name="brand"
                    value={editData.brand}
                    onChange={handleChange}
                    className="input"
                    placeholder="Brand"
                  />
                  <input
                    name="model"
                    value={editData.model}
                    onChange={handleChange}
                    className="input"
                    placeholder="Model"
                  />
                  <input
                    name="year"
                    value={editData.year}
                    onChange={handleChange}
                    className="input"
                    placeholder="Year"
                  />
                  <input
                    name="category"
                    value={editData.category}
                    onChange={handleChange}
                    className="input"
                    placeholder="Category"
                  />
                  <input
                    name="transmission"
                    value={editData.transmission}
                    onChange={handleChange}
                    className="input"
                    placeholder="Transmission"
                  />
                  <input
                    name="fuelType"
                    value={editData.fuelType}
                    onChange={handleChange}
                    className="input"
                    placeholder="Fuel Type"
                  />
                  <input
                    name="fuelCapacity"
                    value={editData.fuelCapacity}
                    onChange={handleChange}
                    className="input"
                    placeholder="Fuel Capacity"
                  />
                  <input
                    name="seatingCapacity"
                    value={editData.seatingCapacity}
                    onChange={handleChange}
                    className="input"
                    placeholder="Seating Capacity"
                  />
                  <input
                    name="mileage"
                    value={editData.mileage}
                    onChange={handleChange}
                    className="input"
                    placeholder="Mileage"
                  />
                  <input
                    name="price"
                    value={editData.price}
                    onChange={handleChange}
                    className="input"
                    placeholder="Price"
                  />
                  <input
                    name="status"
                    value={editData.status}
                    onChange={handleChange}
                    className="input"
                    placeholder="Status"
                  />
                  <input
                    name="owner"
                    value={editData.owner}
                    onChange={handleChange}
                    className="input"
                    placeholder="Owner"
                  />
                  <input
                    name="mobile"
                    value={editData.mobile}
                    onChange={handleChange}
                    className="input"
                    placeholder="Mobile"
                  />
                  <input
                    name="registrationNumber"
                    value={editData.registrationNumber}
                    onChange={handleChange}
                    className="input"
                    placeholder="Registration No"
                  />
                  <input
                    name="pickupAddress"
                    value={editData.pickupAddress}
                    onChange={handleChange}
                    className="input"
                    placeholder="Pickup Address"
                  />
                  <input
                    name="features"
                    value={editData.features}
                    onChange={handleChange}
                    className="input"
                    placeholder="Features (comma-separated)"
                  />
                  <input
                    name="rating"
                    value={editData.rating}
                    onChange={handleChange}
                    className="input"
                    placeholder="Rating"
                  />
                  <textarea
                    name="description"
                    value={editData.description}
                    onChange={handleChange}
                    className="input"
                    placeholder="Description"
                  />

                  <div className="flex justify-between mt-2">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditCarId(null)}
                      className="text-red-500"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">
                        {car.brand} {car.model}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        {car.year} • {car.category} • {car.transmission}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        car.status === "Available"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {car.status}
                    </span>
                  </div>

                  <p className="text-lg text-green-600 font-semibold mt-3">
                    ₹{car.price} / day
                  </p>

                  <div className="mt-3 text-sm text-gray-600 space-y-1">
                    <p>
                      <strong>Fuel:</strong> {car.fuelType}
                    </p>
                    <p>
                      <strong>Seats:</strong> {car.seatingCapacity}
                    </p>
                    <p>
                      <strong>Pickup:</strong> {car.pickupLocation?.address}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <button
                      onClick={() => toggleExpand(car._id)}
                      className="text-blue-600 text-sm font-medium hover:underline"
                    >
                      {isExpanded ? "Show Less" : "More Info"}
                    </button>

                    <div className="flex gap-3 text-lg">
                  <button
  onClick={() => handleEditClick(car)}
  className="bg-gray-600 hover:bg-gray-700 p-2 rounded text-white"
>
  <FaRegEdit />
</button>

                      <button
                        onClick={() => handleDelete(car._id)}
                        className=" text-red-600 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="mt-3 text-sm text-gray-700 space-y-1">
                      <p>
                        <strong>Fuel Capacity:</strong> {car.fuelCapacity} L
                      </p>
                      <p>
                        <strong>Mileage:</strong> {car.mileage} km
                      </p>
                      <p>
                        <strong>Owner:</strong> {car.owner}
                      </p>
                      <p>
                        <strong>Mobile:</strong> {car.mobile}
                      </p>
                      <p>
                        <strong>Registration No:</strong>{" "}
                        {car.registrationNumber}
                      </p>
                      <p>
                        <strong>Status:</strong> {car.status}
                      </p>
                      <p>
                        <strong>Rating:</strong> ⭐{" "}
                        {car.rating?.toFixed(1) || 0} / 5
                      </p>
                      <p>
                        <strong>Description:</strong> {car.description}
                      </p>

                      {car.features?.length > 0 && (
                        <div>
                          <strong>Features:</strong>
                          <ul className="list-disc list-inside mt-1">
                            {car.features.map((feature, index) => (
                              <li key={index}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cars;
