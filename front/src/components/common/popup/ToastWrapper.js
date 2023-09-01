import { Col, Container, Row, Toast, ToastContainer } from "react-bootstrap";

/**
 * 토스트 팝업 띄우는 컴포넌트
 * /src/constants.js 파일에서 TOAST_POPUP_STATUS import해서 사용
 * @param {text} text 토스트 팝업에 표시할 메시지
 * @param {'top-start' | 'top-center' | 'top-end' | 'middle-start' | 'middle-center' | 'middle-end' | 'bottom-start' | 'bottom-center' | 'bottom-end'} position 토스트 위치. 부트스트랩 class 적용
 * @param {'error' | 'alert' | 'success' | 'info'} status 토스트 팝업의 상태 (error, alert, success, info)
 *  사용 예시
 * @example
 * <ToastWrapper text={text} status={TOAST_POPUP_STATUS.alert} position />
 */

const ToastWrapper = ({
  text,
  showToast,
  toastStatus,
  position = "top-center",
}) => {
  return (
    <ToastContainer>
      <Toast
        className="toast-popup"
        animation={true}
        position={position}
        autohide={true}
        delay={2000}
        show={showToast}
      >
        <Container>
          <Row>
            <Col
              xs="auto"
              className="toast-popup__icon flex-row-center-center"
              style={{
                backgroundColor: toastStatus?.bgColor,
                color: toastStatus?.color,
              }}
            >
              {toastStatus?.icon}
            </Col>
            <Col className="m-4">
              <Row className="toast-popup__title flex-row-center-center">
                {toastStatus?.title}
              </Row>
              <Row className="flex-row-center-center">{text}</Row>
            </Col>
          </Row>
        </Container>
      </Toast>
    </ToastContainer>
  );
};

export default ToastWrapper;
