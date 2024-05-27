import { notification } from "antd";

function openNotification({ type, message, description }) {
  notification.config({
    placement: "top",
    className: "notification-custom",
  });
  return notification[type]({
    message,
    description,
  });
}

export default openNotification;
