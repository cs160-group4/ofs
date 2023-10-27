import React from "react";

type Props = {
    total: number;
};

export function TotalRevenueComponent({ total }: Props) {
    var total = parseFloat((total).toFixed(2));
    return (
        <div className="p-4 bg-white rounded-lg shadow hover:shadow-xl ">
            <div className="flex flex-row items-center">
                <div className="flex-1 text-left md:text-left">
                    <h2 className="mb-2 text-lg font-bold text-gray-600 uppercase dark:text-gray-400">
                        Total Revenue</h2>
                    <p className="mb-2 text-lg font-medium text-gray-600 dark:text-gray-400"> ${total} </p>
                    <p className="text-sm font-medium text-gray-400 dark:text-gray-400">Total revenue of the store
                    </p>
                </div>
                <div className="flex-shrink">
                    <a href="#" className="flex items-center px-8 py-4 text-gray-400 dark:text-gray-400 ">
                        <span className="inline-block mr-3 dark:group-hover:text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="currentColor" className="w-10 h-10 bi bi-cash" viewBox="0 0 16 16">
                                <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                                <path
                                    d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z" />
                            </svg>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    );
}