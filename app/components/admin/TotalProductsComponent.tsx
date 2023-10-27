import React from "react";

type Props = {
    total: number;
};

export function TotalProductsComponent({ total }: Props) {
    return (
        <div className="p-4 bg-white rounded-lg shadow hover:shadow-xl ">
            <div className="flex flex-row items-center">
                <div className="flex-1 text-left md:text-left">
                    <h2 className="mb-2 text-lg font-bold text-gray-600 uppercase dark:text-gray-400">
                        Products</h2>
                    <p className="mb-2 text-lg font-medium text-gray-600 dark:text-gray-400"> {total} </p>
                    <p className="text-sm font-medium text-gray-400 dark:text-gray-400">The number of products in the store
                    </p>
                </div>
                <div className="flex-shrink">
                    <a href="#" className="flex items-center px-8 py-4 text-gray-400 dark:text-gray-400 ">
                        <span className="inline-block mr-3 dark:group-hover:text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                className="w-10 h-10 bi bi-bag" fill="currentColor"
                                viewBox="0 0 16 16">
                                <path
                                    d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                            </svg>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    );
}