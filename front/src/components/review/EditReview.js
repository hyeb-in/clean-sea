import { useCallback, useContext, useState } from "react";
import ReviewFormContainer from "./layout/ReviewFormContainer";
import useToast from "../../hooks/useToast";
import { UserStateContext } from "../../App";
import * as Api from "../../Api";
import useModal from "../../hooks/useModal";
import ToastWrapper from "../common/popup/ToastWrapper";
import validationReview from "../../util/validation.js/review";

const EditReview = ({ userInputValues, setUserInputValues, setReviews }) => {
  const { user: loggedInUser } = useContext(UserStateContext);
  const { modalVisible, closeModal } = useModal();
  const currentReviewData = modalVisible?.data?.review;
  // 모달창 열 때 받아온 데이터를 저장한다
  const [editedReview, setEditedReview] = useState(currentReviewData);
  const { showToast, setShowToast, toastData } = useToast();
  const [preview, setPreview] = useState(null);

  const handleSubmit = useCallback(async () => {
    try {
      const validationError = validationReview(loggedInUser, userInputValues);
      if (validationError) {
        setShowToast(validationError.message, validationError.status);
        console.log(validationError.message);
        return;
      }
      const res = await Api.put(`reviews/${currentReviewData._id}`, {
        title: editedReview.title,
        content: editedReview.content,
      });
      if (!res.data) {
        throw new Error("데이터를 불러오지 못했습니다");
      }
      console.log(res.data);
      setReviews((current) => [res.data, ...current]);
      setEditedReview(null);
      closeModal();
      // [x] 토스트
      // 알림창: loading ->  onError, onSuccess
      // 작성중 close -> 경고창
    } catch (error) {
      console.log(error);
    }
  }, [
    closeModal,
    loggedInUser,
    setReviews,
    setUserInputValues,
    userInputValues,
    currentReviewData,
    editedReview,
  ]);

  return (
    <>
      {/* {showToast && <ToastWrapper toastData={toastData} />} */}
      <ReviewFormContainer
        headerTitle="수정하기"
        userInputValues={userInputValues}
        setUserInputValues={setUserInputValues}
        handleSubmit={handleSubmit}
        preview={preview}
        setPreview={setPreview}
        editedReview={editedReview}
        setEditedReview={setEditedReview}
      />
    </>
  );
};

export default EditReview;
