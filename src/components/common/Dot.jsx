import React from "react";

const Dot = ({ size = "4px", style = {} }) => {
  return (
    <div
      className="rounded-[50%] bg-white"
      style={{ width: size, height: size, ...style }}
    />
  );
};

export default Dot;
