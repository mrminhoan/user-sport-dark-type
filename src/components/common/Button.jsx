import { Button, ConfigProvider } from "antd";
import React from "react";

const getFont = (size) => {
  switch (size) {
    case "small":
      return {
        fontSize: "14px",
        height: 28,
        fontWeight: 400,
      };
    case "medium":
      return {
        fontSize: "14px",
        height: 32,
        fontWeight: 400,
        borderRadius: "4px",
      };

    case "large":
      return {
        fontSize: "16px",
        height: 48,
        fontWeight: 400,
        borderRadius: "8px",
      };

    default:
      return {
        fontSize: "14px",
        height: 28,
        fontWeight: 400,
      };
  }
};

const CommonButton = ({
  bgColor = "#F1F2F7",
  size,
  type = "primary",
  style = {},
  textColor = "white",
  height,
  isLoading = false,
  disabled = false,
  icon,
  children,
  shape = "default",
  classname,
  rightComponent = () => {},
  onClick = () => {},
}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            ...(bgColor && {
              colorPrimary: bgColor,
              colorPrimaryHover: bgColor,
              colorPrimaryActive: bgColor,
              lineWidth: 0,
            }),
          },
        },
      }}
    >
      <Button
        type={type}
        disabled={disabled}
        loading={isLoading}
        icon={icon || null}
        shape={shape}
        style={{
          display: "flex",
          alignItems: "center",
          height: height || "auto",
          justifyContent: "center",
          color: textColor || "black",
          boxShadow: "unset",
          ...(shape !== "circle" && { padding: "0px 16px" }),
          ...getFont(size),
          ...(height && { height }),
          ...style,
        }}
        className={classname}
        onClick={onClick}
      >
        {children && rightComponent && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            {children}
            {rightComponent && rightComponent()}
          </div>
        )}
      </Button>
    </ConfigProvider>
  );
};

export default CommonButton;
