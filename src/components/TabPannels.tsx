"use client";

// LightGallery styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// LightGallery components and plugins
import LightGalleryComponents from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgAutoplay from "lightgallery/plugins/autoplay";
import { LightGallery } from "lightgallery/lightgallery";

// Headless UI Tab component
import { Tab } from "@headlessui/react";

// React and Next.js components
import React, { useRef } from "react";
import Image from "next/image";
import Masonry from "react-masonry-css";

// Image data
import galleryImages from "./Images";

const TabPannels = () => {
  const lightboxRef = useRef<LightGallery | null>(null);
  const portraits = galleryImages.filter(
    (image) => image.category === "portraits"
  );
  const landscapes = galleryImages.filter(
    (image) => image.category === "landscape"
  );
  return (
    <Tab.Panels className="h-full my-6 h-100 max-w-[900px] w-full p-2 sm:p-4">
      <Tab.Panel className="">
        {" "}
        <LightGalleryComponents
          onInit={(ref) => {
            if (ref) {
              lightboxRef.current = ref.instance;
            }
          }}
          speed={500}
          plugins={[lgThumbnail, lgZoom, lgAutoplay]}
          dynamic
          dynamicEl={galleryImages.map((image) => ({
            src: image.url,
            thumb: image.url,
          }))}
        />
        <Masonry
          breakpointCols={2}
          className="my-masonry-grid flex gap-4"
          columnClassName="my-masonry-grid_column"
        >
          {galleryImages.map((image, index) => (
            <div className="relative">
              <Image
                key={image.id}
                src={image.url}
                alt={`photo-${image.id}`}
                className="my-4 "
                width={500}
                height={300}
                placeholder="blur"
                // loading="lazy"
                blurDataURL="data:image/jpeg;base64,..."
                onClick={() => {
                  lightboxRef.current?.openGallery(index);
                }}
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
      <Tab.Panel>
        <LightGalleryComponents
          onInit={(ref) => {
            if (ref) {
              lightboxRef.current = ref.instance;
            }
          }}
          speed={500}
          plugins={[lgThumbnail, lgZoom]}
          dynamic
          dynamicEl={landscapes.map((image) => ({
            src: image.url,
            thumb: image.url,
          }))}
        />
        <Masonry
          breakpointCols={2}
          className="my-masonry-grid flex gap-4"
          columnClassName="my-masonry-grid_column"
        >
          {landscapes.map((image, index) => (
            <div className="relative">
              <Image
                key={image.id}
                src={image.url}
                alt={`photo-${image.id}`}
                className="my-4 "
                width={500}
                height={300}
                placeholder="blur"
                // loading="lazy"
                blurDataURL="data:image/jpeg;base64,..."
                onClick={() => {
                  lightboxRef.current?.openGallery(index);
                }}
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
      <Tab.Panel>
        <LightGalleryComponents
          onInit={(ref) => {
            if (ref) {
              lightboxRef.current = ref.instance;
            }
          }}
          speed={500}
          plugins={[lgThumbnail, lgZoom]}
          dynamic
          dynamicEl={portraits.map((image) => ({
            src: image.url,
            thumb: image.url,
          }))}
        />
        <Masonry
          breakpointCols={2}
          className="my-masonry-grid flex gap-4"
          columnClassName="my-masonry-grid_column"
        >
          {portraits.map((image, index) => (
            <div className="relative">
              <Image
                key={image.id}
                src={image.url}
                alt={`photo-${image.id}`}
                className="my-4 "
                width={500}
                height={300}
                placeholder="blur"
                // loading="lazy"
                blurDataURL="data:image/jpeg;base64,..."
                onClick={() => {
                  lightboxRef.current?.openGallery(index);
                }}
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
    </Tab.Panels>
  );
};

export default TabPannels;
