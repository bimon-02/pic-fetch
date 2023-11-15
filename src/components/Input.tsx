import React from "react";

const FormInput = ({
  label,
  type,
  id,
  register,
  error,
  disabled,
}: {
  label: string;
  type: string;
  id: string;
  register: any;
  error: any;
  disabled?: boolean;
}) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-gray-700 text-sm font-bold mb-2">
      {label}
    </label>
    <input
      type={type}
      id={id}
      {...register(id)}
      disabled={disabled}
      className="w-full p-2 border border-gray-300 rounded-md placeholder-font-black text-gray-700 placeholder-text-gray-500"

      // className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
    />
    {error && <div className="text-red-500 text-sm mb-4">{error.message}</div>}
  </div>
);

export default FormInput;
