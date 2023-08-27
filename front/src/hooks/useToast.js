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
    }, 2000); // Toast가 자동으로 닫히는 시간 설정 (2000ms = 2초)
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
