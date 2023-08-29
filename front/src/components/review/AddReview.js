import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { UserStateContext } from "../../App";
import axios from "axios";
import useModal, { MODAL_TYPE } from "../../hooks/useModal";
import { TOAST_POPUP_STATUS } from "../../constants";
import { serverUrl } from "../../Api";
import ModalBodyWrapper from "../common/layout/ModalBodyWrapper";
import CarouselWrapper from "../common/Carousel";
import { FileUploader } from "react-drag-drop-files";
import ReviewFormBody from "./ReviewFormBody";
import {
  cleanUpBlobUrls,
  createBlobUrls,
  createFormData,
} from "../../util/imagUrl";

export const RESULT_ENUM = {
  NOT_YET: "작성중",
  UPLOADING: "업로드 중",
  SUCCESS: "성공",
  FAIL: "실패",
};

// to do
// 1. 프리뷰 이미지 삭제 -> uploadFile에서도 삭제
// 2. 안쓰는 코드 정리
// 3. 토스트 팝업 알림

const AddReviewForm = ({ setReviews, userInputValues, setUserInputValues }) => {
  const { user: loggedInUser } = useContext(UserStateContext);
  const { modalVisible, closeModal } = useModal();

  const [preview, setPreview] = useState(null);
  const formDataFileRef = useRef(null);

  const handleFileChange = (files) => {
    const formDataFiles = Array.from(files);
    formDataFileRef.current = formDataFiles;
    // setUploadStatus(RESULT_ENUM.UPLOADING);
    createBlobUrls(files, setPreview);
  };

  const handleSubmit = useCallback(async () => {
    // console.log(formDataRef.current.getAll("uploadFile[]")); // formData가 비어있는 이유
    try {
      if (!loggedInUser) throw new Error("로그인 한 유저만 사용할 수 있습니다");
      // edit review랑 중복임
      if (
        userInputValues.title.length < 4 ||
        userInputValues.content.length < 4
      ) {
        // "제목과 내용은 4글자 이상 작성해주세요",
      }
      if (userInputValues.content.length > 300) {
        return alert("내용이 너무 깁니다", TOAST_POPUP_STATUS.alert);
      }

      const formData = createFormData(formDataFileRef, userInputValues);
      const res = await axios.post(`${serverUrl}reviews/register`, formData);
      if (!res.data) {
        throw new Error("데이터를 불러오지 못했습니다");
      }

      setReviews((current) => [res.data, ...current]);
      setUserInputValues({ title: "", content: "" });
      closeModal();
    } catch (error) {
      console.log(error);
    }
  }, [
    loggedInUser,
    closeModal,
    setReviews,
    setUserInputValues,
    userInputValues,
  ]);

  useEffect(() => {
    // 모달이 닫힐 때 메모리에 저장된 Blob URL 삭제
    if (!modalVisible?.isVisible && preview?.length > 0) {
      return () => {
        cleanUpBlobUrls(preview);
      };
    }
  }, [preview, modalVisible]);

  return (
    <>
      {/* 리뷰 입력 모달창: 유저가 리뷰 업로드하기 버튼이나 리뷰 수정 버튼을 누르면 팝업 */}
      <Modal
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }} // 이벤트 전파 방지용 >> 없을 시 모달창 클릭할 때도 모달창이 사라지는 현상 방지
        backdrop="static"
        centered
        keyboard={false}
        dialogClassName="addreview__modalWrapper" // 기본 부트스트랩 스타일 제거(max-width)
        className="px-5"
        show={modalVisible.type === MODAL_TYPE.addReview}
        onHide={() => {
          // title과 content가 비어있다면(날아갈 데이터가 없다면) 유저에게 묻지 않고 모달창 제거
          if (userInputValues.title !== "" || userInputValues.content !== "") {
            // 물어보기 !!confirm modal
          } else {
            closeModal();
            setUserInputValues({ title: "", content: "" }); // 입력창 비워주기
          }
        }}
      >
        <ModalBodyWrapper
          title="작성하기"
          onHide={closeModal}
          content={
            <Button
              onClick={handleSubmit}
              className="addreview__btn"
              variant="outline-primary"
            >
              확인
            </Button>
          }
        >
          <Form className="addReview__form">
            {preview && preview.length > 0 ? (
              <CarouselWrapper preview={preview} setPreview={setPreview} />
            ) : (
              <FileUploader
                handleChange={(files) => handleFileChange(files)}
                name="file"
                types={["png", "jpeg"]}
                maxSize={10}
                multiple={true}
                onSizeError={() => alert("용랑이 너무 큽니다")}
              />
            )}
            <ReviewFormBody
              userInputValues={userInputValues}
              setUserInputValues={setUserInputValues}
            />
          </Form>
        </ModalBodyWrapper>
      </Modal>
    </>
  );
};

export default AddReviewForm;
