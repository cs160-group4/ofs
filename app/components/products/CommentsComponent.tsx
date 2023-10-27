import { getCommentsByProductId } from '@/lib/comments'
import { Product } from '@/lib/products'
import Link from 'next/link'
import { Comments } from '@/lib/comments'
import { getUser } from '@/lib/users'
import Image from 'next/image'
import getURL from "@/utils/utils";
import getAvatarURL from '@/utils/utils'
export default async function CommentsComponent({ comment }: { comment: Comments }) {
    let user = await getUser(comment.userId)
    let image = getAvatarURL(user?.image!);
    return (
        <>
            <div className="p-4 mb-4 border border-gray-200 rounded-md bg-gray-50">
                <div className="md:block lg:flex">
                    <Image className="object-cover w-16 h-16 mr-4 p-2 rounded-full shadow"
                        src={image} width={64} height={64} alt="avatar" />
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



