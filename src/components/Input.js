// components/Input.js
import React from "react";

const Input = React.forwardRef(({ label, id, ...rest }, ref) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        className="border rounded-md px-4 py-2 w-full"
        {...rest}
      />
    </div>
  );
});

export default Input;
