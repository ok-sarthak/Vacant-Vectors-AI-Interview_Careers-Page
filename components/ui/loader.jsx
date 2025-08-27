"use client";
import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
            <motion.div 
                className="relative w-24 h-24"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <div className="absolute inset-0 border-4 border-t-transparent border-solid rounded-full animate-spin" style={{ borderImage: 'linear-gradient(to right, #8a2be2, #ff69b4) 1' }}></div>
                <div className="absolute inset-0 border-4 border-b-transparent border-solid rounded-full animate-spin-reverse" style={{ borderImage: 'linear-gradient(to right, #9400d3, #ff1493) 1' }}></div>
                <div className="absolute inset-0 border-4 border-l-transparent border-solid rounded-full animate-spin-slow" style={{ borderImage: 'linear-gradient(to right, #9932cc, #ff00ff) 1' }}></div>
                <div className="absolute w-2 h-2 bg-white rounded-full top-1/4 left-1/4"></div>
                <div className="absolute w-3 h-3 bg-violet-500 rounded-full top-3/4 left-3/4"></div>
                <div className="absolute w-1 h-1 bg-pink-500 rounded-full top-1/2 left-1/2"></div>
            </motion.div>
        </div>
    );
};

export default Loader;