"use client";

// Import necessary functions and components from Firebase and Next.js
import React, { ChangeEvent, useEffect, useState } from "react";
import { getDownloadURL, list, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { storage } from "@/config/firebase";

// Define the main component function
export default function Home() {
  // State variables to manage file upload, file URL, photo name, category, view option, and uploaded files
  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [viewOption, setViewOption] = useState<string>("all");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);

  // useEffect hook to fetch categories when the component mounts
  useEffect(() => {
    fetchAllCategories();
  }, []);

  // Function to fetch all categories from the Firebase storage
  const fetchAllCategories = async () => {
    try {
      const photoDirectoryRef = ref(storage, "photo");
      const photoItems = await list(photoDirectoryRef);
      // Extract category names from the prefixes and set them in the state
      const categories = photoItems.prefixes.map((prefix) => prefix.name);
      setAllCategories(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // useEffect hook to fetch uploaded files when the view option or category changes
  useEffect(() => {
    const fetchUploadedFiles = async () => {
      try {
        let urls: string[] = [];

        // If the view option is "category" and a category is selected
        if (viewOption === "category" && category) {
          const categoryDirectoryRef = ref(storage, `photo/${category}`);
          const categoryItems = await list(categoryDirectoryRef);
          // Fetch URLs for files in the selected category
          urls = await Promise.all(
            categoryItems.items.map(async (item) => await getDownloadURL(item))
          );
        } else if (viewOption === "all") {
          // If the view option is "all"

          // Fetch files from the root folder
          const allItems = await list(ref(storage, "photo"));
          const rootUrls = await Promise.all(
            allItems.items.map(async (item) => await getDownloadURL(item))
          );

          // Fetch files from all subfolders
          const subfolderUrls = await Promise.all(
            allCategories.map(async (cat) => {
              const subfolderDirectoryRef = ref(storage, `photo/${cat}`);
              const subfolderItems = await list(subfolderDirectoryRef);
              // Fetch URLs for files in each subfolder
              return Promise.all(
                subfolderItems.items.map(
                  async (item) => await getDownloadURL(item)
                )
              );
            })
          );

          // Concatenate root and subfolder URLs
          urls = [...rootUrls, ...subfolderUrls.flat()];
        }

        // Set the fetched URLs in the state
        setUploadedFiles(urls);
      } catch (error) {
        console.error("Error fetching uploaded files:", error);
      }
    };

    // Trigger the fetchUploadedFiles function when the view option, category, or allCategories changes
    fetchUploadedFiles();
  }, [viewOption, category, allCategories]);

  // Function to handle the change in the selected category
  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;

    // If the user selects "addNewCategory", prompt for a new category
    if (selectedCategory === "addNewCategory") {
      const newCategory = prompt("Enter a new category:");

      if (newCategory) {
        // Check if the new category already exists
        if (allCategories.includes(newCategory)) {
          alert("Category already exists. Please choose a different name.");
        } else {
          // Add the new category to the list and set it as the selected category
          setAllCategories([...allCategories, newCategory]);
          setCategory(newCategory);
        }
      } else {
        // If the user cancels the prompt, reset the category to an empty value
        setCategory("");
      }
    } else {
      // Set the selected category
      setCategory(selectedCategory);
    }
  };

  // Function to handle the change in the selected file
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Set the selected file in the state
      setFileUpload(e.target.files[0]);
    }
  };

  // Function to handle file upload
  const upload = async () => {
    if (fileUpload !== null) {
      // If a file is selected

      if (!category) {
        // If no category is selected, show an alert
        alert("Please select a category");
        return;
      }

      // Reference to the file in the Firebase storage
      const fileRef = ref(storage, `photo/${category}/${fileUpload.name}`);

      try {
        // Upload the file to the storage
        const data = await uploadBytes(fileRef, fileUpload);
        console.log("Upload successful", data);

        // Get the download URL of the uploaded file
        const url = await getDownloadURL(data.ref);
        console.log("File URL", url);

        // Set the file URL in the state and add it to the uploaded files list
        setFileUrl(url);
        setUploadedFiles([...uploadedFiles, url]);
      } catch (error) {
        console.error("Upload error", error);
      }
    } else {
      // If no file is selected, show an alert
      alert("No file selected");
    }
  };

  // JSX to render the component UI
  return (
    <div className="container mx-auto mt-8 p-4 border rounded-md shadow-md">
      <div className="mb-4">
        {/* Input for selecting a file */}
        <input
          type="file"
          onChange={handleFileChange}
          className="border border-gray-300 p-2"
        />
      </div>

      <div className="mb-4">
        {/* Dropdown for selecting a category */}
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Select a category:
        </label>
        <select
          id="category"
          name="category"
          className="border border-gray-300 text-black rounded-md p-2"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="">Select...</option>
          {/* Generate options for existing categories */}
          {allCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
          {/* Option to add a new category */}
          <option value="addNewCategory">Add New Category</option>
        </select>
      </div>

      <div className="mb-4">
        {/* Dropdown for selecting the view option */}
        <label
          htmlFor="viewOption"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          View option:
        </label>
        <select
          id="viewOption"
          name="viewOption"
          className="border border-gray-300 text-black rounded-md p-2"
          value={viewOption}
          onChange={(e) => setViewOption(e.target.value)}
        >
          {/* Options for viewing files by category or all files */}
          <option value="category">By Category</option>
          <option value="all">All Files</option>
        </select>
      </div>

      <div className="mb-4">
        {/* Conditionally render the button only if a file is selected */}
        {fileUpload && (
          <button
            onClick={upload}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Upload
          </button>
        )}
      </div>

      {uploadedFiles.length > 0 && (
        <div className="mt-4">
          {/* Display the list of uploaded files with image previews */}
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
