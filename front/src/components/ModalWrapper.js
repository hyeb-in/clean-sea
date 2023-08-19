import { Modal } from "react-bootstrap";

// to do: 뭔가 이상함.. 다시 생각해보기
const ModalWrapper = ({ children, show, onHide }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="true"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {children}
    </Modal>
  );
};

export default ModalWrapper;
