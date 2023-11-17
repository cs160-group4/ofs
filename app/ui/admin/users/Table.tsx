import { getAuthSession } from '@/app/api/auth/[...nextauth]/options';
import { getFilteredUsers } from '@/app/lib/users';
import { formatDateToLocal } from '@/app/lib/utils';
import { getAvatarURL } from '@/lib/utils';
import { UpdateUser } from '@/ui/admin/users/Buttons';
import { DeleteConfirmation, DeleteDialog } from '@/ui/admin/users/DeleteDialog';
import Image from 'next/image';

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export default async function UsersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const session = await getAuthSession();
  const currentUser = session?.user;

  const users = await getFilteredUsers(query, currentPage);
  return (
    <>
      <DeleteDialog />
      <div className="mt-6 flow-root">

        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
            <div className="md:hidden">
              {users?.map((user) => (
                <div
                  key={user.id}
                  className="mb-2 w-full rounded-md bg-white p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <Image
                          src={getAvatarURL(user.image)}
                          className="mr-2 rounded-full"
                          width={28}
                          height={28}
                          alt={`${user.name}'s profile picture`}
                        />
                        <p>{user.name}</p>
                      </div>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-500">{user.role}</p>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <div>
                      <p>{formatDateToLocal(user.createdAt!)}</p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <UpdateUser id={user.id} />
                      <DeleteConfirmation id={user.id} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Customer
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Role
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Joined Date
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
                {users?.map((user) => (
                  <tr
                    key={user.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <Image
                          src={getAvatarURL(user.image)}
                          className="rounded-full"
                          width={28}
                          height={28}
                          alt={`${user.name}'s profile picture`}
                        />
                        <p>{user.name}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {user.email}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {user.role}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {formatDateToLocal(user.createdAt!)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {formatDateToLocal(user.updatedAt!)}
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        {currentUser?.id !== user.id && (
                          <>
                            <UpdateUser id={user.id} />
                            <DeleteConfirmation id={user.id} />
                          </>
                        )}
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
