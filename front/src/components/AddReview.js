import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import {
  Button,
  Col,
  FloatingLabel,
  InputGroup,
  Modal,
  Row,
  Form,
  Container,
} from "react-bootstrap";
import Avatar from "./Avatar";
import Carousel from "./Carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages, faPlus } from "@fortawesome/free-solid-svg-icons";
import ToastWrapper from "./Toast";

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];
const MAX_FILE_COUNT = 5;

const AddReview = ({ setShowModal, showModal }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [showToast, setShowToast] = useState(false);

  const handleClose = () => setShowModal(false);

  const fileUploaderIndicator =
    imageUrls.length === 0 ? (
      <Container fluid style={{ height: "200px", padding: "20px 0" }}>
        <Row
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyItems: "center",
            height: "100%",
          }}
        >
          <Col className="d-flex justify-content-center align-items-center">
            <FontAwesomeIcon icon={faImages} size="3x" />
          </Col>
          <Col className="py-4">사진을 여기에 끌어다 놓으세요</Col>
          <Col className="d-flex justify-content-center align-items-center">
            <Button>컴퓨터에서 선택</Button>
          </Col>
        </Row>
      </Container>
    ) : (
      <Button className="mb-2">
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    );
  const handleFileChange = (files) => {
    if (
      files.length > MAX_FILE_COUNT ||
      (imageUrls.length > 0 && imageUrls.length + files.length > MAX_FILE_COUNT)
    ) {
      return setShowToast(true);
    }
    if (files.length > 0) {
      // FileList 객체를 배열로 변환
      const fileList = Array.from(files);
      // 파일을 Blob으로 변환하고 Blob URL을 생성하는 Promise 배열 생성
      const blobPromises = fileList.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          // 파일을 ArrayBuffer로 읽은 후 Blob을 생성하고 Blob URL을 생성
          reader.onload = (event) => {
            const blob = new Blob([event.target.result], { type: file.type });
            resolve(URL.createObjectURL(blob));
          };
          reader.readAsArrayBuffer(file);
        });
      });
      // 모든 Promise를 병렬로 처리하여 Blob URL 배열을 업데이트
      Promise.all(blobPromises).then((newBlobUrls) => {
        setImageUrls((prevUrls) => [...prevUrls, ...newBlobUrls]);
      });
    } else {
      // 단일 파일인 경우
      const blob = new Blob([files], { type: files.type });
      const url = URL.createObjectURL(blob);
      setImageUrls([url]);
    }
  };

  const handleSubmit = () => {
    // submit: imageUrls, title, content
    console.log(imageUrls, title, content);
  };

  useEffect(() => {
    // 모달이 닫힐 때 메모리에 저장된 Blob URL 삭제
    if (!showModal && imageUrls.length > 0) {
      return () => {
        imageUrls.forEach((url) => URL.revokeObjectURL(url));
        setImageUrls([]);
      };
    }
  }, [imageUrls, showModal]);

  return (
    <Modal
      centered
      show={showModal}
      onHide={handleClose}
      onClick={(e) => e.stopPropagation()}
      // 이벤트 전파 방지용 >> 없을 시 모달창 클릭할 때도 모달창이 사라지는 현상
    >
      {showToast && (
        <ToastWrapper
          onClose={() => setShowToast(false)}
          text={`최대 ${MAX_FILE_COUNT}개까지 업로드 가능합니다.`}
        />
      )}

      <Modal.Header closeButton>
        <Modal.Title>새 게시물 작성하기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col
            xs={8}
            className="d-flex flex-column align-items-center"
            style={{ height: "100%" }}
          >
            <FileUploader
              handleChange={handleFileChange}
              name="file"
              types={fileTypes}
              multiple={true}
              // maxSize={2} // 최대 2MB 크기까지 허용
              // minSize={1} // 최소 1MB 크기 이상만 허용
              // 어느정도 크기가 적당한지 모르겠엉
              children={fileUploaderIndicator}
            />

            {imageUrls.length > 0 && (
              <Carousel imageUrls={imageUrls} setImageUrls={setImageUrls} />
            )}
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
                  rows={10}
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
        <Button onClick={handleSubmit} variant="primary">
          공유
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddReview;
