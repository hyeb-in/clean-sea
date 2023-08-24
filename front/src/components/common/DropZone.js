import { faImages } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Container, Row } from "react-bootstrap";

const DropZone = () => {
  return (
    <Container className="flex-d flex-column">
      <Row className="h-100 flex-column">
        <Col className="d-flex justify-content-center align-items-center">
          <FontAwesomeIcon icon={faImages} size="3x" />
        </Col>
        <Col className="py-4">사진을 여기에 끌어다 놓으세요</Col>
        <Col className="d-flex justify-content-center align-items-center">
          <Button>컴퓨터에서 선택</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default DropZone;
