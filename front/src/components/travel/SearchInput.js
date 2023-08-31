import React, { useEffect, useRef, useState } from 'react';
import { Form, ListGroup } from "react-bootstrap";
import * as Api from "../../Api";
import beachList from "./data/beachList.json";

const SearchInput = ({ onBeachIdSelected, displayToast, beachName }) => {

  const [searchTerm, setSearchTerm] = useState(beachName || '');
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1); // 선택된 항목의 인덱스

  const wrapperRef = useRef(null);

  const handleClickOutside = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setFilteredItems([]);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchTerm(inputValue);

    if (inputValue) {
      const result = beachList.filter(item => item.includes(inputValue));
      setFilteredItems(result);
    } else {
      setFilteredItems([]);
    }

    // 입력 변경시 항목 인덱스 초기화
    setSelectedItemIndex(-1);
  };

  const handleListItemClick = async (name) => {
    try {
      const beach = await Api.get(`beaches/beaches/name/${name}`);
      onBeachIdSelected(beach.data._id);
      setSearchTerm(beach.data.name);
      setFilteredItems([]);
    } catch (error) {
      displayToast("해변 정보를 가져오는 중 오류 발생");
    }
  };

  const handleKeyDown = (event) => {
    if (filteredItems.length === 0) return;

    // 아래 화살표 키
    if (event.keyCode === 40) {
      event.preventDefault();
      if (selectedItemIndex < filteredItems.length - 1) {
        setSelectedItemIndex(selectedItemIndex + 1);
      } else {
        setSelectedItemIndex(0);
      }
    }

    // 위 화살표 키
    else if (event.keyCode === 38) {
      event.preventDefault();
      if (selectedItemIndex > 0) {
        setSelectedItemIndex(selectedItemIndex - 1);
      } else {
        setSelectedItemIndex(filteredItems.length - 1);
      }
    }

    // 엔터 키
    else if (event.keyCode === 13) {
      event.preventDefault();
      if (selectedItemIndex !== -1) {
        handleListItemClick(filteredItems[selectedItemIndex]);
      }
    }
  };

  return (
    <div ref={wrapperRef}>
      <Form.Control
        type="text"
        placeholder="검색"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      {filteredItems.length > 0 && (
        <ListGroup style={{ position: 'absolute', zIndex: 1 }}>
          {filteredItems.map((item, index) => (
            <ListGroup.Item
              key={item}
              onClick={() => handleListItemClick(item)}
              active={index === selectedItemIndex}
            >
              {item}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}

export default SearchInput;
