import { useCallback, useContext, useRef, useState } from "react";
import ReviewFormContainer from "./layout/ReviewFormContainer";
import validationReview from "../../util/validation.js/review";
import { UserStateContext } from "../../App";
import { createBlobUrls, createFormData } from "../../util/imagUrl";
import useToast from "../../hooks/useToast";
import axios from "axios";
import { serverUrl } from "../../Api";
import useModal from "../../hooks/useModal";
import ToastWrapper from "../common/popup/ToastWrapper";
import { RESULT_ENUM } from "../../constants";

const AddReview = ({
  userInputValues,
  setUserInputValues,
  setReviews,
  setUploadingStatus,
}) => {
  const [preview, setPreview] = useState(null);

  const { user: loggedInUser } = useContext(UserStateContext);
  const formDataFileRef = useRef(null);
  const { showToast, setShowToast, toastMessage, toastData } = useToast();
  const { closeModal } = useModal();

  const handleFileChange = (files) => {
    const formDataFiles = Array.from(files);
    formDataFileRef.current = formDataFiles;
    createBlobUrls(files, setPreview);
  };

  const handleSubmit = useCallback(async () => {
    try {
      const validationError = validationReview(loggedInUser, userInputValues);
      if (validationError) {
        setShowToast(validationError.message, validationError.status);
        console.log(validationError.message);
        return;
      }
      setUploadingStatus(RESULT_ENUM.UPLOADING);
      const formData = createFormData(formDataFileRef, userInputValues);
      const res = await axios.post(`${serverUrl}reviews/registerrr`, formData);
      if (!res.data) {
        setUploadingStatus(RESULT_ENUM.FAIL);
        throw new Error("데이터를 저장하지 못했습니다");
      }
      setReviews((current) => [res.data, ...current]);
      setUserInputValues({ title: "", content: "" });
      setUploadingStatus(RESULT_ENUM.SUCCESS);
      closeModal();
      // 알림창: loading ->  onError, onSuccess
    } catch (error) {
      console.log(error);
    }
  }, [
    closeModal,
    userInputValues,
    loggedInUser,
    setReviews,
    setUserInputValues,
    toastMessage,
    showToast,
    setUploadingStatus,
  ]);

  return (
    <>
      {/* {showToast && <ToastWrapper toastData={toastData} />} */}
      <ReviewFormContainer
        headerTitle="글 작성하기"
        userInputValues={userInputValues}
        setUserInputValues={setUserInputValues}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
        preview={preview}
        setPreview={setPreview}
      />
    </>
  );
};

export default AddReview;
