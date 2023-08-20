import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SearchBar from "../components/common/SearchBar";
import Map from "../components/common/Map";

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
