import { Addresses } from '@/app/lib/addresses';
import { Order, getFilteredOrders } from '@/app/lib/orders';
import { User } from '@/app/lib/users';
import { formatDateToLocal } from '@/app/lib/utils';
import { UpdateOrder } from '@/app/ui/admin/orders/Buttons';
// import { UpdateCategory } from '@/ui/admin/categories/Buttons';
// import { DeleteCategoryConfirmation, DeleteCategoryDialog } from '@/ui/admin/categories/DeleteDialog';

export default async function OrdersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const list = await getFilteredOrders(query, currentPage);

  let orders: Order[] = [];
  let users: User[] = [];
  let addresses: Addresses[] = [];
  list.map((item) => {
    orders.push(item.orders);
    users.push(item.user);
    addresses.push(item.addresses);
  });
  return (
    <>
      {/* <DeleteCategoryDialog /> */}
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {orders?.map((order, index) => (
                <div key={order.id} className="mb-2 w-full rounded-md bg-white p-4">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        {/* <Image
                        src={category.image)}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${user.name}'s profile picture`}
                      /> */}
                        <p>{order.id}</p>
                      </div>
                      <p className="text-sm text-gray-500">{order.deliveryStatus}</p>
                    </div>
                    {/* Slug */}
                    <div className="flex items-center gap-2">
                      {/* <UserStatus status={user.status} /> */}
                      <p className="text-sm text-gray-500">{users[index].name}</p>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <div>
                      <p className="text-xl font-medium">
                      </p>
                      <p>{formatDateToLocal(order.updatedAt as string)}</p>
                    </div>
                    <div className="flex justify-end gap-2">
                      {/* <UpdateCategory id={category.id} />
                      <DeleteCategoryConfirmation id={category.id} /> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    ID
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Total
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Status
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    User - Email
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Created At
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Updated At
                  </th>
                  <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {orders?.map((order, index) => (
                  <tr
                    key={order.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <p>{order.id}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      ${order.grandTotal}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {order.deliveryStatus}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {users[index].name} - {users[index].email}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {formatDateToLocal(order.createdAt as string)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {formatDateToLocal(order.updatedAt as string)}
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        <UpdateOrder id={order.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
