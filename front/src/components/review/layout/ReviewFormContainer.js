import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import ModalBodyWrapper from "../../common/layout/ModalBodyWrapper";
import CarouselWrapper from "../../common/Carousel";
import { FileUploader } from "react-drag-drop-files";
import ReviewFormBody from "./ReviewFormBody";
import useModal, { MODAL_TYPE } from "../../../hooks/useModal";
import { useEffect } from "react";
import { cleanUpBlobUrls } from "../../../util/imagUrl";
import ConfirmDeleteModal from "../../common/popup/ConfirmDeleteModal";

const ReviewFormContainer = ({
  headerTitle,
  userInputValues,
  setUserInputValues,
  handleFileChange,
  handleSubmit,
  preview,
  setPreview,
  editedReview,
  setEditedReview,
}) => {
  const { modalVisible, closeModal } = useModal();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const currentReviewFiles = modalVisible?.data?.review?.uploadFile;

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
      <Modal
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }} // 이벤트 전파 방지용 >> 없을 시 모달창 클릭할 때도 모달창이 사라지는 현상 방지
        // backdrop="static"
        centered
        keyboard={false}
        dialogClassName="addreview__modalWrapper" // 기본 부트스트랩 스타일 제거(max-width)
        className="px-5"
        show={
          modalVisible.type === MODAL_TYPE.addReview ||
          modalVisible.type === MODAL_TYPE.editReview
        }
        onHide={() => {
          // title과 content가 비어있다면(날아갈 데이터가 없다면) 유저에게 묻지 않고 모달창 제거
          if (userInputValues.title !== "" || userInputValues.content !== "") {
            // 물어보기 !!confirm modal
            setShowConfirmModal(true);
          } else {
            closeModal();
            setUserInputValues({ title: "", content: "" }); // 입력창 비워주기
          }
        }}
      >
        {showConfirmModal && (
          <ConfirmDeleteModal
            show={showConfirmModal}
            closeModal={() => setShowConfirmModal(false)}
            closeReviewModal={closeModal}
          />
        )}
        <ModalBodyWrapper
          title={headerTitle}
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
          <Form
            className="addReview__form"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            {currentReviewFiles || (preview && preview?.length > 0) ? (
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
              editedReview={editedReview}
              setEditedReview={setEditedReview}
              userInputValues={userInputValues}
              setUserInputValues={setUserInputValues}
            />
          </Form>
        </ModalBodyWrapper>
      </Modal>
    </>
  );
};

export default ReviewFormContainer;
