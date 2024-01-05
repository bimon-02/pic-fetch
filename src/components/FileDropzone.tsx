// FileDropzone.tsx
import React from "react";

type FileDropzoneProps = {
  isDragging: boolean;
  handleClick: () => void;
  handleDragEnter: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FileDropzone: React.FC<FileDropzoneProps> = ({
  isDragging,
  handleClick,
  handleDragEnter,
  handleDragLeave,
  handleDrop,
  fileInputRef,
  handleFileChange,
}) => (
  <div
    className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded-3xl drop-shadow-lg md:flex md:items-center md:justify-center cursor-pointer h-80 w-80 ${
      isDragging ? "border-dashed border-2 border-blue-500" : ""
    }`}
    onClick={handleClick}
    onDragOver={handleDragEnter}
    onDragEnter={handleDragEnter}
    onDragLeave={handleDragLeave}
    onDrop={handleDrop}
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
        multiple
        className="w-full h-16 md:w-64 md:h-60 cursor-pointer text-base md:text-xl hidden"
      />
    </label>
  </div>
);

export default FileDropzone;
