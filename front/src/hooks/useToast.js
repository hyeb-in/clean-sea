import { useEffect, useState } from "react";

const useToast = () => {
  const [toastData, setToastData] = useState({
    isVisible: false,
    text: "",
    status: null,
    position: "top-center",
  });

  const setShowToast = (text, status, position = "top-center") => {
    console.log(text, status, position, "from useToast");
    setToastData({
      isVisible: true,
      text,
      status,
      position,
    });
    const timerId = setTimeout(() => {
      closeToast();
    }, 2000);

    // 타이머 아이디 저장
    setToastData((prevData) => ({
      ...prevData,
      timerId: timerId,
    }));
  };

  const closeToast = () => {
    setToastData((prevData) => ({
      ...prevData,
      isVisible: false,
      text: "",
      timerId: null,
    }));
  };

  useEffect(() => {
    // 컴포넌트가 언마운트되거나, 새로운 토스트 메시지가 설정되면 타이머를 클리어한다.
    return () => {
      if (toastData.timerId) {
        clearTimeout(toastData.timerId);
      }
    };
  }, [toastData.timerId]);

  return {
    showToast: toastData.isVisible,
    toastData,
    // setShowToast: (isVisible) =>
    //   setToastData((prevData) => ({ ...prevData, isVisible })),
    setShowToast,
    toastText: toastData.text,
    toastStatus: toastData.status,
    toastPosition: toastData.position,
  };
};

export default useToast;
