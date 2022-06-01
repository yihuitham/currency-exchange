import React, { useState } from "react";

export default function InputAmount({
  name,
  value,
  setValue,
  //   disabled = false,
}) {
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
        className="bg-gray-100 text-black"
        name={name}
        onChange={handleChange}
        value={value}
        // disabled={disabled}
      />
      {error ? <p>Please enter a valid amount</p> : null}
    </>
  );
}
