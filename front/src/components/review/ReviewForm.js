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
import ToastWrapper from "../common/ToastWrapper";
import {
  EditFormContext,
  EditingDataContext,
  UploadFormContext,
  UserStateContext,
} from "../../App";
import DragAndDrop from "../common/DragAndDrop";
import * as Api from "../../Api";
import SpinnerWrapper from "../common/Spinner";
import ModalBodyWrapper from "../common/ModalBodyWrapper";
import ConfirmModal from "../common/ConfirmModal";

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
  const { user: loggedInUser } = useContext(UserStateContext);

  const [review, setReview] = useState({
    title: currentFormData?.title || "",
    content: currentFormData?.content || "",
    imageUrls: currentFormData?.imageUrls || [],
  });

  const { title, content, imageUrls } = review;
  const [toastMsg, setToastMsg] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const fileUploaderIndicator =
    imageUrls.length === 0 ? (
      <DragAndDrop />
    ) : (
      <Button className="mb-2">
        <FontAwesomeIcon icon={faPlus} /> 추가하기
      </Button>
    );

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
    // 이미지 없을 경우에 빈 배열이 아니라 그냥 데이터 안넣는 걸로 ?
    if (!loggedInUser) throw new Error("로그인 한 유저만 사용할 수 있습니다");

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
          // imageUrls: imageUrls.length > 0 ? imageUrls : null,
        });
        // 에러 메세지 안가져와지는 거 같은뎅
        if (!res.status === 400) throw new Error("업로드에 실패했습니다");
        setReviews((currentReviews) => [...currentReviews, res.data]);
      }

      // PUT reviews
      if (FORM_STATUS.editing) {
        const { author: authorId } = currentFormData;
        if (loggedInUser._id === authorId) {
          return setToastMsg("다른사람의 게시물을 수정할 수 없습니다");
        }
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
        setReview({ title: "", content: "", imageUrls: [] });
      }
    } catch (error) {
      console.error(error);
      setResult(RESULT_ENUM.FAIL);
      setToastMsg(error);
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

  const closeReviewFormModal = () => {
    setIsUploadFormVisible(false);
    setIsEditFormVisible(false);
    setEditingData(null);
    setReview({
      title: "",
      content: "",
      imageUrls: [],
    });
    setToastMsg("");
    setResult(null);
  };

  return (
    <>
      {/* 리뷰 입력 모달창: 유저가 리뷰 업로드하기 버튼이나 리뷰 수정 버튼을 누르면 팝업 */}
      <Modal
        centered
        show={isUploadFormVisible || isEditFormVisible}
        onHide={() => {
          // title과 content가 비어있다면 리뷰 작성하는 모달창을 제거한다
          if (title !== "" || content !== "") {
            // 내용이 있다면 다시 한 번 확인하는 모달창에 표시한다
            setShowConfirmModal(true);
          }
          if (title === "" && content === "") {
            return closeReviewFormModal();
          }
        }}
        onClick={(e) => e.stopPropagation()}
        // 이벤트 전파 방지용 >> 없을 시 모달창 클릭할 때도 모달창이 사라지는 현상 방지
        // to do: space bar입력시 모달창 사라짐 버그 (윈도우..? 확인하기)
      >
        {/* validation 통과하지 못했다면 toast pop-up으로 유저에게 알려줌 */}
        {toastMsg && (
          <ToastWrapper
            onClose={() => setToastMsg("")}
            text={toastMsg}
            position="middle-center"
            bg="warning"
          />
        )}

        {/* 모달창 내부: 입력 받는 공간 */}
        {!isUploading && !result && (
          <ModalBodyWrapper title={headerTitle}>
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
        {/* 리뷰 내용 입력 모달창 내부 */}
        {/* submit 후 업로드 중 -> 1. loading indicator */}
        {isUploading && (
          <ModalBodyWrapper
            text="게시물을 업로드하는 중입니다"
            content={<SpinnerWrapper />}
          />
        )}
        {/* submit 후 결과 -> 2. success or fail */}
        {result && !isUploading && (
          <ModalBodyWrapper
            title="게시물이 공유되었습니다"
            onHide={() => closeReviewFormModal()}
            content={
              <FontAwesomeIcon
                icon={RESULT_ENUM.SUCCESS ? faCircleCheck : faBomb}
                style={{
                  width: "70px",
                  height: "70px",
                  color: "blue",
                  padding: "50px 0",
                }}
              />
            }
          />
        )}
        {/* 리뷰 내용 입력 모달창 내부 footer */}
        {!isUploading && !result && (
          <Modal.Footer className="d-flex justify-content-end">
            <Button onClick={handleSubmit} variant="primary" type="submit">
              {currentFormData ? "수정" : "공유"}
            </Button>
          </Modal.Footer>
        )}
        {/* 입력 도중에 화면 이탈할 경우 confirm 모달창 띄운다 */}
        {(content !== "" || title !== "") && (
          <ConfirmModal
            show={showConfirmModal}
            setShowConfirmModal={setShowConfirmModal}
            closeReviewFormModal={closeReviewFormModal}
          />
        )}
      </Modal>
    </>
  );
};

export default ReviewForm;
