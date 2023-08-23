import React, { useState } from 'react';
import { Form, ListGroup } from "react-bootstrap";

const SearchInput = ({ onIdSelected }) => {
  // 미리 저장된 목록 예시
  const preStoredList = [
    { id: 1, name: '서울' },
    { id: 2, name: '부산' },
    { id: 3, name: '인천' },
    { id: 4, name: '광주' },
    { id: 5, name: '대전' },
    { id: 6, name: '울산' },
    { id: 7, name: '세종' },
    { id: 8, name: '경기' },
    { id: 9, name: '강원' },
    { id: 10, name: '충북' },
    { id: 11, name: '충남' },
    { id: 12, name: '전북' },
    { id: 13, name: '전남' },
    { id: 14, name: '경북' },
    { id: 15, name: '경남' },
    { id: 16, name: '제주' },
  ];

  const [searchTerm, setSearchTerm] = useState('');       // 검색어 상태
  const [filteredItems, setFilteredItems] = useState([]); // 필터된 목록 상태

  // 검색어가 변경될 때마다 실행
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setSearchTerm(inputValue);

    if (inputValue) {
      const result = preStoredList.filter(item => item.name.includes(inputValue));
      setFilteredItems(result);
    } else {
      setFilteredItems([]);
    }
  };

  // 리스트 항목 클릭 시 실행
  const handleListItemClick = (id, name) => {
    onIdSelected(id.toString());
    setSearchTerm(name);             // 인풋 박스에 클릭된 항목의 이름 표시
    setFilteredItems([]);            // 팝업 목록 숨기기
  };

  return (
    <div>
      <Form.Control
        type="text"
        placeholder="검색"
        value={searchTerm}
        onChange={handleInputChange}
      />
      {/* 팝업 목록 */}
      {filteredItems.length > 0 && (
        <ListGroup style={{ position: 'absolute', zIndex: 1 }}>
          {filteredItems.map((item) => (
            <ListGroup.Item key={item.id} onClick={() => handleListItemClick(item.id, item.name)}>
              {item.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
}
export default SearchInput;
