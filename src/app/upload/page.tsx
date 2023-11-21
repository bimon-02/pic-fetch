"use client";

// // pages/components/UploadForm.tsx

// import React from "react";
// import FormInput from "@/components/Input";
// import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

// type Inputs = {
//   file: FileList;
//   category: string;
// };

// const UploadForm = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<Inputs>();

//   const onSubmit: SubmitHandler<Inputs> = async (data: FieldValues) => {
//     // Add your upload logic here
//     console.log(data);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
//         {/* left side */}
//         <div className="flex flex-col justify-center p-8 md:p-14">
//           <span className="mb-3 text-4xl font-bold text-black">
//             Upload Page
//           </span>
//           <span className="font-light text-gray-400 mb-8">
//             Select a file to upload and add relevant details.
//           </span>
//           <form onSubmit={handleSubmit(onSubmit)} className="py-4">
//             {/* File input using the FormInput component */}
//             <FormInput
//               label="Select File"
//               type="file"
//               id="file"
//               name="file"
//               register={register}
//               error={errors.file}
//             />

//             {/* Additional details input using the FormInput component */}
//             <FormInput
//               label="Category"
//               type="text"
//               id="category"
//               name="category"
//               register={register}
//               error={errors.category}
//             />

//             <button
//               type="submit"
//               className="w-full mt-10 bg-black text-white p-2 rounded-lg hover:scale(0.9)"
//               style={{ transition: "all 0.3s ease-in-out" }}
//             >
//               Upload
//             </button>
//           </form>
//         </div>
//         {/* right side */}
        // <div className="relative">
        //   <img
        //     src="https://images.pexels.com/photos/3014019/pexels-photo-3014019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        //     alt="img"
        //     className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
        //   />
        //   {/* text on image */}
        //   <div className="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
        //     <div className="text-center text-white text-xl md:text-lg lg:text-xl xl:text-2xl">
        //       Turning fleeting moments
        //       <br />
        //       into everlasting memories,
        //       <br />
        //       one click at a time
        //     </div>
        //   </div>
//         </div>{" "}
//         <div className="relative">
//           {/* Image or additional content for the right side if needed */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UploadForm;


// pages/components/UploadForm.tsx
import React, { useState } from "react";
import FormInput from "@/components/Input";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

type Inputs = {
  file: FileList;
  category: string;
};

const UploadForm = () => {
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data: FieldValues) => {
    const file = data.file[0];

    // Simulate file upload progress
    setUploadProgress(0);
    const interval = setInterval(() => {
      if (uploadProgress === 100) {
        clearInterval(interval);
      } else {
        setUploadProgress((prevProgress) =>
          prevProgress === null ? 10 : Math.min(prevProgress + 10, 100)
        );
      }
    }, 500);

    // Simulate file upload completion after 2 seconds
    setTimeout(() => {
      setUploadProgress(100);
      clearInterval(interval);
      setUploadedFile(file);
    }, 2000);

    console.log(data);
  };

  const handleDelete = () => {
    // Reset state to allow re-uploading
    setUploadProgress(null);
    setUploadedFile(null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        {/* left side */}
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold text-black">
            Upload Files
          </span>
          <span className="font-light text-gray-400 mb-8">
            Select a file to upload and add relevant details.
          </span>
          <form onSubmit={handleSubmit(onSubmit)} className="py-4">
            {/* File input using the FormInput component */}
            {/* Category input using the FormInput component */}
            <FormInput
              label="Category"
              type="select"
              id="category"
              name="category"
              register={register}
              error={errors.category}
              options={["Landscape", "Portraits", "Other"]}
            />{" "}
            <FormInput
              label={
                uploadedFile
                  ? `File Uploaded: ${uploadedFile.name}`
                  : "Select File"
              }
              type="file"
              id="file"
              name="file"
              register={register}
              error={errors.file}
            />
            {uploadProgress !== null && (
              <div className="mb-4">
                <progress
                  value={uploadProgress}
                  max="100"
                  className="w-full h-4 bg-blue-300"
                />
              </div>
            )}
            {uploadedFile && (
              <div className="mb-4">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="text-red-500 font-medium cursor-pointer"
                >
                  Delete Uploaded File
                </button>
              </div>
            )}
            <button
              type="submit"
              className="w-full mt-10 bg-black text-white p-2 rounded-lg hover:scale(0.9)"
              style={{ transition: "all 0.3s ease-in-out" }}
            >
              Upload
            </button>
          </form>
        </div>
        {/* right side */}
         <div className="relative">
          <img
            src="https://images.pexels.com/photos/3014019/pexels-photo-3014019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="img"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
          {/* text on image */}
          <div className="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
            <div className="text-center text-white text-xl md:text-lg lg:text-xl xl:text-2xl">
              Turning fleeting moments
              <br />
              into everlasting memories,
              <br />
              one click at a time
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;


