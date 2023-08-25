import { Modal } from "react-bootstrap";

const ModalBodyWrapper = ({ children, title, onHide, content }) => {
  return (
    <>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title size="ms">{title}</Modal.Title>
      </Modal.Header>
      {content && (
        <Modal.Body className="d-flex justify-content-center align-items-center ">
          {content}
        </Modal.Body>
      )}
      <Modal.Footer>{children}</Modal.Footer>
    </>
  );
};
export default ModalBodyWrapper;
