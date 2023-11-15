"use client";

import { Tab } from "@headlessui/react";
import Link from "next/link";
import Masonry from "react-masonry-css";
import classNames from "classnames";
import Image from "next/image";

import LightGalleryComponents from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { useRef } from "react";
import { LightGallery } from "lightgallery/lightgallery";

const tabs = [
  {
    key: "all",
    display: "All",
  },
  {
    key: "landscapes",
    display: "Landscapes",
  },
  {
    key: "portraits",
    display: "Portraits",
  },
];

const backgroundImage = [
  "https://images.unsplash.com/photo-1547479082-462b00aadd14?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const images = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1551020689-ad3253b380d1?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "landscape",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1586790180946-e3f03adc6bb9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "landscape",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1520242279429-1f64b18816ef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "landscape",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1548268770-66184a21657e?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "landscape",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1586796105950-b885786d8597?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "landscape",
  },]



const gallery = () => {
  const lightboxRef = useRef<LightGallery | null>(null);

  return (
    <div className=" h-full  bg-cover bg-top overflow-auto">
      <Image
        className="fixed top-0 left-0 z-0 object-cover"
        src="https://images.unsplash.com/photo-1547479082-462b00aadd14?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="background image"
        width={2070}
        height={1080}
        placeholder="blur"
        loading="lazy"
        blurDataURL="data:image/jpeg;base64,..."
      />
      <div className="fixed top-0 left-0 w-full h-full z-10 bg-gradient-to-t from-stone-900 "></div>
      <header className="fixed w-full  top-0 flex items-center justify-between p-10 h-[90px] z-30">
        <span className="uppercase text-xl font-medium">
          Mark's Photography
        </span>
        {/* <div>Pic Fetch</div> */}
        <Link
          href="/"
          className="bg-white p-2 rounded-3xl text-black hover:bg-opacity-90"
        >
          Get in touch
        </Link>
      </header>
      <main className="relative pt-[110px] z-20">
        <div className="flex flex-col h-full items-center">
          <Tab.Group>
            <Tab.List className="flex items-center gap-12">
              {tabs.map((tab) => (
                <Tab key={tab.key} className="p-2">
                  {({ selected }) => (
                    <span
                      className={classNames(
                        "uppercase text-lg",
                        selected ? "text-white" : "text-stone-600"
                      )}
                    >
                      {tab.display}
                    </span>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="h-full my-6 h-100 max-w-[900px] w-full p-2 sm:p-4">
              <Tab.Panel className="overflow-auto">
                {" "}
                <LightGalleryComponents
                  onInit={(ref) => {
                    if (ref) {
                      lightboxRef.current = ref.instance;
                    }
                  }}
                  speed={500}
                  plugins={[lgThumbnail, lgZoom]}
                  dynamic
                  dynamicEl={images.map((image) => ({
                    src: image.url,
                    thumb: image.url,
                  }))}
                />
                <Masonry
                  breakpointCols={2}
                  className="my-masonry-grid flex gap-4"
                  columnClassName="my-masonry-grid_column"
                >
                  {images.map((image, index) => (
                    <Image
                      key={image.id}
                      src={image.url}
                      alt={`photo-${image.id}`}
                      className="my-4 cursor-pointer transition-all transition-filter hover:filter-none duration-300 hover:ring-2 hover:ring-white"
                      width={500}
                      height={300}
                      placeholder="blur"
                      loading="lazy"
                      blurDataURL="data:image/jpeg;base64,..."
                      onClick={() => {
                        lightboxRef.current?.openGallery(index);
                      }}
                    />
                  ))}
                </Masonry>{" "}
              </Tab.Panel>
              <Tab.Panel>Lanscape</Tab.Panel>
              <Tab.Panel>Portraits</Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </main>
      <footer className="relative flex justify-center items-center h-[90px] uppercase text-lg font-medium z-20">
        <p>Bimon</p>
      </footer>
    </div>
  );
};

export default gallery;
