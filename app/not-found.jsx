import React from 'react';
import Link from 'next/link';

const Custom404 = () => {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center p-4">
                <h1 className="mb-4 text-6xl font-semibold text-transparent cursor-default bg-clip-text bg-gradient-to-r from-pink-100 via-white-100 to-violet-800">Error</h1>
                <p className="mb-4 text-lg text-gray-600">Oops! Looks like you&apos;re lost.</p>
                <div className="animate-bounce">
                    <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="url(#gradient)">
                        <defs>
                            <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#ffebef" />
                                <stop offset="50%" stopColor="#ffffff" />
                                <stop offset="100%" stopColor="#5b21b6" />
                            </linearGradient>
                        </defs>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"></path>
                    </svg>
                </div>
                <p className="mt-4 text-gray-600">Let&apos;s get you back to</p>
                <Link href="/" legacyBehavior>
                    <a className="inline-block mt-4 px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-pink-100 via-white-100 to-violet-800 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                        Home
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default Custom404;