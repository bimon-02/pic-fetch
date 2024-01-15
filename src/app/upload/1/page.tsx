"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  UploadTask,
  getDownloadURL,
  list,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "@/config/firebase";
import { Toaster, toast } from "sonner";
import Image from "next/image";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import BasicModal from "@/components/BasicModal";

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

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const fetchAllCategories = async () => {
    try {
      const photoDirectoryRef = ref(storage, "photo");
      const photoItems = await list(photoDirectoryRef);
      const categories = photoItems.prefixes.map((prefix) => prefix.name);
      setAllCategories(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setSelectedFiles([...selectedFiles, ...newFiles]);
    }
  };

  const upload = async () => {
    if (selectedFiles.length > 0) {
      if (!category) {
        toast.error("Please select a category");
        return;
      }

      try {
        const uploadPromises: Promise<string>[] = selectedFiles.map(
          (file, index) => {
            return new Promise((resolve, reject) => {
              const fileRef = ref(storage, `photo/${category}/${file.name}`);
              const task = uploadBytesResumable(fileRef, file);

              setUploadTasks((prevTasks) => ({ ...prevTasks, [index]: task }));

              task.on(
                "state_changed",
                // Removed progress handling
                () => {},
                (error) => {
                  if (error.code === "storage/canceled") {
                    console.info(`Upload at index ${index} canceled.`);
                  } else {
                    console.error("Upload error", error);
                    reject(error);
                  }
                },
                async () => {
                  const url = await getDownloadURL(task.snapshot.ref);
                  resolve(url);
                }
              );
            });
          }
        );

        const urls = await Promise.all(uploadPromises);

        setUploadedFiles([...uploadedFiles, ...urls]);
        toast.success("Files uploaded successfully!");
        setSelectedFiles([]);
        setUploadedFileNames([
          ...uploadedFileNames,
          ...selectedFiles.map((file) => file.name),
        ]);
      } catch (error: any) {
        if (error.code !== "storage/canceled") {
          console.error("Upload error", error);
          toast.error("Upload failed. Please try again.");
        }
      } finally {
        setUploadTasks({});
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

  return (
    <div>
      <div>
        <label htmlFor="category">Select a category or add a new one:</label>
        <div>
          <FormControl required>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              value={category}
              label="Category *"
              onChange={handleCategoryChange}
            >
              <MenuItem value="" disabled>
                <em>Select a category...</em>
              </MenuItem>
              {allCategories.map((categoryOption) => (
                <MenuItem key={categoryOption} value={categoryOption}>
                  {categoryOption}
                </MenuItem>
              ))}
              <MenuItem value="addNewCategory">Add New Category</MenuItem>
            </Select>
            <FormHelperText className="mt-1 text-red-500 text-sm">
              Required
            </FormHelperText>
          </FormControl>
        </div>

        <button onClick={upload}>Upload</button>
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
                    <>
                      {file.uploaded ? (
                        <>
                          {/* Show "Uploaded" message or any other content */}
                          <span className="text-green-500 ml-4">Uploaded</span>
                          <button
                            className="px-3 ml-4 py-2 bg-red-500 text-white rounded-md"
                            onClick={() => handleDeleteFile(index)}
                          >
                            Delete
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="px-3 ml-4 py-2 bg-red-500 text-white rounded-md"
                            onClick={() => cancelUpload(index)}
                          >
                            Cancel Upload
                          </button>
                        </>
                      )}
                    </>
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
              {uploadedFiles.map((uploadedFile, index) => (
                <li key={index}>{uploadedFile}</li>
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
