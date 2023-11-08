import Link from "next/link";


export default function ProductDoesNotExist() {
    return (
        <div className="flex flex-col items-center justify-center">
           <div className="px-40 py-20 bg-gray-50 rounded-md shadow hover:shadow-xl">
                <div className="flex flex-col items-center">
                    <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                        <span className="text-black">Sorry! The Product You Searched <br></br>For Does Not Exist</span>
                    </h6>
                    <Link href="/shop" className="btn btn-accent w-full rounded-md py-1.5 font-medium text-center text-white">
                       Back to Shop
                    </Link>
                </div>
            </div>
        </div>
    )
}