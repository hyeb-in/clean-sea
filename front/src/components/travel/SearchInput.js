import React, { useEffect, useRef, useState } from 'react';
import { Form, ListGroup } from "react-bootstrap";
import * as Api from "../../Api";
import beachList from "./data/beachList.json";

const SearchInput = ({ onBeachIdSelected, displayToast, beachName }) => {

  const [searchTerm, setSearchTerm] = useState(beachName || '');
  const [filteredItems, setFilteredItems] = useState([]);

  const wrapperRef = useRef(null); // 컴포넌트의 DOM에 직접 접근하기 위한 ref

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
  };

  const handleListItemClick = async (name) => {
    try {
      const beach = await Api.get(`beaches/name/${name}`);
      onBeachIdSelected(beach.data._id);
      setSearchTerm(beach.data.name);
      setFilteredItems([]);
    } catch (error) {
      displayToast("해변 정보를 가져오는 중 오류 발생");
    }
  };

  return (
    <div ref={wrapperRef}>
      <Form.Control
        type="text"
        placeholder="검색"
        value={searchTerm}
        onChange={handleInputChange}
      />
      {filteredItems.length > 0 && (
        <ListGroup style={{ position: 'absolute', zIndex: 1 }}
                   onMouseLeave={() => setFilteredItems([])}
        >
          {filteredItems.map((item) => (
            <ListGroup.Item key={item} onClick={() => handleListItemClick(item)}>
              {item}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}

export default SearchInput;
