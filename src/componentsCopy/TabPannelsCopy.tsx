"use client";

// Import necessary functions and components from Firebase and Next.js
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
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Masonry from "react-masonry-css";

// Image data
// import galleryImages from "./Images";
import { storage } from "@/app/config/firebase";
import { getDownloadURL, list, ref } from "firebase/storage";

interface TabPannelsCopyProps {
  category: string;
  viewOption: string;
}

const TabPannelsCopy: React.FC<TabPannelsCopyProps> = ({
  category,
  viewOption,
}) => {
  const lightboxRef = useRef<LightGallery | null>(null);
  const [fileUpload, setFileUpload] = useState<File | null>(null);
  // const [viewOption, setViewOption] = useState<string>("all");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const fetchAllCategories = async () => {
    try {
      const photoDirectoryRef = ref(storage, "photo");
      const photoItems = await list(photoDirectoryRef);
      const categories = photoItems.prefixes.map((prefix) => prefix.name);
      setAllCategories(categories);
      console.log("All Categories:", categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Function to shuffle an array randomly
  const shuffleArray = (array: any[]) => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  useEffect(() => {
    const fetchUploadedFiles = async () => {
      try {
        // alert("Fetching uploaded files...");

        let urls: string[] = [];

        if (category === "all") {
          try {
            // Fetch files from the root directory
            const rootItems = await list(ref(storage, "photo"));

            const rootUrls = await Promise.all(
              rootItems.items.map(async (item) => {
                const url = await getDownloadURL(item);
                return url;
              })
            );

            // Fetch files from all subfolders
            const subfolderUrls = await Promise.all(
              allCategories.map(async (cat) => {
                const subfolderDirectoryRef = ref(storage, `photo/${cat}`);

                try {
                  const subfolderItems = await list(subfolderDirectoryRef);

                  const subfolderUrls = await Promise.all(
                    subfolderItems.items.map(async (item) => {
                      const url = await getDownloadURL(item);
                      return url;
                    })
                  );

                  return subfolderUrls;
                } catch (error) {
                  console.error("Error fetching subfolder files:", error);
                  return [];
                }
              })
            );

            // Combine root and subfolder files
            urls = [...rootUrls, ...subfolderUrls.flat()];

            // Shuffle the array of URLs randomly
            urls = shuffleArray(urls);
          } catch (error) {
            console.error("Error fetching all files:", error);
          }
        } else if (viewOption === "category" && category) {
          const categoryDirectoryRef = ref(storage, `photo/${category}`);
          const categoryItems = await list(categoryDirectoryRef);
          urls = await Promise.all(
            categoryItems.items.map(async (item) => await getDownloadURL(item))
          );
        }

        setUploadedFiles(urls);
        console.log("Uploaded Files:", urls);
      } catch (error) {
        console.error("Error fetching uploaded files:", error);
      }
    };

    fetchUploadedFiles();
  }, [viewOption, category, allCategories]);

  return (
    <Tab.Panels className="h-full my-6 h-100  h-100 max-w-[900px] w-full p-2 sm:p-4">
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
          lgFullscreen,
          lgHash,
          lgRotate,
          lgShare,
          lgVideo,
        ]}
        dynamic
        dynamicEl={uploadedFiles
          .filter((url) => !url.includes(".keep"))
          .map((url) => ({
            src: url,
            thumb: url,
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
        {uploadedFiles
          .filter((url) => !url.includes(".keep"))
          .map((url, index) => (
            <div className="relative" key={index}>
              <Image
                src={url}
                alt={`uploaded-photo-${index}`}
                className="my-4 "
                width={500}
                height={300}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,..."
                onClick={() => {
                  lightboxRef.current?.openGallery(index);
                }}
              />
            </div>
          ))}
      </Masonry>
    </Tab.Panels>
  );
};

export default TabPannelsCopy;
