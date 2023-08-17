import { Modal } from "react-bootstrap";

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
