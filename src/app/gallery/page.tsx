"use client";

import Background from "@/components/Background";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MainSection from "@/components/MainSection";
import Navbar from "@/components/Navbar";
import MainSectionCopy from "@/componentsCopy/MainSectionCopy";

const GalleryCopy = () => {
  return (
    <div className=" h-full  bg-cover bg-top overflow-auto">
      <Navbar />
      <Background />
      {/* <Header /> */}
      {/* <MainSection /> */}
      <MainSectionCopy/>
      <Footer />
    </div>
  );
};

export default GalleryCopy;
