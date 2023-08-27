import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { UserStateContext } from "../../App";
import ModalBodyWrapper from "../common/layout/ModalBodyWrapper";
import DragDropContainer from "../common/DragDropContainer";
import ReviewFormBody from "./ReviewFormBody";
import { RESULT_ENUM } from "./AddReview";
import useModal, { MODAL_TYPE } from "../../hooks/useModal";
import * as Api from "../../Api";
import useToast from "../../hooks/useToast";
import ToastWrapper from "../common/popup/ToastWrapper";
import { TOAST_POPUP_STATUS } from "../../constants";
// add review랑 형태가 같음 -> 하나로 합쳐도 될 듯?

// <ReviewTitle/>에서  '...' 버튼을 클릭 => id, review 값 modalVisible 컨텍스트에 전달
// => <ActionSelectorModal />에서 그 값을 받아서
// => 모달에 관한 컨텍스트만 변경 후 데이터를 현재 컴포넌트로 전달

// to do: 불필요한 매개변수 지울 것
const EditReview = () => {
  const { user: loggedInUser } = useContext(UserStateContext);
  const { modalVisible, closeModal } = useModal();

  const { review, setReviews } = modalVisible.data;

  // 리뷰 title, content 초기값 설정을 위해 review 정보를 가져온다
  // <Review />에서 수정 버튼 클릭 할 때 review값을 modalVisible에 저장한다
  const [userInputValues, setUserInputValues] = useState({
    title: review?.title,
    content: review?.content,
  });

  const [files, setFiles] = useState(null);
  const { editStatus } = useState(false);
  const [preview, setPreview] = useState(null);
  const {
    showToast,
    showToastPopup,
    toastMessage,
    setShowToast,
    toastStatus,
    toastPosition,
  } = useToast();

  const reviewId = modalVisible.data.review._id;

  const isSuccessful = editStatus === RESULT_ENUM.SUCCESS;
  const isFailed = editStatus === RESULT_ENUM.FAIL;
  const isPosting = !editStatus === RESULT_ENUM.NOT_YET;
  const isFetched = !isPosting && (isSuccessful || isFailed);

  const onSubmit = async (e) => {
    // 유효성 검사
    e.preventDefault();
    try {
      if (
        userInputValues.title.length < 4 ||
        userInputValues.content.length < 4
      ) {
        showToastPopup(
          "제목과 내용은 4글자 이상 작성해주세요",
          TOAST_POPUP_STATUS.alert
        );
      }
      if (userInputValues.content.length > 300) {
        showToastPopup("내용이 너무 깁니다", TOAST_POPUP_STATUS.alert);
      }
      if (!review && reviewId) {
        showToastPopup(
          "게시물 정보를 찾을 수 없습니다",
          TOAST_POPUP_STATUS.error
        );
      }
      if (!loggedInUser) {
        showToastPopup(
          "로그인 한 유저만 수정 가능합니다",
          TOAST_POPUP_STATUS.alert
        );
      }

      const response = await Api.put(`reviews/${reviewId}`, userInputValues);
      if (!response.ok) {
        showToastPopup("데이터를 불러올 수 없습니다", TOAST_POPUP_STATUS.error);
      }
      showToastPopup("요청 성공!", TOAST_POPUP_STATUS.success);
      setReviews((current) => {
        const currentReviews = [...current];
        return currentReviews.map((item) =>
          item._id === review._id ? { ...review, ...userInputValues } : item
        );
      });
      closeModal();
      setUserInputValues({ title: "", content: "" });
    } catch (error) {
      showToastPopup("정보를 불러올 수 없습니다", TOAST_POPUP_STATUS.error);
      closeModal();
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
      <Modal
        keyboard={false}
        dialogClassName="addreview__modalWrapper"
        className="px-5"
        show={modalVisible.type === MODAL_TYPE.editReview}
        onHide={closeModal}
        centered
        backdrop="static"
      >
        <ModalBodyWrapper
          title="게시글 수정하기"
          content={
            <div className="addReview__form flexible-col">
              <DragDropContainer
                preview={preview}
                setPreview={setPreview}
                review={review}
                blobURLsExpired={isFetched}
                files={files}
                setFiles={setFiles}
              />
              <ReviewFormBody
                review={review}
                userInputValues={userInputValues}
                setUserInputValues={setUserInputValues}
              />
            </div>
          }
        >
          {
            <Form onSubmit={onSubmit} className="addReview__form">
              <Button
                className="addreview__btn"
                variant="outline-primary"
                type="submit"
                onClick={onSubmit}
              >
                확인
              </Button>
            </Form>
          }
        </ModalBodyWrapper>
      </Modal>
    </>
  );
};

export default EditReview;
