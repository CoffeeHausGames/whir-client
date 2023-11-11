import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as L from "leaflet";
import './Map.css';

const MapComponent = () => {
  const mapRef = useRef(null);
  const markers = useRef([]);

  useEffect(() => {
    // Initialize the map only if it hasn't been initialized before
    if (!mapRef.current) {
      // Create the map and store the reference
      mapRef.current = L.map('map').setView([39.1289463, -94.5738178], 14);

      // Add a tile layer to the map
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(mapRef.current);

      // Create custom marker icon
      const customIcon = L.icon({
        iconUrl: '../images/whir_map_poi.png',
        iconSize: [32], // size of the icon
        iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -32], // point from which the popup should open relative to the iconAnchor
      });

      // Create draggable marker
      const marker = L.marker([39.1289463, -94.5738178], { draggable: true, icon: customIcon }).addTo(mapRef.current);

      // Store the marker in the ref for future reference or manipulation
      markers.current = [marker];

      // Add event listener for dragging
      marker.on('dragend', () => handleMarkerDrag(marker));
    }
  }, []); // The empty dependency array ensures that this effect runs only once, similar to componentDidMount

  const handleMarkerDrag = (marker) => {
    const position = marker.getLatLng();
    console.log(`Marker dragged to: ${position.lat}, ${position.lng}`);
  };

  return (
    <div id="map" className="map-container">
      <MapContainer center={[39.1289463, -94.5738178]} zoom={14}>
        <TileLayer 
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Render the additional marker */}
        {markers.current.map((marker, index) => (
          <Marker key={index} position={marker.getLatLng()} icon={marker.options.icon} draggable={true} eventHandlers={{ dragend: () => handleMarkerDrag(marker) }} />
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;