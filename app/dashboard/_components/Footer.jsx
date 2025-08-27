"use client";
import React, { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const Footer = () => {

  const router = useRouter();

  useEffect(() => {
    const handleScroll = (event) => {
      const target = event.target;
      if (target.tagName === 'BUTTON') {
        const id = target.getAttribute('data-scroll-to');
        if (id) {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    document.addEventListener('click', handleScroll);

    return () => {
      document.removeEventListener('click', handleScroll);
    };
  }, []);

return (
    <footer className="py-5 border-t border-white/15 bg-black w-full flex justify-center items-center  bottom-0">
        <div className="container flex flex-col justify-center items-center">
            <div className="flex flex-col lg:flex-row lg:items-center gap-8 justify-center">
                <div className="flex gap-2 items-center lg:flex-1 justify-center">
                    <Image src='/logo_v.png' alt="Company Logo" width={40} height={40}/>
                    <div className="font-medium text-white">Vacant Vectors</div>
                </div>
                <nav className="flex flex-col items-center lg:flex-row gap-5 lg:gap-7 lg:flex-1 lg:justify-center">
                    <button data-scroll-to="hero" className="text-white/70 hover:text-white text-xs md:text-sm transition" onClick={() => router.replace('/')}>
                        Home
                    </button>
                    <button data-scroll-to="projects" className="text-white/70 hover:text-white text-xs md:text-sm transition" onClick={() => router.replace('/how')}>
                        How it Works?
                    </button>
                    <button data-scroll-to="members" className="text-white/70 hover:text-white text-xs md:text-sm transition" onClick={() => router.replace('/tc')}>
                        Terms & Conditions
                    </button>
                    <button data-scroll-to="members" className="text-white/70 hover:text-white text-xs md:text-sm transition" onClick={() => router.replace('/pp')}>
                        Privacy Policy
                    </button>
                    <button data-scroll-to="members" className="text-white/70 hover:text-white text-xs md:text-sm transition" onClick={() => router.replace('/disclaimer')}>
                        Disclaimer
                    </button>
                    <button 
                        data-scroll-to="contact" 
                        className="text-white/70 hover:text-white text-xs md:text-sm transition"
                        onClick={() => {
                            navigator.clipboard.writeText(window.location.href).then(() => {
                                alert('URL copied to clipboard!! Now you can share it. Thanks for sharing our website!!');
                            }).catch(err => {
                                console.error('Failed to copy: ', err);
                            });
                        }}
                    >
                        Share
                    </button>
                </nav>
            </div>
            <div className="mt-5 text-xs text-white/50 lg:text-center sm:text-justify md:text-center">
                <span className='text-red-500 items-start'>Disclaimer : </span>This website is for general informational and educational purposes only. For now, its a sample & demo website & it&apos;s created for a College Team Project, the content is not official and should not be considered for any kind of professional advice.
            </div>
        </div>
    </footer>
);
};

export default Footer;