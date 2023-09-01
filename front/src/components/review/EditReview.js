import { useCallback, useContext, useRef, useState } from "react";
import { createBlobUrls, createFormData } from "../../util/imagUrl";
import validationReview from "../../util/validation.js/review";
import ReviewFormContainer from "./layout/ReviewFormContainer";
import useToast from "../../hooks/useToast";
import { UserStateContext } from "../../App";
import { serverUrl } from "../../Api";
import * as Api from "../../Api";
import useModal from "../../hooks/useModal";

// <ReviewTitle/>에서  '...' 버튼을 클릭 => id, review 값 modalVisible 컨텍스트에 전달
// => <ActionSelectorModal />에서 그 값을 받아서
// => 모달에 관한 컨텍스트만 변경 후 데이터를 현재 컴포넌트로 전달

// 다른 부분

const EditReview = ({
  userInputValues,
  setUserInputValues,
  reviews,
  setReviews,
}) => {
  const { user: loggedInUser } = useContext(UserStateContext);
  const { modalVisible, closeModal } = useModal();
  const currentReviewData = modalVisible?.data?.review;
  // 모달창 열 때 받아온 데이터를 저장한다
  const [editedReview, setEditedReview] = useState(currentReviewData);

  const { showToastPopup } = useToast();
  const [preview, setPreview] = useState(null);
  // const formDataFileRef = useRef(null);

  // const handleFileChange = (files) => {
  //   const formDataFiles = Array.from(files);
  //   formDataFileRef.current = formDataFiles;
  //   createBlobUrls(files, setPreview);
  // };

  // inputs 중 하나가 변경되어야만 콜백을 새로 실행시킨다
  const handleSubmit = useCallback(async () => {
    try {
      console.log("hi");
      // const validationError = validationReview(loggedInUser, userInputValues);
      // if (validationError) {
      //   showToastPopup(validationError.message, validationError.status);
      //   return;
      // }
      // if (!formDataFileRef) {
      //   console.log("null eeee");
      // }
      console.log(editedReview);

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
    showToastPopup,
    userInputValues,
    currentReviewData,
    editedReview,
  ]);

  return (
    <ReviewFormContainer
      headerTitle="수정하기"
      userInputValues={userInputValues}
      setUserInputValues={setUserInputValues}
      // handleFileChange={handleFileChange}
      handleSubmit={handleSubmit}
      preview={preview}
      setPreview={setPreview}
      editedReview={editedReview}
      setEditedReview={setEditedReview}
    />
  );
};

export default EditReview;
