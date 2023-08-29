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
// import { useState, useEffect } from "react";

// const useToast = () => {
//   const [toastData, setToastData] = useState({
//     isVisible: false,
//     message: "",
//     status: null,
//     position: "top-center",
//   });

//   useEffect(() => {
//     if (toastData.isVisible) {
//       const timer = setTimeout(() => {
//         setToastData({
//           isVisible: false,
//           message: "",
//           status: null,
//           position: "top-center",
//         });
//       }, 2000);

//       return () => clearTimeout(timer);
//     }
//   }, [toastData.isVisible]);

//   const showToastPopup = (message, status, position = "top-center") => {
//     setToastData({
//       isVisible: true,
//       message,
//       status,
//       position,
//     });
//   };

//   return {
//     showToast: toastData.isVisible,
//     setShowToast: (isVisible) =>
//       setToastData((prevData) => ({ ...prevData, isVisible })),
//     showToastPopup,
//     toastMessage: toastData.message,
//     toastStatus: toastData.status,
//     toastPosition: toastData.position,
//   };
// };

// export default useToast;
