import { Modal, Row } from "react-bootstrap";

const ModalBodyWrapper = ({ children, title, onHide, content }) => {
  return (
    <>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title size="ms">{title}</Modal.Title>
      </Modal.Header>
      {content && (
        <Modal.Body className="d-flex justify-content-center align-items-center">
          <Row>{content}</Row>
        </Modal.Body>
      )}
      <Modal.Footer>{children}</Modal.Footer>
    </>
  );
};
export default ModalBodyWrapper;
