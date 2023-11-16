// Map.js
import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import './Map.css';

const MapComponent = ({ selectedBusinessLocation }) => {
  const mapRef = useRef(null);
  const markers = useRef([]);

  useEffect(() => {
    const initializeMap = () => {
      const storedUserLocation = JSON.parse(localStorage.getItem('userLocation')) || {};
      const { latitude, longitude } = storedUserLocation;
      const defaultCoordinates = { latitude: 0, longitude: 0 };

      if (!mapRef.current) {
        const initialLatitude = latitude || defaultCoordinates.latitude;
        const initialLongitude = longitude || defaultCoordinates.longitude;

        mapRef.current = L.map('map').setView([initialLatitude, initialLongitude], 14);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(mapRef.current);
      }
    };

    initializeMap();

    const customBusinessIcon = L.icon({
      iconUrl: '../images/whir_map_poi.png',
      iconSize: [32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    // Clear existing markers
    markers.current.forEach((marker) => marker.remove());

    // Add a new marker if there is a selectedBusinessLocation
    if (selectedBusinessLocation) {
      const businessMarker = L.marker(
        [selectedBusinessLocation.latitude, selectedBusinessLocation.longitude],
        {
          icon: customBusinessIcon,
        }
      ).addTo(mapRef.current);

      markers.current = [businessMarker];

      // Pan and zoom to the selected location
      mapRef.current.flyTo(
        [selectedBusinessLocation.latitude, selectedBusinessLocation.longitude],
        16
      );
    }
  }, [selectedBusinessLocation]);

  return (
    <div id="map" className="map-container">
      <MapContainer>
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {markers.current.map((marker, index) => (
          <Marker key={index} position={marker.getLatLng()} icon={marker.options.icon} />
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
