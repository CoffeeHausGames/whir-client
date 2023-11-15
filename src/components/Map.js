// Map.js
import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import './Map.css';

const MapComponent = ({ userLocation, selectedBusinessLocation }) => {
  const storedUserLocation = JSON.parse(localStorage.getItem('userLocation')) || {};
  const mapRef = useRef(null);
  const markers = useRef([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);


  const initializeMap = (latitude, longitude) => {
    if (!mapRef.current) {
      mapRef.current = L.map('map').setView([latitude, longitude], 14);
   
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(mapRef.current);
    }
   };
   
   // First useEffect hook
   useEffect(() => {
    const { latitude, longitude } = storedUserLocation;
   
    if (latitude && longitude) {
      initializeMap(latitude, longitude);
   
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
    }
   }, [storedUserLocation]);
   
   // Second useEffect hook
   useEffect(() => {
    markers.current.forEach((marker) => marker.remove());
   
    const customBusinessIcon = L.icon({
      iconUrl: '../images/whir_map_poi.png',
      iconSize: [32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
   
    if (selectedBusiness) {
      const { latitude, longitude } = selectedBusiness;
   
      initializeMap(latitude, longitude);
   
      const businessMarker = L.marker([longitude, latitude], {
        icon: customBusinessIcon,
      }).addTo(mapRef.current);
   
      markers.current.push(businessMarker);
    }
   }, [selectedBusiness]);

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
