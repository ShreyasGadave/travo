import React, { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const ClickableMap = () => {
  const [position, setPosition] = useState([20.5937, 78.9629]); // Center of India
  const [address, setAddress] = useState('');
  const [mapType, setMapType] = useState('osm'); // 'osm', 'carto', 'satellite'

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
            <p>
              <strong>Latitude:</strong> {position[0].toFixed(5)} <br />
              <strong>Longitude:</strong> {position[1].toFixed(5)}
            </p>
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
      name: 'OpenStreetMap',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; OpenStreetMap contributors',
    },
    carto: {
      name: 'Carto Voyager',
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      attribution: '&copy; OpenStreetMap & CARTO',
    },
    satellite: {
      name: 'Esri Satellite',
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
      {/* Toggle Map Type */}
      <button
        onClick={cycleMap}
        className="absolute z-[999] top-4 left-4 bg-white shadow px-4 py-2 rounded text-sm font-medium"
      >
        Switch to {tileOptions[(mapType === 'satellite' ? 'osm' : mapType === 'osm' ? 'carto' : 'satellite')].name}
      </button>

      {/* Map */}
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '500px', width: '100%' }}
      >
        <TileLayer
          detectRetina
          url={tileOptions[mapType].url}
          attribution={tileOptions[mapType].attribution}
        />
        <LocationMarker />
      </MapContainer>

      {/* Display Address */}
      {address && (
        <p className="mt-4 text-sm text-gray-800">
          <strong>Selected Address:</strong> {address}
        </p>
      )}
    </div>
  );
};

export default ClickableMap;
