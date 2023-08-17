import React, { useState } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import Avatar from "./Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import ModalWrapper from "./ModalWrapper";

const ReviewCard = ({ review }) => {
  const [showModal, setShowModal] = useState(false);

  const { id, author, title, content, imageUrl } = review;

  const handleClose = () => setShowModal(false);
  return (
    <Card
      bg="light"
      key={id}
      text="black"
      style={{ width: "18rem" }}
      className="mb-5"
    >
      <Card.Header>
        <Row>
          <Col xs="auto">
            <Avatar width="50" />
          </Col>
          <Col className="d-flex align-items-center px-0">{author}</Col>
          {/* 로그인 유저가 작성한 글이라면 수정, 삭제 */}
          {/* ellipsis 아이콘 클릭하면 모달 창을 띄운다 */}
          <Col className="d-flex align-items-center justify-content-end">
            <Button
              variant="link"
              style={{ color: "black" }}
              onClick={() => setShowModal(!showModal)}
            >
              <FontAwesomeIcon icon={faEllipsis} />
            </Button>
            <ModalWrapper show={showModal} onHide={handleClose}>
              <ListGroup className="text-center">
                {/* TO DO: onClick handler */}
                <ListGroup.Item action>수정</ListGroup.Item>
                <ListGroup.Item action style={{ color: "red" }}>
                  삭제
                </ListGroup.Item>
                <ListGroup.Item action onClick={() => setShowModal(!showModal)}>
                  취소
                </ListGroup.Item>
              </ListGroup>
            </ModalWrapper>
          </Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Image src={imageUrl} fluid />
        <Card.Title>{title}</Card.Title>
        <Card.Text>{content}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ReviewCard;
