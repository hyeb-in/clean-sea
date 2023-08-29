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
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const SearchBar = () => {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [beachData, setBeachData] = useState([]);

  const handleRegionSelect = (region) => {
    setSelectedRegion(region);
    // 이곳에서 선택한 지역에 대한 해수욕장 데이터를 가져오는 로직을 구현하고 beachData 상태를 업데이트합니다.
  };

  const handleSearchTerm = async (e) => {
    e.preventDefault();
    try {
      const results = await geocodeByAddress(searchTerm);
      const latLng = await getLatLng(results[0]);
      // 이곳에서 latLng를 기반으로 해수욕장 데이터를 가져오는 로직을 구현하고 beachData 상태를 업데이트합니다.
    } catch (error) {
      console.error("Error fetching beach data:", error);
    }
  };

  return (
    <Container fluid className="py-4 flex-column-center-center">
      {/* 드롭다운 - 지역 선택 */}
      <Row>
        <Dropdown>
          <DropdownButton
            id="dropdown-basic-button"
            title={selectedRegion ? selectedRegion : "지역을 선택해주세요"}
            onSelect={handleRegionSelect}
          >
            {["강원", "경남", "경북", "인천", "울산", "부산", "전남", "전북", "제주", "충남"].map(
              (region) => (
                <Dropdown.Item key={region} eventKey={region}>
                  {region}
                </Dropdown.Item>
              )
            )}
          </DropdownButton>
        </Dropdown>
      </Row>
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
      <Row>
        {beachData.map((beach, index) => (
          <ListGroup key={beach.id} className="my-2">
            <ListGroup.Item>{`${index + 1}위 - ${beach.name} 해수욕장`}</ListGroup.Item>
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
      </Row>
    </Container>
  );
};

export default SearchBar;
