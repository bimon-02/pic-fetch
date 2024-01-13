"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  UploadTask,
  getDownloadURL,
  list,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "@/app/config/firebase";
import { Toaster, toast } from "sonner";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, FormHelperText, TextField } from "@mui/material";
import Image from "next/image";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type UploadPageProps = {};

const UploadPage: React.FC<UploadPageProps> = () => {
  const [category, setCategory] = useState<string>("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFileNames, setUploadedFileNames] = useState<string[]>([]);
  const [uploadTasks, setUploadTasks] = useState<Record<number, UploadTask>>(
    {}
  );
  const [uploadProgress, setUploadProgress] = useState<Record<number, number>>(
    {}
  );
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);
  const [password, setPassword] = useState("");
  const[owner, setOwner] = useState("");
  const [allOwners, setAllOwners] = useState<string[]>([]);

  useEffect(() => {
    fetchAllOwners();
  },[])
  
  

  const fetchAllOwners = async () => {
     try {
       const photoDirectoryRef = ref(storage, "photo");
       const photoItems = await list(photoDirectoryRef);
       const owners = photoItems.prefixes.map((prefix) => prefix.name);
       setAllOwners(owners);
     } catch (error) {
       console.error("Error fetching owners:", error);
     }
  }

useEffect(() => {
  const fetchAllCategories = async () => {
    try {
      if (owner) {
        const ownerDirectoryRef = ref(storage, `photo/${owner}`);
        const ownerItems = await list(ownerDirectoryRef);
        const categories = ownerItems.prefixes.map((prefix) => prefix.name);
        setAllCategories(categories);
      } else {
        setAllCategories([]); // If no owner selected, clear the categories
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  fetchAllCategories();
}, [owner]);




  useEffect(() => {
    const fetchUploadedFiles = async () => {
      try {
        let urls: string[] = [];

        if (category) {
          const categoryDirectoryRef = ref(storage, `photo/${category}`);
          const categoryItems = await list(categoryDirectoryRef);
          urls = await Promise.all(
            categoryItems.items.map(async (item) => await getDownloadURL(item))
          );
        }

        setUploadedFiles(urls);
      } catch (error) {
        console.error("Error fetching uploaded files:", error);
      }
    };

    fetchUploadedFiles();
  }, [category]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const progressRef = React.useRef(() => {});

  const simulateBufferAndRetry = async () => {
    try {
      let retryAttempts = 2;

      while (retryAttempts > 0) {
        if (navigator.onLine) {
          // Continue with progress calculation if online
          const diff = Math.random() * 10;
          const diff2 = Math.random() * 10;
          setProgress(progress + diff);
          setBuffer(progress + diff + diff2);
        } else {
          // Simulate buffering delay
          await new Promise((resolve) => setTimeout(resolve, 1000));
          // Decrement retry attempts
          retryAttempts--;
        }
      }

      // No internet after two retries, show toast
      console.log("No internet connection!");
      toast.error("No internet connection. Please check your network.");

      // Reset retry attempts for the next time
      retryAttempts = 2;
    } catch (error) {
      console.error("Error during buffering and retry:", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      upload();
    }
  };

 

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    const selectedCategory = e.target.value;

    if (selectedCategory === "addNewCategory") {
      const newCategory = window.prompt("Enter a new category:");

      if (newCategory && !allCategories.includes(newCategory)) {
        setAllCategories([...allCategories, newCategory]);
        setCategory(newCategory);
        toast.success(`Category "${newCategory}" added successfully!`);
      } else {
        setCategory("");
      }
    } else {
      setCategory(selectedCategory);
    }
  };

  const generateFolderPath=()=>{
    return`photo/${owner}${category?`/${category}`:''}`
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles([...selectedFiles, ...newFiles]);
    }
  };

  const upload = async () => {
    if (selectedFiles.length > 0) {
      if (!password) {
        toast.error("Please enter a Password");
        return;
      }
       if (!owner) {
         toast.error("Please enter the owner's name");
         return;
       }

      try {
        const folderPath = generateFolderPath();

        const uploadPromises = selectedFiles.map(async (file) => {
          const filePath=`${folderPath}/${file.name}`
          const fileRef = ref(storage, filePath);
          const data = await uploadBytes(fileRef, file);
          console.log("Upload successful", data);

          const url = await getDownloadURL(data.ref);
          console.log("File URL", url);

          return url;
        });

        const urls = await Promise.all(uploadPromises);

        setUploadedFiles([...uploadedFiles, ...urls]);
        setSelectedFiles([]);
      } catch (error) {
        console.error("Upload error", error);
        toast.error("Upload failed. Please try again.");
      }
    } else {
      toast.warning("Please select a file to upload.");
    }
  };

  const cancelUpload = (index: number) => {
    const task = uploadTasks[index];
    if (task) {
      const fileName = selectedFiles[index].name || "Unnamed File";
      task.cancel();
      setUploadTasks((prevTasks) => {
        const { [index]: removedTask, ...remainingTasks } = prevTasks;
        return remainingTasks;
      });
      setUploadProgress((prevProgress) => {
        const { [index]: removedProgress, ...remainingProgress } = prevProgress;
        return remainingProgress;
      });
      toast.info(`Upload of "${fileName}" was canceled successfully.`);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDeleteFile = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const handleOwnerChange = (e: SelectChangeEvent<string>) => {
    const selectedOwner = e.target.value;

    if (selectedOwner === "addNewOwner") {
      const newOwner = window.prompt("Enter a new owner:");

      if (newOwner && !allOwners.includes(newOwner)) {
        setAllOwners([...allOwners, newOwner]);
        setOwner(newOwner);
        toast.success(` "${newOwner}" added successfully!`);
      } else {
        setOwner("");
      }
    } else if (selectedOwner === "removeOwner") {
      setOwner("");
    } else {
      setOwner(selectedOwner);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        {/* Left side */}
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold text-black">Welcome!</span>
          <span className="font-light text-gray-400 mb-8">
            Please upload your files here
          </span>
          <div className="my-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password:
            </label>
            <div>
              <TextField
                id="password"
                label="Password"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                variant="outlined"
                required
                // error={/* Add your validation logic here if needed */}
                // helperText={/* Provide additional information or error messages */}
              />
            </div>
          </div>
          <div className="my-4">
            <label
              htmlFor="owner"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select an owner or add a new one:
            </label>
            <div>
              <FormControl required className="w-full">
                <InputLabel id="owner-label">Owner</InputLabel>
                <Select
                  labelId="owner-label"
                  id="owner"
                  value={owner}
                  label="Owner *"
                  onChange={handleOwnerChange}
                >
                  <MenuItem value="" disabled>
                    <em>Select an owner...</em>
                  </MenuItem>
                  {allOwners.map((ownerOption) => (
                    <MenuItem key={ownerOption} value={ownerOption}>
                      {ownerOption}
                    </MenuItem>
                  ))}
                  <MenuItem value="addNewOwner">Add New Owner</MenuItem>
                  <MenuItem value="">Remove Owner</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="my-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select a category or add a new one:
            </label>
            <div>
              <FormControl required className="w-full">
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  value={category}
                  label="Category"
                  onChange={handleCategoryChange}
                >
                  <MenuItem value="" disabled>
                    <em>Select a category...</em>
                  </MenuItem>
                  <MenuItem value="">Root Folder</MenuItem>
                  {allCategories.map((categoryOption) => (
                    <MenuItem key={categoryOption} value={categoryOption}>
                      {categoryOption}
                    </MenuItem>
                  ))}
                  <MenuItem value="addNewCategory">Add New Category</MenuItem>
                </Select>
              </FormControl>
            </div>

            <button
              onClick={upload}
              className="w-full mt-10 bg-black text-white p-2 rounded-lg hover:scale(0.9)"
              style={{ transition: "all 0.3s ease-in-out" }}
              onKeyDown={handleKeyDown}
            >
              Upload
            </button>
          </div>
        </div>
        {/* Right side */}
        <div className="relative bg-cover bg-center w-[400px] h-full rounded-r-2xl overflow-hidden flex items-center justify-center">
          {/* Background Image */}
          <div className="w-full h-full hidden md:block justify-center">
            <Image
              src="/novs_10_06_-20231128-0001.jpg"
              alt="img"
              className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
              width={400}
              height={500}
            />
          </div>
          {/* Dropzone */}
          <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded-3xl drop-shadow-lg md:flex md:items-center md:justify-center cursor-pointer h-80 w-80 `}
            onClick={handleClick}
          >
            <label
              htmlFor="fileInput"
              className="text-center text-white text-xl md:text-lg lg:text-xl xl:text-2xl cursor-pointer"
            >
              <p className="mb-2">Drag and drop your file here</p>
              <input
                ref={fileInputRef}
                type="file"
                id="fileInput"
                onChange={handleFileChange}
                className="w-full h-16 md:w-64 md:h-60 cursor-pointer text-base md:text-xl hidden"
              />
            </label>
          </div>
        </div>
      </div>
      <div>
        {/* Display selected and uploaded files */}
        <div className="flex items-center justify-center flex-col w-full bg-gray-100 rounded-3xl">
          {selectedFiles.length > 0 && (
            <div className="p-6 flex flex-col bg-white rounded-2xl backdrop-blur-2xl drop-shadow-2xl mt-4">
              <p className="text-center text-black text-xl md:text-lg lg:text-xl xl:text-2xl mb-4">
                Selected Files:
              </p>
              <ol className="ml-6 list-decimal text-black">
                {selectedFiles.map((file, index) => (
                  <li
                    className="flex flex-row mt-6 items-center justify-between border"
                    key={index}
                  >
                    {`${index + 1}. ${file.name || "Unnamed File"}`}
                    {uploadProgress[index] !== undefined ? (
                      <>
                        <button
                          className="px-3 ml-4 py-2 bg-red-500 text-white rounded-md"
                          onClick={() => cancelUpload(index)}
                        >
                          Cancel Upload
                        </button>
                        {/* Add a conditional check for showing "Uploaded" */}
                      </>
                    ) : (
                      <button
                        className="px-3 ml-4 py-2 bg-red-500 text-white rounded-md"
                        onClick={() => handleDeleteFile(index)}
                      >
                        Delete
                      </button>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
      <div>
        {uploadedFiles.length > 0 && (
          <div>
            <p>Uploaded Files:</p>
            <ul>
              {uploadedFiles
                .filter((uploadedFile) => !uploadedFile.includes(".keep"))
                .map((filteredFile, index) => (
                  <li key={index}>
                    <Image
                      src={filteredFile}
                      alt={`Uploaded Image ${index + 1}`}
                      width={200}
                      height={200}
                    />
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>

      <Toaster position="bottom-right" />
    </div>
  );
};

export default UploadPage;
