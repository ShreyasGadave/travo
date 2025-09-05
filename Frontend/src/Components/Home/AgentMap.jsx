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

const AgentMap = ({location_lat,location_lng}) => {
    console.log(location_lat);
      console.log(location_lng);
  const { cars, loading } = useContext(CarContext);

  const [mapType, setMapType] = useState("satellite");
  const [zoom, setZoom] = useState(16);

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
    location_lat,
    location_lng,
  ];

  return (
    <div>

      <div className=" relative">
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
          className="h-100 md:h-[30rem] rounded-lg"
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
              position={[location_lat, location_lng]}
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

export default AgentMap;
