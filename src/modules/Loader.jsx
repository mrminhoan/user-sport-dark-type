import React from "react";

const Loader = () => {
  return (
    <div className="flex space-x-2 justify-center items-center bg-transparent h-full">
      <div className="h-2 w-2 bg-amber-700 rounded-full animate-bounce [animation-delay:-0.05s]"></div>
      <div className="h-2 w-2 bg-amber-700 rounded-full animate-bounce [animation-delay:-0.25s]"></div>
      <div className="h-2 w-2 bg-amber-700 rounded-full animate-bounce [animation-delay:-0.40s]"></div>
    </div>
  );
};

export default Loader;
