import { Comment } from "@/app/lib/comments";
import CommentComponent from '@/app/ui/comments/Comment'

export default function Comments({ comments }: { comments: Comment[] }) {
    return (
        <>
            {comments.length > 0 && (
                <>
                    <div className="mt-10">
                        <h2 className="mb-6 text-2xl font-black text-left dark:text-gray-400">
                            Comments</h2>
                        <div className="max-w-5xl px-2">
                            {comments.map((comment) => (
                                <CommentComponent key={comment.id} comment={comment} />
                            ))}
                        </div>
                    </div>

                </>
            )}

        </>

    )
}