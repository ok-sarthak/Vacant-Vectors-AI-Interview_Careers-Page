"use client";
import React, { useState, useEffect } from 'react';
import Loader from './loader';

const Button = (props) => {
  const [clicked, setClicked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handlePageLoad = () => {
      setLoading(false);
    };

    if (document.readyState === 'complete') {
      handlePageLoad();
    } else {
      window.addEventListener('load', handlePageLoad);
      return () => window.removeEventListener('load', handlePageLoad);
    }
  }, []);

  const handleClick = () => {
    setClicked(true);
    setLoading(true);
    setTimeout(() => {
      setClicked(false);
      setLoading(false);
      if (props.onClick) {
        props.onClick();
      }
    }, 1000);
  };

  return (
    <button
      onClick={handleClick}
      className={`relative py-2 px-3 rounded-lg text-white font-medium text-sm bg-gradient-to-b from-[#190d2e] to-[#4a208a] shadow-[0px_0px_12px_#8c45ff] hover:from-[#4a208a] hover:to-[#190d2e] ${
        clicked ? 'animate-ping' : ''
      }`}
    >
      <div className='absolute inset-0'>
        <div className='rounded-lg border border-white/20 absolute inset-0 [mask-image:linear-gradient(to-bottom,black,transparent)]'></div>
        <div className='rounded-lg border absolute inset-0 border-white/40 [mask-image:linear-gradient(to-top,black,transparent)]'></div>
        <div className='absolute inset-0 shadow-[0px_0px_10px_rgb(140,69,255,.7)_inset rounded-lg]'></div>
      </div>
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <span>{props.children}</span>
      )}
    </button>
  );
};

export default Button;