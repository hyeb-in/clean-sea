import { Toast, ToastContainer } from "react-bootstrap";

const ToastWrapper = ({ text, onClose, bg }) => {
  return (
    <ToastContainer position="middle-center">
      <Toast bg={bg} animation={true} delay={2000} autohide onClose={onClose}>
        <Toast.Header closeButton className="justify-content-end" />
        <Toast.Body>{text}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastWrapper;
