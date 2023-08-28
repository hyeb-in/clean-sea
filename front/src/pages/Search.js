import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Map from "../components/common/Map";
import SearchBar from "../components/common/layout/SearchBar";

const Search = () => {
  return (
    <Container fluid style={{ height: "100%" }}>
      <Row>
        <Col xs={4} className="px-0">
          <SearchBar />
        </Col>
        <Col xs={8} className="px-0">
          {/* <Map /> */}
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
