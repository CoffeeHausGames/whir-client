// Map.js
import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import './Map.css';

const MapComponent = ({ userLocation, selectedBusinessLocation }) => {
  const storedUserLocation = JSON.parse(localStorage.getItem('userLocation')) || {};
  const mapRef = useRef(null);
  const markers = useRef([]);

  useEffect(() => {
    const { latitude, longitude } = storedUserLocation;

    if (!mapRef.current && latitude && longitude) {
      mapRef.current = L.map('map').setView([latitude, longitude], 14);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(mapRef.current);
    }

    const customIcon = L.icon({
      iconUrl: '../images/whir_map_poi.png',
      iconSize: [32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    const marker = L.marker([longitude, latitude], { draggable: false, icon: customIcon }).addTo(
      mapRef.current
    );

    markers.current = [marker];

    marker.on('dragend', () => handleMarkerDrag(marker));
  }, [storedUserLocation]);

  useEffect(() => {
    markers.current.forEach((marker) => marker.remove());

    const customBusinessIcon = L.icon({
      iconUrl: '../images/whir_map_poi.png',
      iconSize: [32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    if (selectedBusinessLocation) {
      const { latitude, longitude } = selectedBusinessLocation;

      const businessMarker = L.marker([longitude, latitude], {
        icon: customBusinessIcon,
      }).addTo(mapRef.current);

      markers.current.push(businessMarker);
    }
  }, [selectedBusinessLocation]);

  const handleMarkerDrag = (marker) => {
    const position = marker.getLatLng();
    console.log(`Marker dragged to: ${position.lat}, ${position.lng}`);
  };

  return (
    <div id="map" className="map-container">
      <MapContainer>
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {markers.current.map((marker, index) => (
          <Marker
            key={index}
            position={marker.getLatLng()}
            icon={marker.options.icon}
            draggable={true}
            eventHandlers={{ dragend: () => handleMarkerDrag(marker) }}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
