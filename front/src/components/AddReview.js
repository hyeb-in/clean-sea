import React, { useState } from "react";
import {
  Button,
  Col,
  FloatingLabel,
  Image,
  InputGroup,
  Modal,
  Row,
  Form,
} from "react-bootstrap";
import Avatar from "./Avatar";

const AddReview = ({ setShowModal, showModal }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const handleClose = () => setShowModal(false);

  return (
    <Modal
      centered
      show={showModal}
      onHide={handleClose}
      onClick={(e) => e.stopPropagation()}
      // 이벤트 전파 방지용 >> 없을 시 모달창 클릭할 때도 모달창이 사라지는 현상
    >
      <Modal.Header closeButton>
        <Modal.Title>새 게시물 작성하기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs={8}>
            <Image
              fluid
              style={{ width: "100%" }}
              src="https://health.chosun.com/site/data/img_dir/2023/05/31/2023053102582_0.jpg"
            ></Image>
          </Col>
          <Col xs={4}>
            <Row>
              <Col xs="auto">
                <Avatar width="30" />
              </Col>
              <Col className="px-0 d-flex align-items-center">훈제오리</Col>
            </Row>
            <InputGroup className="">
              <FloatingLabel
                controlId="floatingInput"
                label="제목"
                className="my-2"
              >
                <Form.Control
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </FloatingLabel>
              <div>
                {/* column 정렬을 위한 div입니다. FloatingLabel 때문에 css로 정렬하면 레이아웃 망가짐. */}
                <Form.Control
                  value={content}
                  onChange={(e) => {
                    if (e.target.value.length <= 300) {
                      setContent(e.target.value);
                    }
                  }}
                  placeholder="내용"
                  as="textarea"
                  rows={3}
                  style={{ height: "100%" }}
                />
              </div>
            </InputGroup>
            <small className="text-muted">
              {content ? content.length : "0"}/300
            </small>
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary">공유</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddReview;
