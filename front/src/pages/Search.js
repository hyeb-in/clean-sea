import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import SearchBar from "../components/SearchBar";
import Map from "../components/Map";

const Search = () => {
  return (
    <Container fluid style={{ height: "100vh" }}>
      <Row>
        <Col xs={4} className="px-0">
          <SearchBar />
        </Col>
        <Col xs={8} className="px-0">
          <Map />
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
