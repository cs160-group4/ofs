'use client';
import React from "react";

interface Props {
    loading: boolean;
}

export const Loading: React.FC<Props> = ({ loading }) => {
    return (
        <>
            {loading && <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50">
                <div className="w-20 h-20 border-t-4 border-b-4 rounded-full animate-spin"></div>
            </div>}
        </>
    );
}