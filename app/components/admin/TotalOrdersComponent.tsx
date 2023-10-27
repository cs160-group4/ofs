import React from "react";

type Props = {
    total: number;
};

export function TotalOrdersComponent({ total }: Props) {
    return (
        <div className="p-4 bg-white rounded-lg shadow hover:shadow-xl ">
        <div className="flex flex-row items-center">
            <div className="flex-1 text-left md:text-left">
                <h2 className="mb-2 text-lg font-bold text-gray-600 uppercase dark:text-gray-400">
                    Total orders</h2>
                <p className="mb-2 text-lg font-medium text-gray-600 dark:text-gray-400">{total}</p>
                <p className="text-sm font-medium text-gray-400 dark:text-gray-400"> Orders in total
                </p>
            </div>
            <div className="flex-shrink">
                <a href="#" className="flex items-center px-8 py-4 text-gray-400 dark:text-gray-400 ">
                    <span className="inline-block mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                            fill="currentColor"
                            className="w-10 h-10 dark:group-hover:text-gray-300 bi bi-basket"
                            viewBox="0 0 16 16">
                            <path
                                d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z">
                            </path>
                        </svg>
                    </span>
                </a>
            </div>
        </div>
    </div>
    );
}