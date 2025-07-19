import React, { useContext, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CarContext } from "../Context/CarContext.jsx";
import { MdModeEdit } from "react-icons/md";
import { AdminContext } from "../Context/AdminContext.jsx";

const Cars = () => {
  const { admin, cars, fetchCars, loading } = useContext(AdminContext);
  const [expandedCarId, setExpandedCarId] = useState(null);
  const [editCarId, setEditCarId] = useState(null);
  const [editData, setEditData] = useState({});
  const [statusEditId, setStatusEditId] = useState(null);
  const [statusValue, setStatusValue] = useState("");

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
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/car/${editCarId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCar),
        }
      );

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
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/car/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Car deleted successfully");
        fetchCars();
      } else {
        alert("Failed to delete car");
      }
    } catch (err) {
      console.error("Error deleting car:", err.message, err);

      alert("Something went wrong");
    }
  };

  const handleStatusSave = async (id) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/cars/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: statusValue }),
        }
      );

      if (res.ok) {
        alert("Status updated");
        setStatusEditId(null);
        fetchCars();
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Something went wrong");
    }
  };

  if (loading)
    return <p className="text-center text-lg mt-10">Loading cars...</p>;

  return (
    <div className="p-4 sm:p-10">
      <div className="">
        <h2 className="text-3xl font-semibold mb-2">All Cars</h2>
        <p className="text-gray-500 mb-6">
          View all listed cars, update their details, or remove them from the
          booking platform.
        </p>
      </div>
      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map((car) => {
          const isExpanded = expandedCarId === car._id;
          const isEditing = editCarId === car._id;

          return (
            <div
              key={car._id}
              className="group bg-white h-fit rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            >
              <div className=" relative">
                <img
                  src={car.images[0]}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full rounded-2xl shadow-md hover:shadow-xl  h-56 object-contain bg-gray-100 p-3"
                />

                <div className="  absolute bottom-2 right-2 flex justify-between gap-3 text-lg">
                  <div className="">
                    <button
                      onClick={() => handleEditClick(car)}
                      className="text-gray-500 mr-3 hover:text-gray-600"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(car._id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <MdOutlineDeleteOutline size={20} />
                    </button>{" "}
                  </div>
                </div>
              </div>

              <div className="p-4">
                {isEditing ? (
                  <form
                    onSubmit={handleUpdate}
                    className="space-y-3 text-sm text-gray-700"
                  >
                    {[
                      { label: "Brand", name: "brand" },
                      { label: "Model", name: "model" },
                      { label: "Year", name: "year" },
                      { label: "Category", name: "category" },
                      { label: "Transmission", name: "transmission" },
                      { label: "Fuel Type", name: "fuelType" },
                      { label: "Fuel Capacity (L)", name: "fuelCapacity" },
                      { label: "Seating Capacity", name: "seatingCapacity" },
                      { label: "Mileage (km)", name: "mileage" },
                      { label: "Price (₹/day)", name: "price" },
                      { label: "Owner", name: "owner" },
                      { label: "Mobile", name: "mobile" },
                      { label: "Registration No", name: "registrationNumber" },
                      { label: "Pickup Address", name: "pickupAddress" },
                      { label: "Features (comma-separated)", name: "features" },
                      { label: "Rating", name: "rating" },
                    ].map((field) => (
                      <div key={field.name}>
                        <label
                          className="block  text-gray-600 mb-1"
                          htmlFor={field.name}
                        >
                          {field.label}
                        </label>
                        <input
                          id={field.name}
                          name={field.name}
                          value={editData[field.name] || ""}
                          onChange={handleChange}
                          className="w-full border border-gray-300 px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder={field.label}
                        />
                      </div>
                    ))}

                    <div>
                      <label
                        className="block text-gray-600 mb-1"
                        htmlFor="status"
                      >
                        Status
                      </label>
                      <select
                        id="status"
                        name="status"
                        value={editData.status}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select status</option>
                        <option value="Available">Available</option>
                        <option value="Unavailable">Unavailable</option>
                        <option value="Booked">Booked</option>
                      </select>
                    </div>

                    <div>
                      <label
                        className="block text-gray-600 mb-1"
                        htmlFor="description"
                      >
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={editData.description}
                        onChange={handleChange}
                        className="w-full border border-gray-300 px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Description"
                        rows={3}
                      />
                    </div>

                    <div className="flex justify-between pt-2">
                      <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditCarId(null)}
                        className="text-red-500 hover:underline"
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
                            ? "bg-green-100 text-green-700 shadow"
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
                        <strong className="font-semibold">Fuel:</strong>{" "}
                        {car.fuelType}
                      </p>
                      <p>
                        <strong className="font-semibold">Seats:</strong>{" "}
                        {car.seatingCapacity}
                      </p>
                      <p>
                        <strong className="font-semibold">Pickup:</strong>{" "}
                        {car.pickupLocation?.address}
                      </p>
                    </div>

                    <button
                      onClick={() => toggleExpand(car._id)}
                      className="text-blue-600 mt-3 text-sm font-medium hover:underline"
                    >
                      {isExpanded ? "Show Less" : "More Info"}
                    </button>

                    {isExpanded && (
                      <div className="mt-3 text-sm text-gray-700 space-y-1">
                        <p>
                          <strong className="font-semibold">
                            {" "}
                            Fuel Capacity:
                          </strong>{" "}
                          {car.fuelCapacity} L
                        </p>
                        <p>
                          <strong className="font-semibold">Mileage:</strong>{" "}
                          {car.mileage} km
                        </p>
                        <p>
                          <strong className="font-semibold">Owner:</strong>{" "}
                          {car.owner}
                        </p>
                        <p>
                          <strong className="font-semibold">Mobile:</strong>{" "}
                          {car.mobile}
                        </p>
                        <p>
                          <strong className="font-semibold">
                            Registration No:
                          </strong>{" "}
                          {car.registrationNumber}
                        </p>

                        <div className="flex gap-2 items-center">
                          <strong className="font-semibold">Status:</strong>
                          {statusEditId === car._id ? (
                            <>
                              <select
                                value={statusValue}
                                onChange={(e) => setStatusValue(e.target.value)}
                                className="border px-2 py-1 rounded"
                              >
                                <option value="Available">Available</option>
                                <option value="Unavailable">Unavailable</option>
                                <option value="Booked">Booked</option>
                              </select>
                              <button
                                onClick={() => handleStatusSave(car._id)}
                                className="text-green-600 text-sm hover:underline"
                              >
                                Save
                              </button>
                            </>
                          ) : (
                            <span
                              className="text-blue-600 cursor-pointer hover:underline"
                              onClick={() => {
                                setStatusEditId(car._id);
                                setStatusValue(car.status);
                              }}
                            >
                              {car.status}
                            </span>
                          )}
                        </div>

                        <p>
                          <strong className="font-semibold">Rating:</strong> ⭐{" "}
                          {car.rating?.toFixed(1) || 0} / 5
                        </p>
                        <p>
                          <strong className="font-semibold">
                            Description:
                          </strong>{" "}
                          {car.description}
                        </p>

                        {car.features?.length > 0 && (
                          <div>
                            <strong className="font-semibold">Features:</strong>
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
    </div>
  );
};

export default Cars;
