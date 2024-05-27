import React from "react";
import Icon from "@ant-design/icons";

const ArrowDownIcon = (props) => {
  return (
    <Icon
      component={() => (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25.7075 18.7075L16.7075 27.7075C16.6146 27.8005 16.5043 27.8742 16.3829 27.9246C16.2615 27.9749 16.1314 28.0008 16 28.0008C15.8686 28.0008 15.7385 27.9749 15.6171 27.9246C15.4957 27.8742 15.3854 27.8005 15.2925 27.7075L6.29251 18.7075C6.10487 18.5199 5.99945 18.2654 5.99945 18C5.99945 17.7346 6.10487 17.4801 6.29251 17.2925C6.48015 17.1049 6.73464 16.9994 7.00001 16.9994C7.26537 16.9994 7.51987 17.1049 7.70751 17.2925L15 24.5863V5C15 4.73478 15.1054 4.48043 15.2929 4.29289C15.4804 4.10536 15.7348 4 16 4C16.2652 4 16.5196 4.10536 16.7071 4.29289C16.8947 4.48043 17 4.73478 17 5V24.5863L24.2925 17.2925C24.4801 17.1049 24.7346 16.9994 25 16.9994C25.2654 16.9994 25.5199 17.1049 25.7075 17.2925C25.8951 17.4801 26.0006 17.7346 26.0006 18C26.0006 18.2654 25.8951 18.5199 25.7075 18.7075Z"
            fill="currentColor"
          />
        </svg>
      )}
      {...props}
    />
  );
};

export default ArrowDownIcon;
