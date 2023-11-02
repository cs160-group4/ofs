'use client'
import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import myIconUrl from 'public/images/OFSLOGO.png'; // Replace with the actual path to your image



function MapComponent() {
    useEffect(() => {
        // Initialize the map
        if (!document.getElementById('map')._leaflet_id) {

            const map = L.map('map').setView([37.3352, -121.8811], 14);

            // Add a tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);

            const myIcon = L.icon({
                iconUrl: myIconUrl,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [0, -41]
            });

            // Add markers for the start and end points
            const start = L.marker([37.3352, -121.8811], { icon: myIcon }).addTo(map) // test data
            const end = L.marker([37.3197, -121.8683]).addTo(map) // test data

            // Create a route using Leaflet Routing Machine
            L.Routing.control({
                waypoints: [
                    L.latLng(37.3352, -121.8811), // test data
                    L.latLng(37.3197, -121.8683), //test data
                ],
                routeWhileDragging: true,
                draggableWaypoints: false,
            }).addTo(map);
        }
    }, []);

    return <div id="map" style={{ height: '500px', width: '100%' }} />;
}

export default MapComponent;
