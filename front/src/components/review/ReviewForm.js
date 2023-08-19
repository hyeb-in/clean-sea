import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Modal, Row, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FileUploader } from "react-drag-drop-files";
import Carousel from "../common/Carousel";
import Toast from "../common/Toast";
import {
  EditFormContext,
  EditingDataContext,
  UploadFormContext,
} from "../../App";
import DragAndDrop from "../common/DragAndDrop";
import * as Api from "../../Api";

const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];
const MAX_FILE_COUNT = 5;

const ReviewForm = ({ headerTitle, setReviews }) => {
  const { isUploadFormVisible, setIsUploadFormVisible } =
    useContext(UploadFormContext);
  const { editingData: currentFormData, setEditingData } =
    useContext(EditingDataContext);
  const { isEditFormVisible, setIsEditFormVisible } =
    useContext(EditFormContext);
  const FORM_STATUS = {
    adding: isUploadFormVisible,
    editing: isEditFormVisible,
  };

  // to do: reducer...? state 줄이는 방법
  const [title, setTitle] = useState(currentFormData?.title || "");
  const [content, setContent] = useState(currentFormData?.content || "");
  const [imageUrls, setImageUrls] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState(null);

  const fileUploaderIndicator =
    imageUrls.length === 0 ? (
      <DragAndDrop />
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // to do: upload imageUrls
    try {
      // to do:   에러 핸들링
      if (title.length < 4) return setError("제목을 4글자 이상 입력해주세요");
      if (content.length < 4) return setError("내용을 4글자 이상 입력해주세요");
      if (FORM_STATUS.adding) {
        const res = await Api.post("reviews/register", { title, content });
        console.log(res);
        if (!res.data.ok) throw new Error("에러가져오기");

        setReviews((currentReviews) => [...currentReviews, res.data]);
      }
      if (FORM_STATUS.editing) {
        const res = await Api.put(`reviews/${currentFormData._id}`, {
          title,
          content,
        });
        if (!res.data.ok) throw new Error("에러가져오기");

        setReviews((currentReviews) =>
          currentReviews.map((review) =>
            review._id === currentFormData._id
              ? { ...review, title, content }
              : review
          )
        );
        setIsUploadFormVisible(false);
        setEditingData(null);
        setTitle(null);
        setContent(null);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    // to do: 백엔드 에러 상태코드 받아서 체크할 것
    setIsUploadFormVisible(false);
    setIsEditFormVisible(false);
  };

  useEffect(() => {
    // 모달이 닫힐 때 메모리에 저장된 Blob URL 삭제
    if (!isUploadFormVisible && imageUrls.length > 0) {
      return () => {
        imageUrls.forEach((url) => URL.revokeObjectURL(url));
        setImageUrls([]);
      };
    }
  }, [imageUrls, isUploadFormVisible]);

  return (
    <>
      {(isUploadFormVisible || isEditFormVisible) && (
        <Modal
          centered
          show={isUploadFormVisible || isEditFormVisible}
          onHide={() => {
            setIsUploadFormVisible(false);
            setIsEditFormVisible(false);
            setEditingData(null);
          }}
          onClick={(e) => e.stopPropagation()}
          // 이벤트 전파 방지용 >> 없을 시 모달창 클릭할 때도 모달창이 사라지는 현상 방지
          // to do: space bar입력시 모달창 사라짐 버그 (윈도우..? 확인하기)
        >
          {showToast && (
            <Toast
              show={showToast}
              onClose={() => setShowToast(false)}
              text={`최대 ${MAX_FILE_COUNT}개까지 업로드 가능합니다.`}
            />
          )}
          {error && (
            <Toast
              show={!!error}
              delay={2000}
              autohide
              onClose={() => setError(null)}
              text={error}
              bg="light"
            />
            // 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light'
          )}
          <Modal.Header closeButton>
            <Modal.Title>{headerTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col
                xs={7}
                className="d-flex flex-column align-items-center"
                style={{
                  height: "100%",
                }}
              >
                <FileUploader
                  handleChange={handleFileChange}
                  name="file"
                  types={fileTypes}
                  multiple={true}
                  // maxSize={2} // 최대 2MB 크기까지 허용
                  // minSize={1} // 최소 1MB 크기 이상만 허용
                  children={fileUploaderIndicator}
                />
                {imageUrls.length > 0 && (
                  <Carousel imageUrls={imageUrls} setImageUrls={setImageUrls} />
                )}
              </Col>
              <Col xs={5}>
                <Form.Group>
                  <Form.Label>제목</Form.Label>
                  <Form.Control
                    as="input"
                    size="sm"
                    type="input"
                    value={title}
                    setState={setTitle}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>내용</Form.Label>
                  <Form.Control
                    rows={6}
                    as="textarea"
                    value={content}
                    setState={setContent}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </Form.Group>

                <small className="text-muted">
                  {content ? content.length : "0"}/300
                </small>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleSubmit} variant="primary" type="submit">
              {currentFormData ? "수정" : "공유"}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default ReviewForm;
