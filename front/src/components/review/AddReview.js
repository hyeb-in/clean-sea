import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { UserStateContext } from "../../App";
import SpinnerWrapper from "../common/indicators/Spinner";
import ModalBodyWrapper from "../common/layout/ModalBodyWrapper";
import ReviewFormBody from "./ReviewFormBody";
import DragDropContainer from "../common/DragDropContainer";
import axios from "axios";
import useModal, { MODAL_TYPE } from "../../hooks/useModal";
import useToast from "../../hooks/useToast";
import { TOAST_POPUP_STATUS } from "../../constants";
import ToastWrapper from "../common/popup/ToastWrapper";

export const RESULT_ENUM = {
  NOT_YET: "작성중",
  UPLOADING: "업로드 중",
  SUCCESS: "성공",
  FAIL: "실패",
};

const AddReview = ({
  reviews,
  setReviews,
  userInputValues,
  setUserInputValues,
}) => {
  console.log(userInputValues);
  const { user: loggedInUser } = useContext(UserStateContext);
  const { modalVisible, setModalVisible, closeModal } = useModal();
  const [preview, setPreview] = useState(null);
  const [formDataFiles, setFormDataFiles] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(RESULT_ENUM.NOT_YET);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const isPosting = !uploadStatus === RESULT_ENUM.NOT_YET;
  const isFetched =
    uploadStatus === RESULT_ENUM.SUCCESS || uploadStatus === RESULT_ENUM.FAIL;
  const {
    showToast,
    showToastPopup,
    toastMessage,
    setShowToast,
    toastStatus,
    toastPosition,
  } = useToast();
  // 게시글 업로드
  const addReview = async (e) => {
    e.preventDefault();
    try {
      if (!loggedInUser) throw new Error("로그인 한 유저만 사용할 수 있습니다");
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
      let formData = new FormData();
      // FormData 생성자의 첫 번째 매개변수로는 HTMLFormElement 객체가 필요함
      // FileList는 HTMLFormElement가 아니기때문에 일단 매개변수 없이 생성 후 append로 추가한다
      formData.append("uploadFile", formDataFiles);
      formData.append("title", userInputValues.title);
      formData.append("content", userInputValues.content);
      setUploadStatus(RESULT_ENUM.UPLOADING);
      console.log(formData, "formData 형식");
      console.log(formDataFiles, "변경 전 형식");

      const res = await axios.post(
        "http://localhost:5001/reviews/register",
        formData
      );

      if (!res.statusCode >= 400) {
        throw new Error("실패"); // 인터셉터에서 잡힘
      }
      setReviews((current) => [res.data, ...current]);
      setUploadStatus(RESULT_ENUM.SUCCESS);
    } catch (error) {
      console.error(error.response?.data.error); // 메세지 뜸 / 에러날 때도 있음
      console.log(error.response?.status);
    }
  };

  return (
    <>
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
        centered
        dialogClassName="addreview__modalWrapper" // 기본 부트스트랩 스타일 제거(max-width)
        className="px-5"
        show={modalVisible.type === MODAL_TYPE.addReview}
        onHide={() => {
          // 모달창 제거
          // title과 content가 비어있다면(날아갈 데이터가 없다면) 유저에게 묻지 않고 모달창 제거
          if (userInputValues.title !== "" || userInputValues.content !== "") {
            // 내용이 있다면 다시 한 번 확인하는 모달창에 표시한다
            setShowConfirmModal(true);
          }
        }}
        onClick={(e) => e.stopPropagation()}
        // 이벤트 전파 방지용 >> 없을 시 모달창 클릭할 때도 모달창이 사라지는 현상 방지
        // to do: space bar입력시 모달창 사라짐 버그 (브라우저에 따라서 다른 듯? 확인하기)
      >
        {/* 모달창 내부: 입력 받는 공간 */}
        <ModalBodyWrapper
          title="글 작성하기"
          content={
            <div className="addReview__form flexible-col">
              <DragDropContainer
                preview={preview}
                setPreview={setPreview}
                // review={review}
                // setReview={setReview}
                blobURLsExpired={isFetched}
                setFormDataFiles={setFormDataFiles}
              />
              {/* 아래 Form 내부로 들어가는 body */}
              <ReviewFormBody
                userInputValues={userInputValues}
                setUserInputValues={setUserInputValues}
              />
            </div>
          }
        >
          {/* 미디어 쿼리 적용(flexible-col class): 작은 화면에선 flex column, 큰 화면에선 row로 보여준다 */}
          {/* to do: 폼... 위치...여기가 아닐텐데...? */}
          <Form onSubmit={addReview} className="addReview__form">
            <Button
              className="addreview__btn"
              variant="outline-primary"
              type="submit"
              onClick={addReview}
            >
              확인
            </Button>
          </Form>
        </ModalBodyWrapper>
        {/* 아래의 로직은 여기 있는 게 아니라 부모로 나가고, 전역적으로 사용되어야 할 것 같음 */}
        {/* 리뷰 내용 입력 모달창 내부 */}
        {/* submit 후 업로드 중 -> 1. loading indicator */}
        {isPosting && (
          <ModalBodyWrapper
            title="게시물을 업로드하는 중입니다"
            content={<SpinnerWrapper />}
          />
        )}
        {/* submit 후 결과 -> 2. success or fail */}
        {/* to do: 버그수정. 공유되었습니다 모달창 뜬 후에 x 버튼이 아니라 바깥 창을 클릭하면 '게시글을 삭제하시겠어요?' 팝업이 뜸 */}
        {/* {isFetched && (
          <ModalBodyWrapper
            title={
              RESULT_ENUM.SUCCESS
                ? "게시물이 공유되었습니다"
                : "게시물을 업로드하지 못했습니다"
            }
            // onHide={closeReviewFormModal}
            content={
              <FontAwesomeIcon
                icon={RESULT_ENUM.SUCCESS ? faCircleCheck : faBomb}
                className="indicator-success"
              />
            }
          />
        )} */}
      </Modal>
    </>
  );
};

export default AddReview;
