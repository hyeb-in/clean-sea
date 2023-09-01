import React from 'react';
import {
  Dropdown,
} from "react-bootstrap";

const regions = ['강원', '경남', '경북', '인천', '울산', '부산', '전남', '전북', '제주', '충남'];

const RegionDropdown = ({ selectedItem, handleItemSelect }) => (
  <Dropdown onSelect={handleItemSelect} className="mb-2">
    <Dropdown.Toggle id="dropdown-basic-button" style={{ width: '200px' }}>
      {selectedItem ? selectedItem : "지역을 선택해주세요"}
    </Dropdown.Toggle>
    <Dropdown.Menu>
      {regions.map((region, index) => (
        <Dropdown.Item key={index} eventKey={region}>
          {region}
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Dropdown>
);

export default RegionDropdown;
