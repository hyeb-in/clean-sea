import { useState } from "react";

const useToast = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastStatus, setToastStatus] = useState(null);
  const [toastPosition, setToastPosition] = useState("top-center");

  const showToastPopup = (text, status, position = "top-center") => {
    setToastMessage(text);
    setToastStatus(status);
    setToastPosition(position);
    setShowToast(true);

    setTimeout(() => {
      setToastMessage("");
      setShowToast(false);
      setToastStatus(null);
    }, 2000);
  };

  return {
    showToast,
    setShowToast,
    showToastPopup,
    toastMessage,
    toastStatus,
    toastPosition,
  };
};

export default useToast;
