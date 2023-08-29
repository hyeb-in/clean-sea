import { useCallback, useContext, useRef, useState } from "react";
import ReviewFormContainer from "./layout/ReviewFormContainer";
import validationReview from "../../util/validation.js/review";
import { UserStateContext } from "../../App";
import { createBlobUrls, createFormData } from "../../util/imagUrl";
import useToast from "../../hooks/useToast";
import axios from "axios";
import { serverUrl } from "../../Api";

const AddReview = ({
  userInputValues,
  setUserInputValues,
  setReviews,
  reviews,
}) => {
  const [preview, setPreview] = useState(null);

  const { user: loggedInUser } = useContext(UserStateContext);
  const formDataFileRef = useRef(null);
  const { showToastPopup } = useToast();

  const handleFileChange = (files) => {
    const formDataFiles = Array.from(files);
    formDataFileRef.current = formDataFiles;
    createBlobUrls(files, setPreview);
  };

  const handleSubmit = useCallback(async () => {
    try {
      const validationError = validationReview(loggedInUser, userInputValues);

      if (validationError) {
        showToastPopup(validationError.message, validationError.status);
        return;
      }
      const formData = createFormData(formDataFileRef, userInputValues);
      const res = await axios.post(`${serverUrl}reviews/register`, formData);
      if (!res.data) {
        throw new Error("데이터를 불러오지 못했습니다");
      }
      setReviews((current) => [res.data, ...current]);
      setUserInputValues({ title: "", content: "" });
      // closeModal();
      // [x] 토스트
      // 알림창: loading ->  onError, onSuccess
      // 작성중 close -> 경고창
    } catch (error) {
      console.log(error);
    }
  }, [showToastPopup, userInputValues, loggedInUser, setReviews]);

  return (
    <ReviewFormContainer
      headerTitle="글 작성하기"
      userInputValues={userInputValues}
      setUserInputValues={setUserInputValues}
      handleFileChange={handleFileChange}
      handleSubmit={handleSubmit}
      preview={preview}
      setPreview={setPreview}
    />
  );
};

export default AddReview;
