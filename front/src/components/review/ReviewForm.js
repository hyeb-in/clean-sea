import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Modal, Row, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBomb,
  faCircleCheck,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
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
import SpinnerWrapper from "../common/Spinner";
import ModalBodyWrapper from "../common/ModalBodyWrapper";

const allowedFileTypes = ["png", "jpeg"];

const MAX_FILE_COUNT = 5;
const RESULT_ENUM = {
  SUCCESS: "성공",
  FAIL: "실패",
};

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

  const [review, setReview] = useState({
    title: currentFormData?.title || "",
    content: currentFormData?.content || "",
    imageUrls: currentFormData?.imageUrls || [],
  });
  console.log(review);
  const { title, content, imageUrls } = review;
  const [toastMsg, setToastMsg] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState(null);

  const fileUploaderIndicator =
    imageUrls.length === 0 ? (
      <DragAndDrop />
    ) : (
      <Button className="mb-2">
        <FontAwesomeIcon icon={faPlus} /> 추가하기
      </Button>
    );

  console.log(review, imageUrls);
  // url 형식: 'blob:http://localhost:3001/06d1eea8-6299-4a3f-8bc8-98b3d5971515'
  const handleFileChange = (files) => {
    const blobUrls = [];
    const isFileCountValid = imageUrls.length + files.length <= MAX_FILE_COUNT;
    if (!isFileCountValid) {
      return setToastMsg(
        `사진은 한번에 ${MAX_FILE_COUNT}개까지 업로드할 수 있습니다`
      );
    }
    Array.prototype.forEach.apply(files, [
      (file) => {
        const blob = new Blob([file], { type: file.type });
        const url = URL.createObjectURL(blob);
        blobUrls.push(url);
      },
    ]);
    setReview({
      ...review,
      imageUrls: [...imageUrls, ...blobUrls],
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // to do: 백엔드랑 합쳐서 확인 필요
    // 이미지 없을 경우에 빈 배열이 아니라 그냥 데이터 안넣는 걸로
    const { title, content, imageUrls } = review;
    try {
      if (title.length < 4)
        return setToastMsg("제목을 4글자 이상 입력해주세요");
      if (content.length < 4)
        return setToastMsg("내용을 4글자 이상 입력해주세요");
      if (content.length > 300) return;

      // POST reviews
      if (FORM_STATUS.adding) {
        setIsUploading(true);
        const res = await Api.post("reviews/register", {
          title,
          content,
          imageUrls: imageUrls.length > 0 ? imageUrls : null,
        });
        // 에러 메세지 안가져와지는 거 같은뎅
        if (!res.status === 400) throw new Error("업로드에 실패했습니다");
        setReviews((currentReviews) => [...currentReviews, res.data]);
      }

      // PUT reviews
      if (FORM_STATUS.editing) {
        setIsUploading(true);
        const res = await Api.put(`reviews/${currentFormData._id}`, {
          title,
          content,
        });
        if (!res.status === 400) throw new Error("업로드에 실패했습니다");
        setReviews((currentReviews) =>
          currentReviews.map((review) =>
            review._id === currentFormData._id
              ? { ...review, title, content }
              : review
          )
        );
        setIsUploadFormVisible(false);
        setEditingData(null);
        setReview(null);
      }
    } catch (error) {
      console.error(error);
      setResult(RESULT_ENUM.FAIL);
    }
    setIsUploading(false);
    setResult(RESULT_ENUM.SUCCESS);
  };

  useEffect(() => {
    // 모달이 닫힐 때 메모리에 저장된 Blob URL 삭제
    if (!isUploadFormVisible && imageUrls.length > 0) {
      return () => {
        imageUrls.forEach((url) => URL.revokeObjectURL(url));
        // setImageUrls([]);
      };
    }
  }, [imageUrls, isUploadFormVisible]);

  const closeResultIndicator = () => {
    setIsUploadFormVisible(false);
    setIsEditFormVisible(false);
    setEditingData(null);
    setReview(null);
    setToastMsg("");
    setResult(null);
  };
  return (
    <>
      {/* 모달창: 유저가 리뷰 업로드하기 버튼이나 리뷰 수정 버튼을 누르면 팝업 */}
      {(isUploadFormVisible || isEditFormVisible) && (
        <Modal
          centered
          show={isUploadFormVisible || isEditFormVisible}
          onHide={closeResultIndicator}
          onClose={closeResultIndicator}
          onClick={(e) => e.stopPropagation()}
          // 이벤트 전파 방지용 >> 없을 시 모달창 클릭할 때도 모달창이 사라지는 현상 방지
          // to do: space bar입력시 모달창 사라짐 버그 (윈도우..? 확인하기)
        >
          {/* validation 통과하지 못했다면 toast pop-up으로 유저에게 알려줌 */}
          {toastMsg && (
            <Toast onClose={() => setToastMsg("")} text={toastMsg} />
          )}
          {/* 모달창 내부: 입력 받는 공간 */}
          {!isUploading && !result && (
            <ModalBodyWrapper text={headerTitle}>
              {
                <Row>
                  {/* 드래그앤 드롭으로 파일 업로드 받을 수 있는 구역 */}
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
                      types={allowedFileTypes}
                      multiple={true}
                      maxSize={1} // 최대 2MB 크기까지 허용
                      children={fileUploaderIndicator}
                    />
                    {imageUrls.length > 0 && (
                      <Carousel
                        imageUrls={imageUrls}
                        setReview={setReview} // carousel 바꿔야함
                      />
                    )}
                  </Col>
                  {/* 리뷰 제목, 내용에 대한 인풋 */}
                  <Col xs={5}>
                    <Form.Group>
                      <Form.Label>제목</Form.Label>
                      <Form.Control
                        as="input"
                        size="sm"
                        type="input"
                        value={title}
                        onChange={(e) =>
                          setReview({ ...review, title: e.target.value })
                        }
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>내용</Form.Label>
                      <Form.Control
                        rows={6}
                        as="textarea"
                        value={content}
                        onChange={(e) =>
                          setReview({ ...review, content: e.target.value })
                        }
                      />
                    </Form.Group>
                    <small
                      className={content.length < 300 ? "text-muted" : ""}
                      style={{ color: "red" }}
                    >
                      {content ? content.length : "0"}/300
                    </small>
                  </Col>
                </Row>
              }
            </ModalBodyWrapper>
          )}
          {/* 모달창 내부 */}
          {/* submit 후 업로드 중 -> 1. loading indicator */}
          {isUploading && (
            <ModalBodyWrapper text="게시물을 업로드하는 중입니다">
              <SpinnerWrapper />
            </ModalBodyWrapper>
          )}
          {/* submit 후 결과 -> 2. success or fail */}
          {result && !isUploading && (
            <ModalBodyWrapper
              text="게시물이 공유되었습니다"
              onHide={() => closeResultIndicator}
            >
              <FontAwesomeIcon
                icon={RESULT_ENUM.SUCCESS ? faCircleCheck : faBomb}
                style={{
                  width: "70px",
                  height: "70px",
                  color: "blue",
                  padding: "50px 0",
                }}
              />
            </ModalBodyWrapper>
          )}
          {/* 모달창 footer */}
          {!isUploading && !result && (
            <Modal.Footer>
              <Button onClick={handleSubmit} variant="primary" type="submit">
                {currentFormData ? "수정" : "공유"}
              </Button>
            </Modal.Footer>
          )}
        </Modal>
      )}
    </>
  );
};

export default ReviewForm;
