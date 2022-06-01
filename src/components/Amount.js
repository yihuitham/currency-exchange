import React, { useState } from "react";

export default function Amount({ name, value, setValue, disabled = false }) {
  const [error, setError] = useState(false);

  function to2Decimal(value) {
    return Math.floor(value * 100) / 100;
  }

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
        className="bg-gray-100 text-black text-center"
        name={name}
        onChange={handleChange}
        value={to2Decimal(value)}
        disabled={disabled}
      />
      {error ? <p>Please enter a valid amount</p> : null}
    </>
  );
}
