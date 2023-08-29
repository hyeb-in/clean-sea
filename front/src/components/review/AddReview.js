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
import useToast from "../../hooks/useToast";
import { TOAST_POPUP_STATUS } from "../../constants";
import ToastWrapper from "../common/popup/ToastWrapper";
import { serverUrl } from "../../Api";
import ModalBodyWrapper from "../common/layout/ModalBodyWrapper";
import CarouselWrapper from "../common/Carousel";
import { FileUploader } from "react-drag-drop-files";
import ReviewFormBody from "./ReviewFormBody";

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
  const {
    modalVisible,
    // showServerErrorModal,
    // showSuccessMsgModal,
    showDeleteConfirmModal,
    closeModal,
  } = useModal();

  const [preview, setPreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(RESULT_ENUM.NOT_YET);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const formDataFileRef = useRef(null);

  const {
    showToast,
    showToastPopup,
    toastMessage,
    setShowToast,
    toastStatus,
    toastPosition,
  } = useToast();

  const isPosting = uploadStatus === RESULT_ENUM.UPLOADING;
  const isFailed = uploadStatus === RESULT_ENUM.FAIL;
  const isSuccessful = uploadStatus === RESULT_ENUM.SUCCESS;
  const isFetched = isFailed || isSuccessful;

  const handleFileChange = (files) => {
    const blobUrls = [];

    const formDataFiles = Array.from(files);
    formDataFileRef.current = formDataFiles;
    // setUploadStatus(RESULT_ENUM.UPLOADING);

    // url blob
    formDataFiles.forEach((file) => {
      const blob = new Blob([file], { type: file.type });
      const url = URL.createObjectURL(blob);
      blobUrls.push(url);
    });
    setPreview(blobUrls);
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
        return showToastPopup(
          "제목과 내용은 4글자 이상 작성해주세요",
          TOAST_POPUP_STATUS.alert
        );
      }
      if (userInputValues.content.length > 300) {
        return showToastPopup("내용이 너무 깁니다", TOAST_POPUP_STATUS.alert);
      }
      console.log(formDataFileRef.current);
      const formDataFiles = Array.from(formDataFileRef.current);

      const formData = new FormData();

      formData.append("uploadFile", formDataFiles);
      if (formDataFiles && formDataFiles.length > 0) {
        for (let i = 0; i < formDataFiles.length; i++) {
          formData.append("uploadFile[]", formDataFiles[i]);
        }
        formData.append("title", userInputValues.title);
        formData.append("content", userInputValues.content);
      }

      console.log(formData.getAll("uploadFile[]"));
      console.log(formData.getAll("title"));
      console.log(formData.getAll("content"));

      setUploadStatus(RESULT_ENUM.UPLOADING);

      const res = await axios.post(`${serverUrl}reviews/register`, formData);
      if (!res.data) {
        setUploadStatus(RESULT_ENUM.FAIL);
        throw new Error("데이터를 불러오지 못했습니다");
      }

      setReviews((current) => [res.data, ...current]);
      setUploadStatus(RESULT_ENUM.SUCCESS);
      setUserInputValues({ title: "", content: "" });
      closeModal();
    } catch (error) {
      console.log(error);
      setUploadStatus(RESULT_ENUM.FAIL);
      //       setShowConfirmModal(true);
    }
  }, [
    loggedInUser,
    userInputValues,
    showToastPopup,
    setReviews,
    setUserInputValues,
    closeModal,
  ]);

  useEffect(() => {
    // 모달이 닫힐 때 메모리에 저장된 Blob URL 삭제
    if (!modalVisible?.isVisible && preview?.length > 0) {
      return () => {
        preview?.forEach((url) => URL.revokeObjectURL(url));
      };
    }
  }, [preview, modalVisible]);

  return (
    <>
      {/* 클라이언트 단에서 오류 처리 */}
      {showToast && (
        <ToastWrapper
          setShowToast={setShowToast}
          text={toastMessage}
          status={toastStatus}
          position={toastPosition}
        />
      )}
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
            setShowConfirmModal(true);
          } else {
            closeModal();
            setUserInputValues({ title: "", content: "" }); // 입력창 비워주기
          }
        }}
      >
        <ModalBodyWrapper>
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
            <Button
              onClick={handleSubmit}
              className="addreview__btn"
              variant="outline-primary"
            >
              확인
            </Button>
          </Form>
        </ModalBodyWrapper>
      </Modal>
    </>
  );
};

export default AddReviewForm;
