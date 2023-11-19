import EditDeliveryStatusForm from '@/app/ui/admin/orders/EditForm';
import Breadcrumbs from '@/app/ui/common/Breadcrumbs';
import { getOrderById } from '@/lib/orders';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export const metadata: Metadata = {
    title: 'Edit Order | OFS Admin',
    description: 'Edit Order page',
};

export default async function Page({ params }: { params: { id: string } }) {
    try {
        const id = Number(params.id);
        const order = await getOrderById(id)
        if (!order) {
            notFound();
        }
        return (
            <main>
                <Breadcrumbs
                    breadcrumbs={[
                        { label: 'Orders', href: '/admin/orders' },
                        {
                            label: 'Edit Order',
                            href: `/admin/orders/${id}/edit`,
                            active: true,
                        },
                    ]}
                />
               <EditDeliveryStatusForm item={order}/>
            </main>
        );
    } catch (err) {
        notFound();
    }
}
