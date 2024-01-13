"use client";

import Background from "@/components/Background";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MainSection from "@/components/MainSection";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { useEffect } from "react";

const Gallery = () => {
  const getImages = async () => {
    const response = await axios.get("/api/pic?id=2&num=20");
    console.log(response.data);
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <div className=" h-full  bg-cover bg-top overflow-auto">
      <Navbar />
      <Background />
      {/* <Header /> */}
      <MainSection />
      <Footer />
    </div>
  );
};

export default Gallery;
