"use client";
import { UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/button1.jsx';
import { motion } from 'framer-motion';
import MenuIcon from "../../../public/images/assets/icon-menu.svg";

const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const Header = () => {
  const router = useRouter();
  const path = usePathname();
  useEffect(() => {
    // console.log(path);
  }, [path]);
  const { isLoaded, isSignedIn } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <div className='sticky top-0 z-10'>
      {isLoaded && isSignedIn ? (
        <>
          <header className="py-4 border-b flex justify-center border-white/15 md:border-none">
      <div className="absolute inset-0 backdrop-blur -z-10 md:hidden"></div>
      <div className="container">
        <div className="flex justify-between items-center md:border border-white/15 md:p-2.5 rounded-xl max-w-2xl mx-auto relative">
          <div className="absolute inset-0 backdrop-blur -z-10 hidden md:block"></div>
          <div>
            <div className="border h-12 w-12 rounded-lg inline-flex justify-center items-center border-white/15">
              <Image src='/logo_v.png' alt='logo' width={80} height={80} />
            </div>
          </div>
          <div className="hidden md:block">
            <nav className="flex gap-8 text-white/70 text-sm">
              <button className={`hover:text-violet-500 transition ${path == '/' && 'text-violet-500 font-bold'}`} onClick={() => router.replace('/')}>
                Home
              </button>
              <button className={`hover:text-violet-500 transition ${path == '/dashboard' && 'text-violet-500 font-bold'}`} onClick={() => router.replace('/dashboard')}>
                Dashboard
              </button>
              <button className={`hover:text-violet-500 transition ${path == '/how' && 'text-violet-500 font-bold'}`} onClick={() => router.replace('/how')}>
                How it Works?
              </button>
              <button className={`hover:text-violet-500 transition ${path == '/disclaimer' && 'text-violet-500 font-bold'}`} onClick={() => router.replace('/disclaimer')}>
                Disclaimer
              </button>
            </nav>
          </div>
          <div className="flex gap-4 items-center">
            <UserButton />
            <Image src={MenuIcon} alt="Menu Icon" className="md:hidden cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)} />
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 bg-black bg-opacity-75 z-20 flex flex-col items-center justify-center"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="absolute inset-0 bg-stars bg-cover bg-center z-10"></div>
          <nav className="flex flex-col gap-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-100 via-white-100 to-violet-800 text-lg z-20" onClick={(e) => e.stopPropagation()}>
            <button className={`${path == '/' && 'text-violet-600 font-bold'}`}  onClick={() => { router.replace('/'); setIsMenuOpen(false); }}>
              Home
            </button>
            <button className={`${path == '/dashboard' && 'text-violet-600 font-bold'}`}  onClick={() => { router.replace('/dashboard'); setIsMenuOpen(false); }}>
              Dashboard
            </button>
            <button className={`${path == '/how' && 'text-violet-600 font-bold'}`}  onClick={() => { router.replace('/how'); setIsMenuOpen(false); }}>
              How it Works?
            </button>
            <button className={`${path == '/disclaimer' && 'text-violet-600 font-bold'}`}  onClick={() => { router.replace('/disclaimer'); setIsMenuOpen(false); }}>
              Disclaimer
            </button>
          </nav>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute bottom-10 z-20"
          >
          </motion.div>
        </motion.div>
      )}
      <style jsx global>{`
        body {
          overflow: ${isMenuOpen ? 'hidden' : 'auto'};
        }
      `}</style>
    </header>
        </>
      ) : (
        <>
<header className="py-4 border-b flex justify-center border-white/15 md:border-none">
      <div className="absolute inset-0 backdrop-blur -z-10 md:hidden"></div>
      <div className="container">
        <div className="flex justify-between items-center md:border border-white/15 md:p-2.5 rounded-xl max-w-2xl mx-auto relative">
          <div className="absolute inset-0 backdrop-blur -z-10 hidden md:block"></div>
          <div>
            <div className="border h-12 w-12 rounded-lg inline-flex justify-center items-center border-white/15">
              <Image src='/logo_v.png' alt='logo' width={80} height={80} />
            </div>
          </div>
          <div className="hidden md:block">
            <nav className="flex gap-8 text-white/70 text-sm">
              <button className={`hover:text-violet-500 transition ${path == '/' && 'text-violet-500 font-bold'}`} onClick={() => router.replace('/')}>
                Home
              </button>
              <button className={`hover:text-violet-500 transition ${path == '/dashboard' && 'text-violet-500 font-bold'}`} onClick={() => router.replace('/dashboard')}>
                Dashboard
              </button>
              <button className={`hover:text-violet-500 transition ${path == '/how' && 'text-violet-500 font-bold'}`} onClick={() => router.replace('/how')}>
                How it Works?
              </button>
              <button className={`hover:text-violet-500 transition ${path == '/disclaimer' && 'text-violet-500 font-bold'}`} onClick={() => router.replace('/disclaimer')}>
                Disclaimer
              </button>
            </nav>
          </div>
          <div className="flex gap-4 items-center">
          <div className='flex gap-5'>
          <Button onClick={() => router.replace('/sign-in')}>Sign In</Button>
          <Button onClick={() => router.replace('/sign-up')}>Sign Up</Button>
        </div>
            <Image src={MenuIcon} alt="Menu Icon" className="md:hidden cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)} />
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 bg-black bg-opacity-75 z-20 flex flex-col items-center justify-center"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="absolute inset-0 bg-stars bg-cover bg-center z-10"></div>
          <nav className="flex flex-col gap-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-100 via-white-100 to-violet-800 text-lg z-20" onClick={(e) => e.stopPropagation()}>
            <button className={`${path == '/' && 'text-violet-600 font-bold'}`}  onClick={() => { router.replace('/'); setIsMenuOpen(false); }}>
              Home
            </button>
            <button className={`${path == '/dashboard' && 'text-violet-600 font-bold'}`}  onClick={() => { router.replace('/dashboard'); setIsMenuOpen(false); }}>
              Dashboard
            </button>
            <button className={`${path == '/how' && 'text-violet-600 font-bold'}`}  onClick={() => { router.replace('/how'); setIsMenuOpen(false); }}>
              How it Works?
            </button>
            <button className={`${path == '/disclaimer' && 'text-violet-600 font-bold'}`}  onClick={() => { router.replace('/disclaimer'); setIsMenuOpen(false); }}>
              Disclaimer
            </button>
          </nav>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute bottom-10 z-20"
          >
          </motion.div>
        </motion.div>
      )}
      <style jsx global>{`
        body {
          overflow: ${isMenuOpen ? 'hidden' : 'auto'};
        }
      `}</style>
    </header>
        </>
      )}
    </div>
  );
};

export default Header;