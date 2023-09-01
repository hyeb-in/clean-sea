import React, { useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import SearchBar from "../components/search/SearchBar";
import BeachDetails from '../components/search/BeachDetails';

const Search = () => {
  const [selectedBeach, setSelectedBeach] = useState(null);

  return (
    <Container fluid style={{ height: "100%" }}>
      <Row className="justify-content-center">
        <Col xs={2} className="px-0">
          <SearchBar setSelectedBeach={setSelectedBeach} />
        </Col>
        <Col xs={10} className="px-0">
          {selectedBeach ? (
            <BeachDetails beachData={selectedBeach} />
          ) : (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
              <h1>선택된 지역이 없습니다</h1>
            </Container>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
