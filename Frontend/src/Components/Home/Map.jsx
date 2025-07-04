import React, { useState, useContext, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MdOutlineLayers } from "react-icons/md";
import { CarContext } from "../Context/CarContext.jsx";
import { GoZoomIn } from "react-icons/go";
import { GoZoomOut } from "react-icons/go";
import '../../utils/leafletFix.js'

// 🎯 Zoom Controller that updates zoom dynamically
const ZoomController = ({ zoom }) => {
  const map = useMap();

  useEffect(() => {
    map.setZoom(zoom);
  }, [zoom, map]);

  return null;
};

const ClickableMap = () => {
  const { cars, loading } = useContext(CarContext);

  const [mapType, setMapType] = useState("carto");
  const [zoom, setZoom] = useState(6);

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

  if (loading || !cars.length) {
    return <p className="p-4 text-center">Loading map...</p>;
  }

  const defaultCenter = [
    cars[0]?.pickupLocation?.lat || 16.8327,
    cars[0]?.pickupLocation?.lng || 74.41727,
  ];

  return (
    <div>
      {/* Title Section */}
      <div className="flex flex-col items-center text-center mb-6">
        <h2 className="text-2xl lg:text-4xl font-bold mb-2">
          Explore Available Cars Near You
        </h2>
        <p className="text-gray-500 text-md max-w-xs sm:max-w-lg">
          Click on the map to choose a location or view available car listings.
        </p>
      </div>

      <div className="p-4 relative">
        {/* Map Type Switcher */}

        <button
          onClick={cycleMap}
          className="absolute z-[999] bg-black/20 backdrop-blur-md top-7 right-7  shadow-md p-2 rounded-full"
        >
          <MdOutlineLayers size={20} />
        </button>

        <div className="absolute bg-black/20  right-7  top-20 z-[999] backdrop-blur-md p-2 rounded-2xl shadow-md flex flex-col items-center gap-2">
          <button
            onClick={() => setZoom((prev) => Math.min(prev + 1, 18))}
            className=" text-black hover:scale-110 transition-transform duration-200"
          >
            <GoZoomIn size={18} />
          </button>

          <input
            type="range"
            min="3"
            max="25"
            step="1"
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-1 h-36 rotate-0 appearance bg-black rounded-full outline-none transition-all"
            style={{
              accentColor: "#3b82f6",
              writingMode: "vertical-lr",
              direction: "rtl",
            }}
          />

          <button
            onClick={() => setZoom((prev) => Math.max(prev - 1, 3))}
            className="  text-black  hover:scale-110 transition-transform duration-200"
          >
            <GoZoomOut size={18} />
          </button>
        </div>
        {/* Map */}
        <MapContainer
          center={defaultCenter}
          zoom={zoom}
          scrollWheelZoom={false}
          zoomControl={false}
          className="h-100 md:h-[30rem] rounded-2xl shadow-lg border border-gray-200"
        >
          <TileLayer
            detectRetina
            url={tileOptions[mapType].url}
            attribution={tileOptions[mapType].attribution}
          />

          <ZoomController zoom={zoom} />

          {cars.map((car) => (
            <Marker
              key={car._id}
              position={[car.pickupLocation.lat, car.pickupLocation.lng]}
            >
              <Popup>
                <strong>
                  {car.brand} {car.model}
                </strong>
                <br />₹{car.price}/day
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
