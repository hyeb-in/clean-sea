import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row } from "react-bootstrap";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Container
      className="d-flex flex-column justify-content-center min-h-100
      align-items-center"
    >
      <Row className="fontSize: 4rem">
        <h2>404</h2>
      </Row>
      <Row>
        <span>페이지를 찾을 수 없습니다</span>
      </Row>
      <Row className="mt-5">
        <Button onClick={() => navigate(-1)}>홈으로 돌아가기</Button>
      </Row>
    </Container>
  );
};

export default PageNotFound;
