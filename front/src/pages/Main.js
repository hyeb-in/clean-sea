import React from "react";
import { Container, Row, Col } from "react-bootstrap";
// import SearchBar from "../components/SearchBar";

const Main = () => {
  return (
    <Container fluid style={{ height: "100vh" }}>
      <Row style={{ height: "100%" }}>
        <Col className="px-0">
          {/* <SearchBar /> */}
        </Col>
        <Col className="px-0">
          <div>main container</div>
        </Col>
      </Row>
    </Container>
  );
};

export default Main;
