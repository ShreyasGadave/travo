import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const AddCarForm = () => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    price: "",
    category: "",
    transmission: "",
    fuelType: "",
    fuelCapacity: "",
    seatingCapacity: "",
    location: "",
    description: "",
    mobile: "",
    mileage: "",
    owner: "",
    features: "",
    pickupAddress: "",
    pickupLat: "",
    pickupLng: "",
    registrationNumber: "",
    status: "Available",
    image: null,
  });

  const [tileType, setTileType] = useState("osm"); // 'osm' or 'satellite'
  const [mapCenter, setMapCenter] = useState([
    16.84164618999999, 74.47053526999997,
  ]);

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
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Car listed successfully!");
      console.log(res.data);

      // Reset form
      setFormData({
        brand: "",
        model: "",
        year: "",
        price: "",
        category: "",
        transmission: "",
        fuelType: "",
        fuelCapacity: "",
        seatingCapacity: "",
        location: "",
        description: "",
        mobile: "",
        mileage: "",
        owner: "",
        features: "",
        pickupAddress: "",
        pickupLat: null,
        pickupLng: null,
        registrationNumber: "",
        status: "Available",
        image: "",
      });
    } catch (err) {
      console.error("Error submitting car:", err);
      alert("Error submitting car.");
    }
  };

  const LocationPicker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setFormData((prev) => ({
          ...prev,
          pickupLat: lat,
          pickupLng: lng,
        }));

        axios
          .get(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          )
          .then((res) => {
            setFormData((prev) => ({
              ...prev,
              pickupAddress: res.data.display_name,
            }));
          })
          .catch((err) => {
            console.error("Failed to fetch address", err);
          });
      },
    });

    const lat = Number(formData.pickupLat);
    const lng = Number(formData.pickupLng);

    return lat && lng ? (
      <Marker position={[lat, lng]}>
        <Popup>
          Latitude: {lat.toFixed(5)} <br />
          Longitude: {lng.toFixed(5)} <br />
          {formData.pickupAddress}
        </Popup>
      </Marker>
    ) : null;
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setMapCenter([latitude, longitude]);
        setFormData((prev) => ({
          ...prev,
          pickupLat: latitude,
          pickupLng: longitude,
        }));

        axios
          .get(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          )
          .then((res) => {
            setFormData((prev) => ({
              ...prev,
              pickupAddress: res.data.display_name,
            }));
          });
      },
      (error) => {
        console.warn("Geolocation not allowed:", error.message);
      }
    );
  }, []);

  return (
    <div className="sm:p-10 p-5 max-w-5xl">
      <h1 className="text-3xl font-semibold mb-2">Add New Car</h1>
      <p className="text-gray-600 mb-6">
        Fill in details to list a new car for booking.
      </p>

      <form onSubmit={handleSubmit} className="text-gray-600">
        <div className="mt-4">
          <label htmlFor="image" className="block mb-1 font-medium">
            Upload Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="input w-full  px-4 py-2  text-gray-900  border border-gray-300 rounded-lg bg-white "
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="brand" className="block mb-1 font-medium">
              Brand
            </label>
            <input
              id="brand"
              name="brand"
              placeholder="e.g. BMW"
              value={formData.brand}
              onChange={handleChange}
              className="input px-4 py-2  w-full  border border-gray-300 rounded-lg bg-white"
            />
          </div>
          <div>
            <label htmlFor="model" className="block mb-1 font-medium">
              Model
            </label>
            <input
              id="model"
              name="model"
              placeholder="e.g. X5"
              value={formData.model}
              onChange={handleChange}
              className="input px-4 py-2 w-full  border border-gray-300 rounded-lg bg-white "
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label htmlFor="year" className="block mb-1 font-medium">
              Year
            </label>
            <input
              id="year"
              type="number"
              name="year"
              placeholder="Year"
              value={formData.year}
              onChange={handleChange}
              min="1"
              onKeyDown={(e) => {
                // Block "-", "e", "+", "." and other non-numeric inputs
                if (["e", "E", "+", "-", "."].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              className="input px-4 py-2 w-full  border border-gray-300 rounded-lg bg-white "
            />
          </div>
          <div>
            <label htmlFor="fuelCapacity" className="block mb-1 font-medium">
              Fuel Capacity
            </label>
            <input
              id="fuelCapacity"
              type="number"
              name="fuelCapacity"
              placeholder="Fuel Capacity (L)"
              value={formData.fuelCapacity}
              onChange={handleChange}
              min="1"
              onKeyDown={(e) => {
                // Block "-", "e", "+", "." and other non-numeric inputs
                if (["e", "E", "+", "-", "."].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              className="input px-4 py-2 w-full border border-gray-300 rounded-lg bg-white"
            />
          </div>
          <div>
            <label htmlFor="price" className="block mb-1 font-medium">
              Daily Price (₹)
            </label>
            <input
              id="price"
              type="number"
              name="price"
              placeholder="Daily Price"
              value={formData.price}
              onChange={handleChange}
              min="1"
              onKeyDown={(e) => {
                // Block "-", "e", "+", "." and other non-numeric inputs
                if (["e", "E", "+", "-", "."].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              className="input  px-4 py-2  w-full  border border-gray-300 rounded-lg bg-white "
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label htmlFor="category" className="block mb-1 font-medium">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input px-4 py-2 w-full  border border-gray-300 rounded-lg bg-white "
            >
              <option value="">Select Category</option>
              <option value="SUV"> SUV </option>
              <option value="Sedan"> Sedan </option>
              <option value="Hatchback"> Hatchback </option>
              <option value="Coupe"> Coupe </option>
              <option value="Truck"> Truck </option>
              <option value="Convertible"> Convertible </option>
            </select>
          </div>
          <div>
            <label htmlFor="transmission" className="block mb-1 font-medium">
              Transmission
            </label>
            <select
              id="transmission"
              name="transmission"
              value={formData.transmission}
              onChange={handleChange}
              className="input px-4 py-2 w-full  border border-gray-300 rounded-lg bg-white "
            >
              <option value="">Select Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </select>
          </div>
          <div>
            <label htmlFor="fuelType" className="block mb-1 font-medium">
              Fuel Type
            </label>
            <select
              id="fuelType"
              name="fuelType"
              value={formData.fuelType}
              onChange={handleChange}
              className="input px-4 py-2 w-full  border border-gray-300 rounded-lg bg-white "
            >
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="CNG">CNG</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label htmlFor="seatingCapacity" className="block mb-1 font-medium">
              Seating Capacity
            </label>
            <input
              id="seatingCapacity"
              type="number"
              name="seatingCapacity"
              placeholder="Seating Capacity"
              value={formData.seatingCapacity}
              onChange={handleChange}
              min="1"
              onKeyDown={(e) => {
                // Block "-", "e", "+", "." and other non-numeric inputs
                if (["e", "E", "+", "-", "."].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              className="input px-4 py-2 w-full  border border-gray-300 rounded-lg bg-white "
            />
          </div>
          <div>
            <label htmlFor="location" className="block mb-1 font-medium">
              Location
            </label>
            <input
              id="location"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="input px-4 py-2 w-full  border border-gray-300 rounded-lg bg-white "
            />
          </div>
          <div>
            <label
              htmlFor="registrationNumber"
              className="block mb-1 font-medium"
            >
              Registration Number
            </label>
            <input
              id="registrationNumber"
              name="registrationNumber"
              placeholder="e.g. MH12AB1234"
              value={formData.registrationNumber}
              onChange={handleChange}
              className="input px-4 py-2 w-full  border border-gray-300 rounded-lg bg-white "
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
         <div>
  <label htmlFor="mobile" className="block mb-1 font-medium">
    Mobile
  </label>
  <input
    id="mobile"
    name="mobile"
    placeholder="Mobile"
    value={formData.mobile}
    onChange={(e) => {
      const onlyDigits = e.target.value.replace(/\D/g, ""); // Remove non-digits
      setFormData((prev) => ({
        ...prev,
        mobile: onlyDigits.slice(0, 10), // Limit to 10 digits
      }));
    }}
    onKeyDown={(e) => {
      // Prevent typing of non-numeric characters
      if (["e", "E", "+", "-", ".", " "].includes(e.key)) {
        e.preventDefault();
      }
    }}
    inputMode="numeric" // Show number pad on mobile
    maxLength="10"
    className="input px-4 py-2 w-full border border-gray-300 rounded-lg bg-white"
  />
</div>

          <div>
            <label htmlFor="mileage" className="block mb-1 font-medium">
              Mileage (km)
            </label>
            <input
              id="mileage"
              type="number"
              name="mileage"
              placeholder="Mileage"
              value={formData.mileage}
              onChange={handleChange}
              min="1"
              onKeyDown={(e) => {
                // Block "-", "e", "+", "." and other non-numeric inputs
                if (["e", "E", "+", "-", "."].includes(e.key)) {
                  e.preventDefault();
                }
              }}
              className="input px-4 py-2 w-full  border border-gray-300 rounded-lg bg-white "
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="owner" className="block mb-1 font-medium">
            Owner
          </label>
          <input
            id="owner"
            name="owner"
            placeholder="Anup Kumar"
            value={formData.owner}
            onChange={handleChange}
            className="input px-4 py-2 w-full  border border-gray-300 rounded-lg bg-white "
          />
        </div>

        <div className="mt-4">
          <label htmlFor="features" className="block mb-1 font-medium">
            Features
          </label>
          <input
            id="features"
            name="features"
            placeholder="Comma separated (e.g. AC, ABS, GPS)"
            value={formData.features}
            onChange={handleChange}
            className="input border px-4 py-2 w-full border-gray-300 rounded-lg bg-white "
          />
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Select Pickup Location</h3>

          <div
            className="relative rounded shadow border border-gray-300 overflow-hidden"
            style={{ height: "400px" }}
          >
            {/* Overlayed button in top-right */}
            <div className="absolute top-2 right-2 z-[999]">
              <button
                type="button"
                className="px-4 py-2 text-sm rounded bg-gray-200 hover:bg-gray-300"
                onClick={() =>
                  setTileType((prev) => (prev === "osm" ? "satellite" : "osm"))
                }
              >
                {tileType === "osm" ? "Satellite" : "Street"} View
              </button>
            </div>

            {/* The Map */}
            <MapContainer
              center={mapCenter}
              zoom={13}
              scrollWheelZoom={true}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url={
                  tileType === "satellite"
                    ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                }
                attribution={
                  tileType === "satellite"
                    ? "&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS"
                    : "&copy; OpenStreetMap contributors"
                }
              />
              <LocationPicker />
            </MapContainer>
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="pickupAddress" className="block mb-1 font-medium">
            Pickup Address
          </label>
          <input
            id="pickupAddress"
            name="pickupAddress"
            placeholder="Pickup Address"
            value={formData.pickupAddress}
            onChange={handleChange}
            className="input border px-4 py-2  w-full border-gray-300 rounded-lg bg-white "
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label htmlFor="pickupLat" className="block mb-1 font-medium">
              Pickup Latitude
            </label>
            <input
              id="pickupLat"
              type="number"
              name="pickupLat"
              value={formData.pickupLat ?? ""}
              onChange={handleChange}
              className="input px-4 py-2 w-full  border border-gray-300 rounded-lg bg-white "
            />
          </div>
          <div>
            <label htmlFor="pickupLng" className="block mb-1 font-medium">
              Pickup Longitude
            </label>
            <input
              id="pickupLng"
              type="number"
              name="pickupLng"
              value={formData.pickupLng ?? ""}
              onChange={handleChange}
              className="input  px-4 py-2 w-full  border border-gray-300 rounded-lg bg-white "
            />
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="description" className="block mb-1 font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="e.g. Comfortable and spacious SUV with modern features..."
            value={formData.description}
            onChange={handleChange}
            className="input w-full border px-4 py-2 h-24  border-gray-300 rounded-lg bg-white "
          />
        </div>

        <div className="mt-4">
          <label
            htmlFor="status"
            className="block mb-1 font-medium text-gray-700"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg bg-white px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out"
          >
            <option value="">Select Status</option>
            <option value="Available">Available</option>
            <option value="Booked">Booked</option>
            <option value="Under Maintenance">Under Maintenance</option>
          </select>
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
