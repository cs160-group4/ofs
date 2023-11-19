import { DeleteConfirmation, DeleteDialog } from '@/app/ui/admin/comments/DeleteDialog';
import { Comment, getFilteredComments } from '@/lib/comments';
import { Product } from '@/lib/products';
import { User } from '@/lib/users';
import { formatDateToLocal } from '@/lib/utils';

/*
  Author: Hung Pham
  Email: mryo.hp@gmail.com | hung.pham@sjsu.edu
  Copyright (c) 2023 Hung Pham. All rights reserved.
*/

export default async function CommentsTable({ query, currentPage }: {
	query: string;
	currentPage: number;
}) {
	const list = await getFilteredComments(query, currentPage);

	let comments: Comment[] = [];
	let users: User[] = [];
	let products: Product[] = [];
	list.map((item) => {
		comments.push(item.comments);
		users.push(item.user);
		products.push(item.products);
	});

	return (
		<>
			<DeleteDialog />
			<div className="mt-6 flow-root">
				<div className="inline-block min-w-full align-middle">
					<div className="rounded-lg bg-gray-50 p-2 md:pt-0">
						<div className="md:hidden">
							{comments?.map((comment, index) => (
								<div key={comment.id} className="mb-2 w-full rounded-md bg-white p-4">
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
												<p>{comment.text}</p>
											</div>
											{/* <p className="text-sm text-gray-500">{comment.description}</p> */}
										</div>
										{/* Slug */}
										<div className="flex items-center gap-2">
											{/* <p className="text-sm text-gray-500">{comment.slug}</p> */}
										</div>
									</div>
									<div className="flex w-full items-center justify-between pt-4">
										<div>
											<p className="text-xl font-medium">
											</p>
											<p>{formatDateToLocal(comment.updatedAt as string)}</p>
										</div>
										<div className="flex justify-end gap-2">
											{/* <UpdateCategory id={category.id} />
                    <DeleteCategory id={category.id} /> */}
										</div>
									</div>
								</div>
							))}
						</div>
						<table className="hidden min-w-full text-gray-900 md:table">
							<thead className="rounded-lg text-left text-sm font-normal">
								<tr>
									<th scope="col" className="px-4 py-5 font-medium sm:pl-6">
										Comment
									</th>
									<th scope="col" className="px-3 py-5 font-medium">
										User - Email
									</th>
									<th scope="col" className="px-3 py-5 font-medium">
										ID, Product Name
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
								{comments?.map((comment, index) => (
									<tr
										key={comment.id}
										className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
									>
										<td className="whitespace-nowrap py-3 pl-6 pr-3">
											<div className="flex items-center gap-3">
												<p>{comment.text}</p>
											</div>
										</td>
										<td className="whitespace-nowrap px-3 py-3">
											{users[index].name} - {users[index].email}
										</td>
										<td className="whitespace-nowrap px-3 py-3">
											{products[index].id}, {products[index].name}
										</td>
										<td className="whitespace-nowrap px-3 py-3">
											{formatDateToLocal(comment.createdAt as string)}
										</td>
										<td className="whitespace-nowrap px-3 py-3">
											{formatDateToLocal(comment.updatedAt as string)}
										</td>
										<td className="whitespace-nowrap py-3 pl-6 pr-3">
											<div className="flex justify-end gap-3">
												<DeleteConfirmation id={comment.id} />
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
