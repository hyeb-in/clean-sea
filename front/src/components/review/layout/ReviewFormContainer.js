import { Button, Form, Modal } from "react-bootstrap";
import ModalBodyWrapper from "../../common/layout/ModalBodyWrapper";
import CarouselWrapper from "../../common/Carousel";
import { FileUploader } from "react-drag-drop-files";
import ReviewFormBody from "./ReviewFormBody";
import useModal, { MODAL_TYPE } from "../../../hooks/useModal";
import { useEffect } from "react";
import { cleanUpBlobUrls } from "../../../util/imagUrl";
import useToast from "../../../hooks/useToast";

import ToastWrapper from "../../common/popup/ToastWrapper";

const ReviewFormContainer = ({
  headerTitle,
  userInputValues,
  setUserInputValues,
  handleFileChange,
  handleSubmit,
  preview,
  setPreview,
}) => {
  const { modalVisible, closeModal } = useModal();
  const { showToast, toastPosition, toastText, toastStatus } = useToast();

  // 저장됐던 이미지가 있다면 불러와서 보여준다
  // 삭제 가능
  // 추가 가능
  // 들어온 파일 => 다시 formData로 변환 => post

  // 중복
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
      {/* 클라이언트 단에서 오류 처리 */}
      {showToast && (
        <ToastWrapper
          text={toastText}
          toastStatus={toastStatus}
          position={toastPosition}
        />
      )}
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

export default ReviewFormContainer;
