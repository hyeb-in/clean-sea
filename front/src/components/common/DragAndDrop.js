import { faImages } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Container, Row } from "react-bootstrap";

const DragAndDrop = () => {
  return (
    <Container fluid style={{ height: "300px", padding: "60px 0" }}>
      <Row
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyItems: "center",
          height: "100%",
        }}
      >
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

export default DragAndDrop;
