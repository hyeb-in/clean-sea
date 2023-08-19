import { Modal } from "react-bootstrap";

const ModalBodyWrapper = ({ children, text, onHide }) => {
  return (
    <>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title size="ms">{text}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center align-items-center">
        {children}
      </Modal.Body>
    </>
  );
};
export default ModalBodyWrapper;
