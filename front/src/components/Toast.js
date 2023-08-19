import { Toast, ToastContainer } from "react-bootstrap";

const ToastWrapper = ({ text, onClose }) => {
  return (
    <ToastContainer position="middle-center">
      <Toast onClose={onClose}>
        <Toast.Header closeButton className="justify-content-end" />
        <Toast.Body>{text}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastWrapper;
