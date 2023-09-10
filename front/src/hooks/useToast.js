import { useEffect, useState } from "react";
import { TOAST_POPUP_STATUS } from "../constants";

const useToast = () => {
  const [toastData, setToastData] = useState({
    isVisible: false,
    text: "",
    status: null,
    position: "top-center",
  });

  const setShowToast = (text, status, position = "top-center") => {
    // console.log(text, status, position, "from useToast");
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

  const showToastWithStatus = (status, errorMessage) => {
    let text = "";
    switch (status) {
      case 403:
        text = "권한이 없습니다. 로그인 후 다시 시도해주세요";
        break;
      case 400:
        text = errorMessage;
        break;
      case 500:
        text = "서버에서 오류가 발생했습니다. 잠시 후에 다시 시도해주세요";
        break;
      default:
        text = "오류가 발생했습니다";
        break;
    }

    setShowToast(text, TOAST_POPUP_STATUS.error);
  };

  return {
    showToast: toastData.isVisible,
    toastData,
    setShowToast,
    toastText: toastData.text,
    toastStatus: toastData.status,
    toastPosition: toastData.position,
    showToastWithStatus,
  };
};

export default useToast;
