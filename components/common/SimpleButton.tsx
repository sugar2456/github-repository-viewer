'use client';
import React, { useState } from "react";

export const SimpleButton: React.FC = () => {
  const [state, setState] = useState(false);
  const handleClick = () => {
    setState((prevState) => !prevState);
  };
  return <button
    onClick={handleClick}
    className="px-4 py-2 bg-gray-300 text-gray-800 rounded shadow hover:shadow-md transition-shadow"
  >
    {state ? "ON" : "OFF"}
  </button>;
};