import React from 'react';
import { Image, Row, Col } from "react-bootstrap";

const TravelImageWithText = ({ imageUrl, text }) => {
  const imageStyle = {
    filter : `sepia(.1) grayscale(5%)`
  };

  return (
    <Row className="justify-content-center align-items-center" style={{ position: 'relative' }}>
      <Image src={imageUrl} alt="여행 이미지" fluid style={imageStyle} />

      <Col xs={12} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
        <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)', padding: '10px', borderRadius: '5px' }}>{text}</span>
      </Col>
    </Row>
  );
};

export default TravelImageWithText;
