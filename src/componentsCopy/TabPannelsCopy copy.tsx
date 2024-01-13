"use client";

// LightGallery styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-autoplay.css";
// import "lightgallery/css/lg-comment.css";
import "lightgallery/css/lg-fullscreen.css";
// import "lightgallery/css/lg-hash.css";
import "lightgallery/css/lg-pager.css";
import "lightgallery/css/lg-rotate.css";
import "lightgallery/css/lg-share.css";
import "lightgallery/css/lg-video.css";
import "lightgallery/css/lg-medium-zoom.css";

// LightGallery components and plugins
import LightGalleryComponents from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgAutoplay from "lightgallery/plugins/autoplay";
// import lgComment from "lightgallery/plugins/comment";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import lgHash from "lightgallery/plugins/hash";
import lgPager from "lightgallery/plugins/pager";
import lgRotate from "lightgallery/plugins/rotate";
import lgShare from "lightgallery/plugins/share";
import lgVideo from "lightgallery/plugins/video";
// import lgMediumZoom from "lightgallery/plugins/medium-zoom";

import { LightGallery } from "lightgallery/lightgallery";
// Headless UI Tab component
import { Tab } from "@headlessui/react";

// React and Next.js components
import React, { useRef } from "react";
import Image from "next/image";
import Masonry from "react-masonry-css";
import galleryImages from "@/components/Images";

// Image data
// import galleryImages from "./Images";
import { storage } from "@/app/config/firebase";
import { getDownloadURL, list, ref } from "firebase/storage";

const TabPannelsCopyCopy = () => {
  const lightboxRef = useRef<LightGallery | null>(null);
  const categories = ["all", "landscapes", "portraits"]; // Add your categories here
  const imagesByCategory: {
    [key: string]: { id: number; url: string; category: string }[];
  } = {
    all: galleryImages,
    landscapes: galleryImages.filter((image) => image.category === "landscape"),
    portraits: galleryImages.filter((image) => image.category === "portraits"),
  };
   const isNotKeep = (image:any) => !/\.(keep)$/i.test(image.url);

  return (
    <Tab.Panels className="h-full my-6 h-100 max-w-[900px] w-full p-2 sm:p-4">
      {categories.map((category) => (
        <Tab.Panel key={category} className="">
          {" "}
          <LightGalleryComponents
            onInit={(ref) => {
              if (ref) {
                lightboxRef.current = ref.instance;
              }
            }}
            speed={500}
            plugins={[
              lgThumbnail,
              lgZoom,
              lgAutoplay,
              // lgComment,
              lgFullscreen,
              lgHash,
              // lgPager,
              lgRotate,
              lgShare,
              lgVideo,
              // lgMediumZoom,
            ]}
            dynamic
            dynamicEl={imagesByCategory[category]
              .filter(isNotKeep)
              .map((image) => ({
                src: image.url,
                thumb: image.url,
              }))}
          />
          <Masonry
            breakpointCols={{
              default: 3,
              1100: 2,
            }}
            className="my-masonry-grid flex gap-4"
            columnClassName="my-masonry-grid_column"
          >
            {imagesByCategory[category].map((image, index) => (
              <div className="relative" key={image.id}>
                <Image
                  src={image.url}
                  alt={`photo-${image.id}`}
                  className="my-4 "
                  width={500}
                  height={300}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,..."
                  // onClick={() => {
                  //   lightboxRef.current?.openGallery(index);
                  // }}
                />
                <div
                  className="absolute w-full h-full inset-0 bg-transparent hover:bg-stone-900 hover:bg-opacity-10 cursor-pointer"
                  onClick={() => {
                    lightboxRef.current?.openGallery(index);
                  }}
                ></div>
              </div>
            ))}
          </Masonry>{" "}
        </Tab.Panel>
      ))}
    </Tab.Panels>
  );
};

export default TabPannelsCopyCopy;
