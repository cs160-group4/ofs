import { Delivery, getDeliveryList, getDeliveryPages } from '@/app/lib/delivery';
import { Location, SearchQueryProps, distance, ofs_location } from '@/app/lib/utils';
import ActivateOrderProcessing from '@/app/ui/admin/delivery/ActivateOrderProcessing';
import DeliveryTable from '@/app/ui/admin/delivery/Table';
import MapBox from '@/app/ui/admin/mapbox/map';
import StatusListener from '@/app/ui/common/StatusListener';
import Pagination from '@/ui/common/Pagination';
import Search from '@/ui/common/Search';
import { Metadata } from 'next';

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export const metadata: Metadata = {
  title: 'Delivery | OFS Admin Dashboard',
};

export type RobotDelivery = {
  robotId: number
  deliveries: Delivery[];
  startLocation: Location;
  coordinates?: [number, number][];
  deliveredStates?: boolean[];
};

export default async function OrdersPage({ searchParams }: { searchParams: SearchQueryProps }) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await getDeliveryPages(query);

  const accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const deliveries: Delivery[] = await getDeliveryList();

  let listRobots: RobotDelivery[] = [];

  deliveries.forEach(async (delivery) => {
    const { robotId } = delivery;
    const existRobot = listRobots.find((rd) => rd.robotId === robotId);
    if (existRobot) {
      existRobot.deliveries.push(delivery);
    } else {
      listRobots.push({
        robotId: robotId,
        deliveries: [delivery],
        startLocation: { longitude: ofs_location.longitude, latitude: ofs_location.latitude }
      });
    }
  });

  listRobots.sort((robotA, robotB) => {
    const distanceA = distance(robotA.startLocation, ofs_location);
    const distanceB = distance(robotB.startLocation, ofs_location);
    return distanceA - distanceB;
  });

  await Promise.all(
    listRobots.map(async (robot) => {
      let deliveries = robot.deliveries;
      let coordinates = deliveries
        .map((delivery) => `${delivery.longitude},${delivery.latitude}`)
        .join(';');
      coordinates = `${robot.startLocation.longitude},${robot.startLocation.latitude};${coordinates}`;
      let url =
        "https://api.mapbox.com/directions/v5/mapbox/driving/" +
        coordinates +
        "?banner_instructions=true&geometries=geojson&steps=true&access_token=" +
        accessToken;
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          const routeCoordinates = data.routes[0].geometry.coordinates;
          robot.coordinates = routeCoordinates;
        }
      } catch (error) {
        console.error('Error fetching directions:', error);
      }
    })
  );

  return (
    <>
      <StatusListener name='robot' />
      <div className="w-full">
        <div className="flex w-full items-center justify-between">
          <h1 className='text-2xl'>Delivery</h1>
        </div>
        <ActivateOrderProcessing />
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search by delivery id, robot id, or order id" />
        </div>
        <DeliveryTable query={query} currentPage={currentPage} />
        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
      {listRobots.length > 0 && <MapBox listRobots={listRobots} />}

    </>
  );
}

