import React, { useState } from "react";
import { Container, Col, Dropdown, Row, ListGroup } from "react-bootstrap";
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
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemInfo, setItemInfo] = useState(null);

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    // DB에서 데이터 가져오는 로직을 구현하고, 가져온 데이터를 상태로 업데이트
    // setItemInfo(가져온_데이터);
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
      {/* 검색창 */}
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          지역을 선택해주세요
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {/* 메뉴는 DB에서 받아온다 ? */}
          {/* 로컬에 저장한다 ?? */}
          <Dropdown.Item onSelect={() => handleItemSelect("지역이름")}>
            강원
          </Dropdown.Item>
          <Dropdown.Item onSelect={() => handleItemSelect("지역이름")}>
            부산
          </Dropdown.Item>
          <Dropdown.Item onSelect={() => handleItemSelect("지역이름")}>
            충남
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {/* 선택된 지역에 대한 데이터 리스트 */}
      <Row className="mt-3">
        <h3>충남 지역</h3>
      </Row>
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
