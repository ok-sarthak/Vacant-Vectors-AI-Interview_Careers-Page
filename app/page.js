"use client";
import Header from "./dashboard/_components/Header.jsx";
import Footer from "./dashboard/_components/Footer.jsx";
import Loader from "../components/ui/loader.jsx";
import { useState, useEffect } from "react";
import Hero from "./Hero.jsx";

export default function Home() {

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
  return (
    <div>
      {loading && <Loader />}
      <div className="bg-black">
      <Header/>
      <div>
        <Hero/>
      </div>
      <Footer/>
    </div>
    </div>
    
  );
}
