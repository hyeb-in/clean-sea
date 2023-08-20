import Button from "react-bootstrap/Button";
import ModalBodyWrapper from "./ModalBodyWrapper";
import { Modal } from "react-bootstrap";

/**
 * @param 경고 팝업을 생성하는 리액트 컴포넌트
 */
const ConfirmModal = ({ show, setShowConfirmModal, closeReviewFormModal }) => {
  return (
    <Modal
      show={show}
      keyboard={false}
      centered
      style={{
        // 가시성을 위해 모달창 바깥 화면 어둡게 조정
        // backdrop: 'static'일 경우 먼저 띄워진 모달은 영향받지 않기때문에 직접 css로 배경색을 바꿔준다
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      }}
      onHide={() => setShowConfirmModal(false)}
      onClick={(e) => e.stopPropagation()}
    >
      <ModalBodyWrapper
        title="게시글을 삭제하시겠어요?"
        content="지금 나가면 수정 내용이 저장되지 않습니다"
      >
        <Button
          variant="danger"
          onClick={() => {
            setShowConfirmModal(false);
            closeReviewFormModal();
          }}
        >
          삭제
        </Button>
        <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
          취소
        </Button>
      </ModalBodyWrapper>
    </Modal>
  );
};

export default ConfirmModal;
