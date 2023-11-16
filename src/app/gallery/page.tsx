"use client";

import Background from "@/components/Background";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MainSection from "@/components/MainSection";

const Gallery = () => {
  return (
    <div className=" h-full  bg-cover bg-top overflow-auto">
      <Background />
      <Header />
      <MainSection />
      <Footer />
    </div>
  );
};

export default Gallery;
