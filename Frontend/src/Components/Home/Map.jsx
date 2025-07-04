import React, { useState, useContext, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { MdOutlineLayers } from "react-icons/md";
import { CarContext } from "../Context/CarContext.jsx";

const ClickableMap = () => {
  const { cars, loading } = useContext(CarContext);

  // 🧭 Always provide fallback values
  const initialLat = cars[0]?.pickupLocation?.lat || 16.8327;
  const initialLng = cars[0]?.pickupLocation?.lng || 74.41727;

  // ✅ useState always called unconditionally
  const [position, setPosition] = useState([initialLat, initialLng]);
  const [address, setAddress] = useState("");
  const [mapType, setMapType] = useState("carto");

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      setAddress(response.data.display_name);
    } catch (error) {
      console.error("Failed to fetch address:", error);
      setAddress("Unable to fetch address");
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        fetchAddress(lat, lng);
      },
    });

    return (
      <Marker position={position}>
        <Popup>
          {address && (
            <p>
              <strong>Address:</strong>
              <br />
              {address}
            </p>
          )}
        </Popup>
      </Marker>
    );
  };

  const tileOptions = {
    osm: {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: "&copy; OpenStreetMap contributors",
    },
    carto: {
      url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      attribution: "&copy; OpenStreetMap & CARTO",
    },
    satellite: {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution: "Tiles &copy; Esri, Earthstar Geographics",
    },
  };

  const cycleMap = () => {
    const types = ["osm", "carto", "satellite"];
    const nextIndex = (types.indexOf(mapType) + 1) % types.length;
    setMapType(types[nextIndex]);
  };

  // ✅ Loading state handled before rendering hooks
  if (loading) {
    return <p className="p-4">Loading map...</p>;
  }

  return (
    <div className="">
     <div className="flex flex-col items-center text-center mb-6">
  <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
    Explore Available Cars Near You
  </h2>
  <p className="text-gray-500 text-md max-w-xs sm:max-w-lg">
    Click on the map to choose a location or view available car listings.
  </p>
</div>

      <div className="p-4 relative">
        <button
          onClick={cycleMap}
          className="absolute z-[999] top-7 right-7 bg-white shadow-md p-1 rounded-full"
        >
          <MdOutlineLayers size={25} />
        </button>
        <MapContainer
          center={position}
          zoom={6}
          scrollWheelZoom={false}
          zoomControl={false}
          className="h-80 md:h-[30rem] rounded-2xl shadow-lg border border-gray-200"
        >
          <TileLayer
            detectRetina
            url={tileOptions[mapType].url}
            attribution={tileOptions[mapType].attribution}
          />

          {/* <LocationMarker /> */}

          {cars.map((car) => (
            <Marker
              key={car._id}
              position={[car.pickupLocation.lat, car.pickupLocation.lng]}
            >
              <Popup>
                <strong>
                  {car.brand} {car.model}
                </strong>
                <br />
                {car.pickupLocation.address}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      
    </div>
  );
};

export default ClickableMap;
