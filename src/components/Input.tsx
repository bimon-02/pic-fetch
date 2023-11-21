"use client";

// import React from "react";

// const FormInput = ({
//   label,
//   type,
//   id,
//   register,
//   error,
//   disabled,
// }: {
//   label: string;
//   type: string;
//   id: string;
//   register: any;
//   error: any;
//   disabled?: boolean;
// }) => (
//   <div className="mb-4">
//     <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
//       {label}
//     </label>
//     <input
//       type={type}
//       id={id}
//       {...register(id)}
//       disabled={disabled}
//       className="w-full p-2 border border-gray-300 rounded-md placeholder-font-black text-gray-700 placeholder-text-gray-500"

//       // className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//     />
//     {error && <div className="text-red-500 text-sm mb-4">{error.message}</div>}
//   </div>
// );

// export default FormInput;

// components/Input.tsx
import React from "react";

type FormInputProps = {
  label: string;
  type: string;
  id: string;
  name: string;
  register: any;
  error: any;
  disabled?: boolean;
  options?: string[];
};

const FormInput = ({
  label,
  type,
  id,
  name,
  register,
  error,
  disabled,
  options,
}: FormInputProps) => {
  const renderSelectInput = () => (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={id}
        name={name}
        {...register(name)}
        disabled={disabled}
        className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300 text-black"
      >
        {options &&
          options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
      </select>
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );

  const renderFileInput = () => (
    <div className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring focus:border-blue-300">
      <input
        type={type}
        id={id}
        name={name}
        {...register(name)}
        disabled={disabled}
        className="hidden"
      />
      <label
        htmlFor={id}
        className="cursor-pointer text-black p-2 bg-transparent rounded-md text-center"
      >
        Drop your files here or click to select
      </label>
    </div>
  );

  const renderTextInput = () => (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={label}
        {...register(name)}
        disabled={disabled}
        className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
      />
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );

  return (
    <div>
      {type === "select" && options ? renderSelectInput() : null}
      {type === "file" ? renderFileInput() : renderTextInput()}
    </div>
  );
};

export default FormInput;
