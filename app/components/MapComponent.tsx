'use client'
import { OrderWithAddress } from '@/lib/orders';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import myIconUrl from 'public/images/OFSLOGO.png';
import avatar from 'public/images/avatar.svg';
export default function MapComponent({ list }: { list: OrderWithAddress[] }) {

    const mapRef: any = useRef(null);

    useEffect(() => {
        if (!mapRef.current) {
            mapRef.current = L.map('map').setView([37.3352, -121.8811], 12);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(mapRef.current);

            const myIcon = L.icon({
                iconUrl: "/images/OFSLOGO.png",
                iconSize: [50, 50],
                iconAnchor: [12, 41],
                popupAnchor: [0, -41]
            });
            const customerIcon = L.icon({
                iconUrl: "/images/avatar.svg",
                iconSize: [50, 50],
                iconAnchor: [12, 41],
                popupAnchor: [0, -41]
            });


            list.forEach(item => {
                const order = item.orders;
                const address = item.addresses;
                let latitude: number = Number(address.latitude);
                let longitude: number = Number(address.longitude);
                const start = L.marker([37.3352, -121.8811], { icon: myIcon }).addTo(mapRef.current);
                L.Routing.control({
                    waypoints: [
                        L.latLng(37.3352, -121.8811),
                        L.latLng(latitude, longitude)
                    ],
                    draggableWaypoints: false,
                    routeWhileDragging: false,
                    show: false,
                    createMarker: function() { return null; }
                }).addTo(mapRef.current);
                const end = L.marker([latitude, longitude], {icon: customerIcon}).addTo(mapRef.current);

            });
           

        }
    }, [list]);

    return (
        <>
            <div id="map"></div>
        </>
    )

}
