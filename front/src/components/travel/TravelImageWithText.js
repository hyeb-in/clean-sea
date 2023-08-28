import React from 'react';
import { Image, Row, Col } from "react-bootstrap";

const TravelImageWithText = ({ imageUrl, text }) => {
  const textHash = text.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0); // 해시 함수

  // 해시 값을 특정 범위의 값으로 정규화
  const normalizeHash = (hash, min, max) => {
    return ((hash % (max - min + 1)) + min);
  };

  const sepiaValue = normalizeHash(textHash, 0, 1); // 0에서 1 사이의 값으로 세피아 값 정규화
  const grayscaleValue = normalizeHash(textHash, 0, 100); // 0에서 100 사이의 값으로 그레이스케일 값 정규화
  const rotationValue = normalizeHash(textHash, -20, 20); // -20도에서 20도 사이의 값으로 회전 각도 정규화

  const imageStyle = {
    filter: `sepia(${sepiaValue}) grayscale(${grayscaleValue}%)`,
    transform: `rotate(${rotationValue}deg)`,
    transition: 'transform 0.5s'
  };

  return (
    <Row className="justify-content-center align-items-center" style={{ position: 'relative' }}>
      <Image src={imageUrl} alt="여행 이미지" fluid style={imageStyle} />

      <Col xs={12} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
        <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '10px', borderRadius: '5px' }}>{text}</span>
      </Col>
    </Row>
  );
};

export default TravelImageWithText;
