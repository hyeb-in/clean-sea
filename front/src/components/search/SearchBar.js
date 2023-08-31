import React, { useEffect, useState } from 'react';
import {
  Container,
  Col,
  Row,
  ListGroup,
} from "react-bootstrap";
import RegionDropdown from './RegionDropdown';
import './SearchBar.css';

const testData = [
  {
    "_id": "64e779ed76941c58840efefc1",
    "year": 2023,
    "address": "강원",
    "name": "첫번째",
    "esch": 35.0625,
    "ente": 13.1041666667,
    "goodnessFit": true,
    "eschAvg": 30.3641646466,
    "enteAvg": 7.0546748972,
    "eschScore": 1.1547329033,
    "enteScore": 1.8575153154000001,
    "Latitude": -1,
    "Longitude": -1,
    "eschGlobalAvg": 55.0346520784,
    "enteGlobalAvg": 35.2402508284,
    "eschAvgGlobalScore": 0.5517281113,
    "enteAvgGlobalScore": 0.2001879876,
    "sumGerms": 0.7519160989
  },
  {
    "_id": "64e779ed76941c58840efefc2",
    "year": 2023,
    "address": "강원",
    "name": "두번째",
    "esch": 35.0625,
    "ente": 13.1041666667,
    "goodnessFit": true,
    "eschAvg": 30.3641646466,
    "enteAvg": 7.0546748972,
    "eschScore": 1.1547329033,
    "enteScore": 1.8575153154000001,
    "Latitude": -1,
    "Longitude": -1,
    "eschGlobalAvg": 55.0346520784,
    "enteGlobalAvg": 35.2402508284,
    "eschAvgGlobalScore": 0.5517281113,
    "enteAvgGlobalScore": 0.2001879876,
    "sumGerms": 0.7519160989
  },
  {
    "_id": "64e779ed76941c58840efefc3",
    "year": 2023,
    "address": "강원",
    "name": "세번째",
    "esch": 35.0625,
    "ente": 13.1041666667,
    "goodnessFit": true,
    "eschAvg": 30.3641646466,
    "enteAvg": 7.0546748972,
    "eschScore": 1.1547329033,
    "enteScore": 1.8575153154000001,
    "Latitude": -1,
    "Longitude": -1,
    "eschGlobalAvg": 55.0346520784,
    "enteGlobalAvg": 35.2402508284,
    "eschAvgGlobalScore": 0.5517281113,
    "enteAvgGlobalScore": 0.2001879876,
    "sumGerms": 0.7519160989
  }
];

const SearchBar = ({ setSelectedBeach }) => {
  const [selectedItem, setSelectedItem] = useState("");
  const [beachData, setBeachData] = useState([]);

  const handleItemSelect = (item) => {
    console.log(item);
    setSelectedItem(item);
    // DB에서 데이터 가져오는 로직을 구현하고, 가져온 데이터를 상태로 업데이트
  };

  const handleBeachSelect = (beach) => {
    setSelectedBeach(beach);
  };

  // 지역별 해수욕장 데이터 가져오기
  useEffect(() => {
    setBeachData(testData)
  }, [selectedItem]);

  return (
    <Container fluid className="mt-2">
      <Row>
        <Col>
          <RegionDropdown selectedItem={selectedItem} handleItemSelect={handleItemSelect} />
        </Col>
      </Row>
      <Row>
        <Col>
          {
            beachData.map((beach, index) => (
              <ListGroup key={beach._id} className="my-2 hoverable" onClick={() => handleBeachSelect(beach)}>
                <ListGroup.Item>{`${index + 1}위 - ${beach.name} 해수욕장`}</ListGroup.Item>
              </ListGroup>
            ))
          }
        </Col>
      </Row>
    </Container>
  );
};

export default SearchBar;
