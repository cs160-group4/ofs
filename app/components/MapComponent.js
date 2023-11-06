import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import myIconUrl from 'public/images/OFSLOGO.png';

function MapComponent() {
    const [addresses, setAddresses] = useState([]);
    const mapRef = useRef(null);

    useEffect(() => {
        async function fetchData() {
            const orders = await getOrders();
            const fetchedAddresses = [];

            for (const order of orders) {
                const address = await getAddress(order.addressId);
                fetchedAddresses.push(address);
            }

            setAddresses(fetchedAddresses);
        }

        fetchData();
    }, []);

    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = L.map('map').setView([37.3352, -121.8811], 14);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(mapRef.current);

            const myIcon = L.icon({
                iconUrl: myIconUrl,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [0, -41]
            });

            const start = L.marker([37.3352, -121.8811], { icon: myIcon }).addTo(mapRef.current);

            addresses.forEach(address => {
                const end = L.marker([address.latitude, address.longitude]).addTo(mapRef.current);
                L.Routing.control({
                    waypoints: [
                        L.latLng(37.3352, -121.8811),
                        L.latLng(address.latitude, address.longitude)
                    ],
                    routeWhileDragging: true,
                    draggableWaypoints: false,
                }).addTo(mapRef.current);
            });
        }
    }, [addresses]);

    return <div id="map" style={{ height: '500px', width: '100%' }} />;
}

export default MapComponent;
