import React from "react";
import Icon from "@ant-design/icons";

const TrendingFlatIcon = (props) => {
  return (
    <Icon
      component={() => (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_2466_4539)">
            <path d="M22 12L18 8V11H3V13H18V16L22 12Z" fill="currentColor" />
          </g>
          <defs>
            <clipPath id="clip0_2466_4539">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      )}
      {...props}
    />
  );
};

export default TrendingFlatIcon;
