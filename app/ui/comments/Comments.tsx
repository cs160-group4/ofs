import { Comments } from "@/app/lib/comments";
import Comment from '@/app/ui/comments/Comment'

export default function Comments({ comments }: { comments: Comments[] }) {
    return (
        <>
            {comments.length > 0 && (
                <>
                    <div className="mt-10">
                        <h2 className="mb-6 text-2xl font-black text-left dark:text-gray-400">
                            Comments</h2>
                        <div className="max-w-5xl px-2">
                            {comments.map((comment) => (
                                <Comment key={comment.id} comment={comment} />
                            ))}
                        </div>
                    </div>

                </>
            )}

        </>

    )
}