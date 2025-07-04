import React, { useState, useContext, useEffect } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { MdOutlineLayers } from "react-icons/md";
import { CarContext } from '../Context/CarContext.jsx';

const ClickableMap = () => {
  const { cars, loading } = useContext(CarContext);

  // Log all car data to debug
  useEffect(() => {
    console.log("🚗 All Car Data from CarContext:", cars);
  }, [cars]);

  // Show loading state or empty fallback
  if (loading) {
    return <p className="p-4 text-gray-600">Loading cars on map...</p>;
  }

  if (!cars || cars.length === 0) {
    return <p className="p-4 text-gray-600">No cars available</p>;
  }

  // Default center from the first car or Kolhapur
  const defaultPosition = [
    cars[0]?.pickupLocation?.lat || 16.8327,
    cars[0]?.pickupLocation?.lng || 74.41727,
  ];

  const [position, setPosition] = useState(defaultPosition);
  const [address, setAddress] = useState('');
  const [mapType, setMapType] = useState('carto');

  const fetchAddress = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
      );
      setAddress(response.data.display_name);
    } catch (error) {
      console.error('Failed to fetch address:', error);
      setAddress('Unable to fetch address');
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
          <div>
            {address && (
              <p className="mt-2">
                <strong>Address:</strong><br /> {address}
              </p>
            )}
          </div>
        </Popup>
      </Marker>
    );
  };

  const tileOptions = {
    osm: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; OpenStreetMap contributors',
    },
    carto: {
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      attribution: '&copy; OpenStreetMap & CARTO',
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri, Earthstar Geographics',
    },
  };

  const cycleMap = () => {
    const types = ['osm', 'carto', 'satellite'];
    const nextIndex = (types.indexOf(mapType) + 1) % types.length;
    setMapType(types[nextIndex]);
  };

  return (
    <div className="relative">
      {/* Map Style Toggle Button */}
      <button
        onClick={cycleMap}
        className="absolute z-[999] top-7 right-7 bg-white p-2 rounded-full shadow"
      >
        <MdOutlineLayers size={30} />
      </button>

      {/* Map */}
      <div className="p-4">
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={true}
          zoomControl={false}
          className="h-80 md:h-[30rem] rounded shadow-lg border border-gray-200"
        >
          <TileLayer
            detectRetina
            url={tileOptions[mapType].url}
            attribution={tileOptions[mapType].attribution}
          />

          {/* Marker from user click */}
          <LocationMarker />

          {/* Markers for cars from context */}
          {cars.map((car) => (
            <Marker
              key={car._id}
              position={[
                car.pickupLocation.lat,
                car.pickupLocation.lng
              ]}
            >
              <Popup>
                <strong>{car.brand} {car.model}</strong><br />
                ₹{car.price}/day<br />
                {car.pickupLocation.address}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Selected Address Display */}
      {address && (
        <p className="mt-4 text-sm text-gray-800">
          <strong>Selected Address:</strong> {address}
        </p>
      )}
    </div>
  );
};

export default ClickableMap;
