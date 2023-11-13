'use client'

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import {getOrdersWithAddressesByUserId} from "@/lib/orders";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN as string;

interface MapComponentProps {
    startPoint: [37.3352, -121.8811]; // Start point [lng, lat]
    endPoint: [37.3346, -122.0090];   // End point [lng, lat]
}

const MapComponent: React.FC<MapComponentProps> = ({ startPoint, endPoint }) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const [mapLoaded, setMapLoaded] = useState(false);

    useEffect(() => {
        if (mapContainerRef.current) {
            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: startPoint,
                zoom: 12.5,
            });

            map.on('load', () => {
                setMapLoaded(true);
            });

            mapRef.current = map;

            return () => map.remove();
        }
    }, [startPoint]);

    useEffect(() => {
        if (mapLoaded) {
            const routeId = 'route';
            if (mapRef.current?.getLayer(routeId)) {
                mapRef.current.removeLayer(routeId);
                mapRef.current.removeSource(routeId);
            }

            mapRef.current?.addSource(routeId, {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: [startPoint, endPoint],
                    },
                },
            });

            mapRef.current?.addLayer({
                id: routeId,
                type: 'line',
                source: routeId,
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round',
                },
                paint: {
                    'line-color': '#888',
                    'line-width': 8,
                },
            });
        }
    }, [startPoint, endPoint, mapLoaded]);

    return <div ref={mapContainerRef} style={{ width: '100%', height: '400px' }} />;
};

export default MapComponent;
