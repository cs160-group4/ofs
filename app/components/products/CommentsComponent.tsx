import { getCommentsByProductId } from '@/lib/comments'
import { Product } from '@/lib/products'
import Link from 'next/link'
import {Comments} from '@/lib/comments'
import { getUser } from '@/lib/users'
export default async function CommentsComponent({ comment }: { comment: Comments }) {
    let user = await getUser(comment.userId)
    return (
        <>
            <div className="p-3 mb-4 border border-gray-200 rounded-md bg-gray-50 lg:p-6 dark:bg-gray-700 dark:border-gray-700">
                <div className="md:block lg:flex">
                    {/* <img className="object-cover w-16 h-16 mr-4 rounded-full shadow"
                                        src="https://i.postimg.cc/rF6G0Dh9/pexels-emmy-e-2381069.jpg" alt="avatar" /> */}
                    <div>
                        <div className="flex flex-wrap items-center justify-between mb-1">
                            <div className="mb-2 md:mb-0">
                                <h2 className="mb-1 text-lg font-semibold text-gray-900 dark:text-gray-400">
                                    {user?.name}
                                </h2>
                                <p className="text-xs text-gray-600 dark:text-gray-400">{comment.updatedAt}</p>
                            </div>
                          
                        </div>
                        <p className="mt-3 text-sm text-gray-700 dark:text-gray-400">
                            {comment.text}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}



