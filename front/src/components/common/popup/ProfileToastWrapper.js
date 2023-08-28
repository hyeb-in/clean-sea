import { Col, Container, Row, Toast, ToastContainer } from "react-bootstrap";

const ProfileToastWrapper = ({ onClose, text, status, position }) => {
  return (
    <ToastContainer>
      <Toast
        className="toast-popup"
        animation={true}
        onClose={() => onClose()}
        position={position}
        autohide
        delay={2000}
      >
        <Container>
          <Row>
            <Col
              xs="auto"
              className="toast-popup__icon flex-row-center-center"
              style={{
                backgroundColor: status?.bgColor,
                color: status?.color,
              }}
            >
              {status?.icon}
            </Col>
            <Col className="m-4">
              <Row className="toast-popup__title flex-row-center-center">
                {status?.title}
              </Row>
              <Row className="flex-row-center-center">{text}</Row>
            </Col>
          </Row>
        </Container>
      </Toast>
    </ToastContainer>
  );
};

export default ProfileToastWrapper;
