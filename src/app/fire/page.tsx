"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { storage } from "../firebase/firebase-config";

// Define the Home component
export default function Home() {
  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [viewOption, setViewOption] = useState<string>("category");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  useEffect(() => {
    // ...
    const fetchUploadedFiles = async () => {
      try {
        let urls: string[] = [];

        if (viewOption === "category" && category) {
          const categoryDirectoryRef = ref(storage, `photo/${category}`);
          const categoryItems = await listAll(categoryDirectoryRef);
          urls = await Promise.all(
            categoryItems.items.map(async (item) => await getDownloadURL(item))
          );
        } else if (viewOption === "all") {
          const allItems = await listAll(ref(storage, "photo"));

          // Fetch files from the "landscape" folder
          const landscapeDirectoryRef = ref(storage, "photo/landscape");
          const landscapeItems = await listAll(landscapeDirectoryRef);
          const landscapeUrls = await Promise.all(
            landscapeItems.items.map(async (item) => await getDownloadURL(item))
          );

          // Fetch files from the "portraits" folder
          const portraitsDirectoryRef = ref(storage, "photo/portraits");
          const portraitsItems = await listAll(portraitsDirectoryRef);
          const portraitsUrls = await Promise.all(
            portraitsItems.items.map(async (item) => await getDownloadURL(item))
          );

          urls = [...landscapeUrls, ...portraitsUrls];

          // Add files from the root folder
          const rootUrls = await Promise.all(
            allItems.items.map(async (item) => await getDownloadURL(item))
          );

          urls = [...urls, ...rootUrls];
        }

        setUploadedFiles(urls);
      } catch (error) {
        console.error("Error fetching uploaded files:", error);
      }
    };
    // ...

    fetchUploadedFiles();
  }, [viewOption, category]); // Triggered when the view option or category changes

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileUpload(e.target.files[0]);
    }
  };

  const upload = async () => {
    if (fileUpload !== null) {
      if (!photoName || !category) {
        alert("Please enter a photo name and select a category");
        return;
      }

      const fileRef = ref(storage, `photo/${category}/${photoName}`);

      try {
        const data = await uploadBytes(fileRef, fileUpload);
        console.log("Upload successful", data);

        const url = await getDownloadURL(data.ref);
        console.log("File URL", url);

        setFileUrl(url);
        setUploadedFiles([...uploadedFiles, url]);
      } catch (error) {
        console.error("Upload error", error);
      }
    } else {
      alert("No file selected");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4 border rounded-md shadow-md">
      {/* Input for file selection */}
      <input
        type="file"
        onChange={handleFileChange}
        className="border border-gray-300 p-2 mb-4"
      />

      {/* Input for entering the photo name */}
      <input
        type="text"
        placeholder="Enter photo name"
        value={photoName}
        className="border border-gray-300 text-black rounded-md p-2 mb-4"
        onChange={(e) => setPhotoName(e.target.value)}
      />

      {/* Input for selecting a category */}
      <label
        htmlFor="category"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        Select a category:
      </label>
      <select
        id="category"
        name="category"
        className="border border-gray-300 text-black rounded-md p-2 mb-4"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select...</option>
        <option value="landscape">Landscape</option>
        <option value="portraits">Portraits</option>
        {/* Add more categories as needed */}
      </select>

      {/* Dropdown for selecting view option */}
      <label
        htmlFor="viewOption"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        View option:
      </label>
      <select
        id="viewOption"
        name="viewOption"
        className="border border-gray-300 text-black rounded-md p-2 mb-4"
        value={viewOption}
        onChange={(e) => setViewOption(e.target.value)}
      >
        <option value="category">By Category</option>
        <option value="all">All Files</option>
      </select>

      {/* Button to trigger the upload function */}
      <button
        onClick={upload}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Upload
      </button>

      {/* Display the image if URL is available */}
      {fileUrl && (
        <div className="mt-4">
          <p className="font-bold">File URL:</p>
          <p>{fileUrl}</p>
          <Image src={fileUrl} alt="Uploaded Image" width={300} height={200} />
        </div>
      )}

      {/* Display all uploaded files */}
      {uploadedFiles.length > 0 && (
        <div className="mt-4">
          <h2 className="font-bold text-lg mb-2">Uploaded Files:</h2>
          <div className="flex flex-wrap">
            {uploadedFiles.map((url, index) => (
              <div key={index} className="mr-4 mb-4">
                <Image
                  src={url}
                  alt={`Uploaded Image ${index}`}
                  width={100}
                  height={100}
                  className="rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
