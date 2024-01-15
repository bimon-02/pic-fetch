"use client";

import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { getDownloadURL, list, ref, uploadBytes } from "firebase/storage";
import Image from "next/image";
import { storage } from "@/config/firebase";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import { FileWithPath, useDropzone } from "react-dropzone";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import FileDropzone from "@/components/FileDropzone";
import LinearWithValueLabel from "@/components/LinearProgress";

type UploadPageProps = {};

const UploadPage: React.FC<UploadPageProps> = () => {
  const router = useRouter();

  const [fileUpload, setFileUpload] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [viewOption, setViewOption] = useState<string>("all");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
 
  

  const redirectToFireTest = () => {
    router.push("/fire/Firetest");
  };

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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      upload();
    }
  };

  const handleCategoryChange = (e: SelectChangeEvent<string>) => {
    const selectedCategory = e.target.value;

    if (selectedCategory === "addNewCategory") {
      setShowNewCategoryModal(true);
     
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
        const uploadPromises = selectedFiles.map(async (file) => {
          const fileRef = ref(storage, `photo/${category}/${file.name}`);
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

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      setSelectedFiles([...selectedFiles, ...droppedFiles]);
    }
  };

  const handleDeleteFile = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const handleCloseModal = () => {
    setShowNewCategoryModal(false);
    setCategory("");
  };

  const handleAddCategory = async () => {
    if (newCategoryName && !allCategories.includes(newCategoryName)) {
      console.log("Adding category:", newCategoryName);

      const categoryFolderPath = `photo/${newCategoryName}/`;

      const placeHolderRef = ref(storage, categoryFolderPath + ".keep");
      await uploadBytes(placeHolderRef, new Uint8Array(0));

      setAllCategories([...allCategories, newCategoryName]);

      toast.success(`Category "${newCategoryName}" added successfully`);
      handleCloseModal();
      setCategory(newCategoryName);
    } else {
      if (!newCategoryName) {
        console.log("Empty category name");
        toast.error("Please enter a valid category name.");
      } else {
        console.log("Category already exists");
        toast.warning(`Category "${newCategoryName}" already exists.`);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        {/* Left side */}
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold text-black">Welcome!</span>
          <span className="font-light text-gray-400 mb-8">
            Please upload your files here
          </span>
          <div className="my-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Select a category or add a new one:
            </label>
            {/* Category Selector */}
            <div>
              <FormControl required className="w-full">
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category"
                  id="category"
                  value={category}
                  onChange={handleCategoryChange}
                  label="Category *"
                >
                  <MenuItem value="" disabled>
                    <em> Select a category...</em>
                  </MenuItem>
                  {allCategories.map((categoryOption) => (
                    <MenuItem key={categoryOption} value={categoryOption}>
                      {categoryOption}
                    </MenuItem>
                  ))}
                  <MenuItem value="addNewCategory">Add New Category</MenuItem>
                </Select>
              </FormControl>
            </div>{" "}
            <Dialog open={showNewCategoryModal} onClose={handleCloseModal}>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogContent>
                <TextField
                  label="Category Name"
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseModal}>Cancel</Button>
                <Button onClick={handleAddCategory}>Add</Button>
              </DialogActions>
            </Dialog>
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
              // src="/novs_10_06_-20231128-0001.jpg"
              src=""
              alt="img"
              className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
              width={400}
              height={500}
            />
          </div>
          {/* Dropzone */}
          <FileDropzone
            isDragging={isDragging}
            handleClick={handleClick}
            handleDragEnter={handleDragEnter}
            handleDragLeave={handleDragLeave}
            handleDrop={handleDrop}
            fileInputRef={fileInputRef}
            handleFileChange={handleFileChange}
          />
        </div>
      </div>
      {/* Delete File Section */}
      <div className="flex items-center justify-center flex-col w-full bg-gray-100 rounded-3xl">
        {selectedFiles.length > 0 && (
          <div className="p-6 flex flex-col bg-white rounded-2xl backdrop-blur-2xl drop-shadow-2xl mt-4">
            <p className="text-center text-black text-xl md:text-lg lg:text-xl xl:text-2xl mb-4">
              Selected Files:
            </p>
            <ol className="ml-6 list-decimal text-black">
              {selectedFiles.map((file, index) => (
                <li
                  key={index}
                  className="flex flex-row mt-6 items-center justify-between border"
                >
                  <span>{`${index + 1}. ${file.name || "Unnamed File"}`}</span>
                  <button
                    className="px-3 ml-4 py-2 bg-red-500 text-white rounded-md"
                    onClick={() => handleDeleteFile(index)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ol>
          </div>
        )}{" "}
      </div>{" "}
      {/* Display selected and uploaded files */}
      <Toaster position="bottom-right" />
    </div>
  );
};

export default UploadPage;
