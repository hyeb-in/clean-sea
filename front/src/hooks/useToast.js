import { useState } from "react";

const useToast = () => {
  const [toastData, setToastData] = useState({
    isVisible: false,
    text: "",
    status: null,
    position: "top-center",
  });

  const showToastPopup = (text, status, position = "top-center") => {
    setToastData({
      isVisible: true,
      text,
      status,
      position,
    });
  };

  // setTimeout(() => {
  //   setToastData((prevData) => ({
  //     ...prevData,
  //     isVisible: false,
  //     text: "", // 토스트가 닫힐 때 메시지 내용도 초기화
  //   }));
  // }, 2000);// >>> 부트스트랩이랑 부딪히나??

  return {
    showToast: toastData.isVisible,
    setShowToast: (isVisible) =>
      setToastData((prevData) => ({ ...prevData, isVisible })),
    showToastPopup,
    toastText: toastData.text,
    toastStatus: toastData.status,
    toastPosition: toastData.position,
  };
};

export default useToast;
