import { Toast, ToastContainer } from "react-bootstrap";

const ToastWrapper = ({ text, onClose }) => {
  return (
    <ToastContainer position="middle-center">
      <Toast onClose={onClose} bg="d">
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>{text}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastWrapper;
