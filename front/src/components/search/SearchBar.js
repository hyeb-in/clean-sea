import React, { useEffect, useState } from 'react';
import {
  Container,
  Col,
  Row,
  ListGroup, Button, ButtonGroup,
} from 'react-bootstrap';
import RegionDropdown from './RegionDropdown';
import './SearchBar.css';
import * as Api from '../../Api';

const SearchBar = ({ setSelectedBeach }) => {
  const [selectedItem, setSelectedItem] = useState("");
  const [beachData, setBeachData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const handleItemSelect = (item) => {
    console.log(item);
    setSelectedItem(item);
    setCurrentPage(1);
  };

  const handleBeachSelect = (beach) => {
    setSelectedBeach(beach);
  };

  useEffect(() => {
    if (selectedItem === null || selectedItem === "") {
      return;
    }

    Api.get(`beaches/beaches/2023/${selectedItem}`)
    .then(r => {
      setBeachData(r.data);
    });
  }, [selectedItem]);

  const totalPage = Math.ceil(beachData.length / itemsPerPage);

  const displayedData = beachData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getBackgroundColor = (rank) => {
    switch(rank) {
      case 1:
        return ["#007BFF", "#FFFFFF"]; // 파란색
      case 2:
        return ["#66AFFF", "#e8f0f8"]; // 약간 옅은 파란색
      case 3:
        return ["#B3D8FF", "#000000"]; // 더 옅은 파란색
      default:
        return ["", ""]; // 기본 배경색
    }
  };

  const getCircleColor = (goodnessFit) => {
    return goodnessFit ? 'green' : 'red';
  };

  return (
    <Container fluid className="mt-2">
      <Row className="justify-content-center">
        <Col>
          <RegionDropdown selectedItem={selectedItem} handleItemSelect={handleItemSelect} />
        </Col>
      </Row>
      <hr />
      <Row className="justify-content-center my-3">
        <Col md="auto">
          {beachData.length > 0 && (currentPage !== 1 || currentPage !== totalPage) && (
            <ButtonGroup>
              <Button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>&larr;</Button>
              <Button disabled={currentPage === totalPage} onClick={() => setCurrentPage(currentPage + 1)}>&rarr;</Button>
            </ButtonGroup>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {
            displayedData.map((beach, index) => (
              <ListGroup key={beach._id} className="my-2 hoverable" onClick={() => handleBeachSelect(beach)}>
                <ListGroup.Item style={{ backgroundColor: getBackgroundColor(beach.rank)[0],
                  color: getBackgroundColor(beach.rank)[1]}}>
                  <div style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: getCircleColor(beach.goodnessFit),
                    position: 'absolute',
                    left: '10px',
                    top: '50%',
                    transform: 'translateY(-50%) translateX(-200%)'
                  }}></div>
                  {`${beach.rank}위 - ${beach.name} 해수욕장`}
                </ListGroup.Item>
              </ListGroup>
            ))
          }
        </Col>
      </Row>
    </Container>
  );
};

export default SearchBar;
