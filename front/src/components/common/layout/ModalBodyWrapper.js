import { Modal } from "react-bootstrap";

const ModalBodyWrapper = ({ children, title, onHide, content }) => {
  return (
    <>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title size="ms">{title}</Modal.Title>
      </Modal.Header>
      {children && (
        <Modal.Body className="d-flex justify-content-center align-items-center review-modal-body">
          {children}
        </Modal.Body>
      )}
      <Modal.Footer>{content}</Modal.Footer>
    </>
  );
};
export default ModalBodyWrapper;
