import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row } from "react-bootstrap";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Container
      className="d-flex flex-column justify-content-center
      align-items-center"
      style={{ height: "100vh" }}
    >
      <Row style={{ fontSize: "3rem" }}>404</Row>
      <Row>페이지를 찾을 수 없습니다</Row>
      <Row className="mt-5">
        <Button onClick={() => navigate(-1)}>홈으로 돌아가기</Button>
      </Row>
    </Container>
  );
};

export default PageNotFound;
