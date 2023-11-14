import Image from 'next/image';
import { formatDateToLocal } from '@/app/lib/utils';
import { getFilteredCategories } from '@/app/lib/categories';
import { UpdateCategory, DeleteCategory } from '@/ui/admin/categories/Buttons';

export default async function CategoriesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const categories = await getFilteredCategories(query, currentPage);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {categories?.map((category) => (
              <div key={category.id} className="mb-2 w-full rounded-md bg-white p-4">
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
                      <p>{category.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{category.description}</p>
                  </div>
                  {/* Slug */}
                  <div className="flex items-center gap-2">
                    {/* <UserStatus status={user.status} /> */}
                    <p className="text-sm text-gray-500">{category.slug}</p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                    </p>
                    <p>{formatDateToLocal(category.updatedAt as string)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateCategory id={category.id} />
                    <DeleteCategory id={category.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Category Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Slug
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Description
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
              {categories?.map((category) => (
                <tr
                  key={category.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      {/* <Image
                        src={getAvatarURL(user.image)}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${user.name}'s profile picture`}
                      /> */}
                      <p>{category.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {category.slug}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {category.description}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(category.createdAt as string)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(category.updatedAt as string)}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateCategory id={category.id} />
                      <DeleteCategory id={category.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
