import { Toast, ToastContainer } from "react-bootstrap";

const ToastWrapper = ({ text, onClose, bg, position }) => {
  return (
    <ToastContainer position={position}>
      <Toast bg={bg} animation={true} delay={2000} autohide onClose={onClose}>
        {/* <Toast.Header closeButton={false} className="justify-content-end" /> */}
        <Toast.Body>{text}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastWrapper;
