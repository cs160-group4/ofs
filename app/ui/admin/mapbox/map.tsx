'use client'
import { RobotDelivery } from "@/app/(admin)/admin/delivery/page";
import { distance, ofs_location } from "@/app/lib/utils";
import { FeatureCollection } from "geojson";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from 'next/image';
import { useEffect, useState } from "react";
import Map, { GeolocateControl, Layer, LineLayer, Marker, NavigationControl, Source } from "react-map-gl";

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

type Position = [number, number];
export default function MapBox({ listRobots }: { listRobots: RobotDelivery[] }) {
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const [geojsonList, setGeojsonList] = useState<FeatureCollection[]>([]);
    const [markerPositions, setMarkerPositions] = useState<Position[]>(listRobots.map(() => [ofs_location.longitude, ofs_location.latitude]));
    const [indices, setIndices] = useState<number[]>(listRobots.map(() => 0));
    const [speed, setSpeed] = useState(50);
    const [rspeed, setRspeed] = useState(1000);
    useEffect(() => {
        const updateMarkerPositions = () => {
            setMarkerPositions((prevPositions) =>
                prevPositions.map((prevPos, index) => {
                    const lineStringCoords = listRobots[index].coordinates || [];
                    const robot = listRobots[index];
                    const customers = robot.deliveries
                    if (indices[index] <= lineStringCoords.length - 1) {
                        const nextPos = lineStringCoords[indices[index]];
                        const currentPos = prevPos;
                        customers.map((customer, i) => {
                            const dist = distance({ longitude: nextPos[0], latitude: nextPos[1] }, { longitude: Number(customer.longitude), latitude: Number(customer.latitude) });
                            if (dist < 50) {
                                fetch(`/api/delivery/${customer.orderId}`, {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ robotId: robot.robotId , orderId: customer.orderId })
                                })
                                    .then((response) => response.json())
                                    .then((data) => {
                                    })
                                    .catch((error) => {
                                        console.error('Error:', error);
                                    });
                            }
                        });
                        return lineStringCoords[indices[index]];
                    } else {
                        return prevPos;
                    }
                })
            );
        };

        const updateIndices = () => {
            setIndices((prevIndices) =>
                prevIndices.map((prevIndex, index) => {
                    const lineStringCoords = listRobots[index].coordinates || [];
                    return prevIndex <= lineStringCoords.length - 1 ? prevIndex + 1 : prevIndex;
                })
            );
        };

        const timerId = setInterval(() => {
            updateMarkerPositions();
            updateIndices();
        }, rspeed);

        // Cleanup function
        return () => clearInterval(timerId);
    }, [listRobots, indices, rspeed]);
    useEffect(() => {
        setGeojsonList(
            listRobots.map((robot) => {
                const lineStringCoords = robot.coordinates || [];
                return {
                    type: "FeatureCollection",
                    features: [
                        {
                            type: "Feature",
                            properties: {},
                            geometry: {
                                type: "LineString",
                                coordinates: lineStringCoords
                            }
                        }
                    ]
                };
            })
        );
    }, [listRobots]);

    function setRobotSpeed(newSpeed: number) {
        setSpeed(newSpeed);
        setRspeed(1100 - newSpeed);
    }

    return (
        <>
            <div className="flex">
                <h1 className='text-2xl w-64'>Delivery Status</h1>
                Speed:  <input type="range" min={1} max={4999} value={speed} onChange={(e) =>
                    setRobotSpeed(parseInt(e.target.value))
                } className="range range-primary w-96 ml-4" />
            </div>
            <main className="w-full h-screen">
                <Map
                    mapboxAccessToken={mapboxToken}
                    mapStyle="mapbox://styles/mapbox/streets-v12"
                    style={{ width: "100%", height: "80%" }}
                    initialViewState={{ latitude: ofs_location.latitude, longitude: ofs_location.longitude, zoom: 12 }}
                    maxZoom={20}
                    minZoom={3}
                >
                    {geojsonList.map((geojson, index) => (
                        <Source key={index} id={`my-data-${index}`} type="geojson" data={geojson}>
                            <Layer
                                id={`LineString-${index}`}
                                type="line"
                                paint={{
                                    'line-color': `hsl(${(index * 60) % 360}, 100%, 50%)`,
                                    'line-width': 8,
                                    'line-opacity': 0.8
                                }}
                            />
                        </Source>
                    ))}
                    <GeolocateControl />
                    <NavigationControl />
                    {/* robots */}
                    {listRobots.map((robot, index) => (

                        <Marker key={index} longitude={markerPositions[index][0]!} latitude={markerPositions[index][1]!} anchor="bottom">
                            <Image src="/images/logo.png" width={50} height={50} alt={`robot-${index}`} />
                        </Marker>
                    ))}
                    {/* customers */}
                    {listRobots.map((robot, robotIndex) => (
                        robot.deliveries.map((delivery, deliveryIndex) => (
                            <Marker key={`${robotIndex}-${deliveryIndex}`} longitude={Number(delivery.longitude)} latitude={Number(delivery.latitude)} anchor="bottom">
                                <Image src="/images/avatar.svg" width={35} height={35} alt={`customer-${robotIndex}-${deliveryIndex}`} />
                            </Marker>
                        ))
                    ))}
                </Map>

                {/* {listRobots.map((robot, robotIndex) => (
                    <div key={robotIndex} className="m-4">
                        <h2 className="text-lg font-semibold mb-2">{`Robot ${robotIndex + 1}`}</h2>
                        <ul className="steps steps-vertical">
                            <li className="step step-primary mb-2">Start</li>
                            {robot.deliveredStates?.map((delivered, deliveryIndex) => (
                                <li key={`${robotIndex}-${deliveryIndex}`} className={`step ${delivered ? 'step-primary' : ''} mb-2`}>{`Customer ${deliveryIndex + 1}`}</li>
                            )) || []}
                        </ul>
                    </div>
                ))} */}
            </main>
        </>
    );
}