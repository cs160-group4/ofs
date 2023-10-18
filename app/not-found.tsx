import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function FourOhFour() {
    return (
        <main className="flex items-center justify-center">
            <div className="px-40 py-20 bg-white rounded-md shadow-xl">
                <div className="flex flex-col items-center">
                    <h1 className="font-bold text-9xl">404</h1>
                    <h6 className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                        <span className="text-red-500">Oops!</span> Page not found
                    </h6>
                    <p className="mb-8 text-center text-gray-500 md:text-lg">
                        The page you’re looking for doesn’t exist.
                    </p>
                    <button type="button" className="btn btn-accent w-full rounded-md py-1.5 font-medium">
                        <Link href="/">Go Back</Link>
                    </button>
                    {/* <button type="button" onClick={() => router.back()} className="btn btn-accent w-full rounded-md mt-3 py-1.5 font-medium">
                        Go Back
                    </button> */}
                </div>
            </div>
        </main>
    )
}
