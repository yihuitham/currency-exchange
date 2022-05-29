import React, { useState } from "react";

export default function InputAmount({ name, value, setValue }) {
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
        className="bg-gray-100"
        name={name}
        onChange={handleChange}
        value={value}
      />
      {error ? <p>Please enter a valid amount</p> : null}
    </>
  );
}
