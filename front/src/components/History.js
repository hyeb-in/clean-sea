import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const History = () => {
  return (
    <>
      <Container>
        <Row className="mt-4">
          <Col>
            <h3 className="mb-3">방문 로그</h3>
            <Row>
              <h5>해수욕장명</h5>
              <p>방문일자(연/월/일)</p>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default History;
