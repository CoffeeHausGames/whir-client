import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as L from "leaflet";
import './Map.css';

const MapComponent = () => {
    const mapRef = useRef(null);
  
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
      }
    }, []); // The empty dependency array ensures that this effect runs only once, similar to componentDidMount
  
    return (
      <div id="map" className="map-container">
        <MapContainer center={[39.1289463, -94.5738178]} zoom={14}>
          <TileLayer 
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={19}
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
        </MapContainer>
      </div>
    );
  };
  
  export default MapComponent;
