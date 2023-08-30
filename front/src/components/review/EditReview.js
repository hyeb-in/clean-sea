import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { createBlobUrls, createFormData } from "../../util/imagUrl";
import validationReview from "../../util/validation.js/review";
import ReviewFormContainer from "./layout/ReviewFormContainer";
import useToast from "../../hooks/useToast";
import { UserStateContext } from "../../App";
import { serverUrl } from "../../Api";
import axios from "axios";
import useModal from "../../hooks/useModal";

// <ReviewTitle/>에서  '...' 버튼을 클릭 => id, review 값 modalVisible 컨텍스트에 전달
// => <ActionSelectorModal />에서 그 값을 받아서
// => 모달에 관한 컨텍스트만 변경 후 데이터를 현재 컴포넌트로 전달

// 다른 부분

const EditReview = ({ userInputValues, setUserInputValues }) => {
  const { user: loggedInUser } = useContext(UserStateContext);
  const { modalVisible } = useModal();
  // deps(modalVisible)이 변경될 때에만 review, setReviews를 다시 가져온다
  // 무슨 차이인지 잘 모르겠음
  // const { review, setReviews } = useMemo(
  //   () => modalVisible?.data || {},
  //   [modalVisible]
  // );
  // const { showToastPopup } = useToast();
  // const [preview, setPreview] = useState(null);
  // const formDataFileRef = useRef(null);

  // console.log(modalVisible);

  // const handleFileChange = (files) => {
  //   const formDataFiles = Array.from(files);
  //   formDataFileRef.current = formDataFiles;
  //   createBlobUrls(files, setPreview);
  // };

  // inputs 중 하나가 변경되어야만 콜백을 새로 실행시킨다
  const handleSubmit = useCallback(async () => {
    try {
      const validationError = validationReview(loggedInUser, userInputValues);

      if (validationError) {
        // showToastPopup(validationError.message, validationError.status);
        // return;
      }
      // const formData = createFormData(formDataFileRef, userInputValues);
      // const res = await axios.put(
      //   `${serverUrl}reviews/${review._id}`,
      //   formData
      // );
      // if (!res.data) {
      //   throw new Error("데이터를 불러오지 못했습니다");
      // }
      // setReviews((current) => [res.data, ...current]);
      // setUserInputValues({ title: "", content: "" });
      // closeModal();
      // [x] 토스트
      // 알림창: loading ->  onError, onSuccess
      // 작성중 close -> 경고창
    } catch (error) {
      console.log(error);
    }
  }, [
    loggedInUser,
    // showToastPopup,
    userInputValues,
    setUserInputValues,
    // setReviews,
    // review._id,
  ]);

  return (
    <ReviewFormContainer
      headerTitle="수정하기"
      userInputValues={userInputValues}
      setUserInputValues={setUserInputValues}
      // handleFileChange={handleFileChange}
      handleSubmit={handleSubmit}
      // preview={preview}
      // setPreview={setPreview}
    />
  );
};

export default EditReview;
