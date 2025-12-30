"use client";
import { useEffect, useState } from "react";
import Header from '../components/Header'
import EmailSubscription from '../components/EmailSubscription'
import HeroBanner from '../components/Banner'
import Banner from '../components/Banner'
import Footer from "../components/Footer";
import Recipes from "../components/Recipes"
import FestivalSection from "@/components/Festival";
import GiftingPage from "@/components/Gifting";

function Home() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      const scrollY = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setWidth((scrollY / height) * 100);
    };

    window.addEventListener("scroll", updateWidth);
    return () => window.removeEventListener("scroll", updateWidth);
  }, []);
  return (

  
 <div className="min-h-screen bg-background">
      {/* Top Red Bar */}
      <div className="h-1.5 bg-[#CD9951]" />
      
      <div className='sticky top-0 z-50'>

     
      <Header />
      
       </div>
      <Banner/>
      <Recipes/>
      <GiftingPage/>
      <FestivalSection/>
      <EmailSubscription/>
     <Footer/>
      
      
      
      {/* <TaglineSection /> */}
      
      
      {/* <IndiasFavourites /> */}
      
     
      {/* <FestiveBanner /> */}
    
      {/* <MobileAppSection /> */}
    
      {/* <CategoryCarousel /> */}
      
      
      {/* <RecipesSection /> */}

      {/* <Footer /> */}
      
    
    </div>

  )
}

export default Home