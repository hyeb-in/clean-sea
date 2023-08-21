import React, { useState } from "react";
import {
  Container,
  Col,
  Dropdown,
  Row,
  ListGroup,
  Form,
  DropdownButton,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-regular-svg-icons";
// import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const beachData = [
  {
    id: 0,
    name: "갈음이",
    address: "충남",
    // latitude: ,
    // logitude:,
    goodnessFit: true,
    score: 1,
    ente: 0,
    esch: 0,
  },
  {
    id: 1,
    name: "구례포",
    address: "충남",
    // latitude: ,
    // logitude:,
    goodnessFit: true,
    score: 1,
    ente: 0,
    esch: 0,
  },
  {
    id: 2,
    name: "기지포",
    address: "충남",
    // latitude: ,
    // logitude:,
    goodnessFit: true,
    score: 1,
    ente: 0,
    esch: 0,
  },
];

const SearchBar = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    // DB에서 데이터 가져오는 로직을 구현하고, 가져온 데이터를 상태로 업데이트
  };

  const handleSearchTerm = (e) => {
    e.preventDefault();
    // 검색 쿼리 날리기
  };

  return (
    <Container
      fluid
      className="py-4"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 드롭다운 - 지역 선택 */}
      <Dropdown>
        <DropdownButton
          id="dropdown-basic-button"
          title={selectedItem ? selectedItem : "지역을 선택해주세요"}
          onSelect={handleItemSelect}
        >
          {/* 메뉴는 DB에서 받아온다 ? */}
          {/* 로컬에 저장한다 ?? */}
          <Dropdown.Item eventKey="강원">강원</Dropdown.Item>
          <Dropdown.Item eventKey="부산">부산</Dropdown.Item>
          <Dropdown.Item eventKey="충남">충남</Dropdown.Item>
        </DropdownButton>
      </Dropdown>

      {/* 지역 필터링 -> 해수욕장 검색 */}
      <Row className="mb-5">
        <Form onSubmit={handleSearchTerm}>
          <Form.Control
            type="text"
            placeholder="해수욕장 이름으로 검색하기"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form>
      </Row>

      {/* 선택된 지역에 대한 데이터 리스트 */}
      {beachData &&
        beachData.map((beach, index) => (
          <ListGroup key={beach.id} className="my-2" style={{ width: "14rem" }}>
            <ListGroup.Item>{`${index + 1}위 - ${
              beach.name
            } 해수욕장`}</ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <FontAwesomeIcon icon={faThumbsUp} /> 몇 개
                </Col>
                <Col>
                  <FontAwesomeIcon icon={faThumbsDown} /> 몇 개
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        ))}
    </Container>
  );
};

export default SearchBar;
