import React, { useState } from "react";

export default function Amount({ name, value, setValue, disabled = false }) {
  const [error, setError] = useState(false);

  function handleChange(event) {
    const input = event.target.value;
    if (isNaN(input)) {
      return setError(true);
    }
    setError(false);
    setValue(input);
  }
  return (
    <>
      <input
        className="font-bold text-center bg-black border-b border-gray-300 text-white w-full focus:outline-none focus:border-blue-400 text-base"
        name={name}
        onChange={handleChange}
        disabled={disabled}
        placeholder={1}
      />
      {error ? <p>Please enter a valid amount</p> : null}
    </>
  );
}
