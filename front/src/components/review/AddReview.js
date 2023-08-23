import React, { useContext, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { ModalVisibleContext, UserStateContext } from "../../App";
import * as Api from "../../Api";
import SpinnerWrapper from "../common/Spinner";
import ModalBodyWrapper from "../common/ModalBodyWrapper";
import ConfirmModal from "../common/ConfirmModal";
import ReviewTextForm from "./ReviewTextForm";
import DragAndDropnPreview from "../common/DragDropContainer";
import { MODAL_TYPE } from "../../constants";

const RESULT_ENUM = {
  SUCCESS: "성공",
  FAIL: "실패",
};

const AddReview = ({ headerTitle, reviews, setReviews }) => {
  const { user: loggedInUser } = useContext(UserStateContext);
  const { modalVisible, setModalVisible } = useContext(ModalVisibleContext);

  const [review, setReview] = useState({ title: "", content: "" });
  const { title, content } = review;
  const [preview, setPreview] = useState(null);

  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // 게시글 업로드
  const addReview = async (e) => {
    e.preventDefault();
    if (!loggedInUser) throw new Error("로그인 한 유저만 사용할 수 있습니다");

    try {
      if (title.length < 4) {
        return alert("글자수 길게 4 이상");
      }

      if (content.length < 4) {
        return alert("content length 4이상");
      }

      if (content.length > 300) {
        return alert("content length 제한");
      }
      setIsUploading(true);
      console.log(review, "업로드 될 review 형식 <<<<");
      const res = await Api.post("reviews/register", review);
      // error 처리
      if (!res.data) {
        return alert("노노");
      }
      setReviews([...reviews, res.data]);
    } catch (error) {
      console.error(error);
      setResult(RESULT_ENUM.FAIL);
      setModalVisible({
        type: null,
        isVisible: false,
        data: null,
      });
      // to do: 모달창 띄우기
    }
    setIsUploading(false);
    setResult(RESULT_ENUM.SUCCESS);
  };

  const closeReviewFormModal = () => {
    setModalVisible({
      type: null,
      isVisible: false,
      data: null,
    });
    setReview(null);
    // setToast(null);
    setResult(null);
  };

  const isLoading = !isUploading && !result;
  const isFetched = !isUploading && result;

  return (
    <>
      {/* 리뷰 입력 모달창: 유저가 리뷰 업로드하기 버튼이나 리뷰 수정 버튼을 누르면 팝업 */}
      <Modal
        centered
        show={modalVisible.type === MODAL_TYPE.addReview}
        onHide={() => {
          // 모달창 제거
          // title과 content가 비어있다면(날아갈 데이터가 없다면) 유저에게 묻지 않고 모달창 제거
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
        {/* 모달창 내부: 입력 받는 공간 */}
        {!isUploading && !result && (
          <ModalBodyWrapper title={headerTitle}>
            {
              <Row className="align-items-center">
                {/* 드래그앤 드롭으로 파일 업로드 받을 수 있는 구역 */}
                <Col
                  xs={7}
                  className="d-flex flex-column align-items-center h-100"
                >
                  <DragAndDropnPreview
                    preview={preview}
                    setPreview={setPreview}
                  />
                </Col>
                {/* 리뷰 제목, 내용에 대한 인풋 */}
                <Col xs={5}>
                  <ReviewTextForm
                    title={title}
                    content={content}
                    review={review}
                    setReview={setReview}
                    onSubmit={addReview}
                  />
                </Col>
              </Row>
            }
          </ModalBodyWrapper>
        )}
        {/* 아래의 로직은 여기 있는 게 아니라 부모로 나가고, 전역적으로 사용되어야 할 것 같음 */}
        {/* 리뷰 내용 입력 모달창 내부 */}
        {/* submit 후 업로드 중 -> 1. loading indicator */}
        {isUploading && (
          <ModalBodyWrapper
            title="게시물을 업로드하는 중입니다"
            content={<SpinnerWrapper />}
          />
        )}
        {/* submit 후 결과 -> 2. success or fail */}
        {/* to do: 버그수정. 공유되었습니다 모달창 뜬 후에 x 버튼이 아니라 바깥 창을 클릭하면 '게시글을 삭제하시겠어요?' 팝업이 뜸 */}
        {isFetched && (
          <ModalBodyWrapper
            title={
              RESULT_ENUM.SUCCESS
                ? "게시물이 공유되었습니다"
                : "게시물을 업로드하지 못했습니다"
            }
            onHide={() => closeReviewFormModal()}
            content={
              <FontAwesomeIcon
                icon={RESULT_ENUM.SUCCESS ? faCircleCheck : faBomb}
                className="indicator-success"
              />
            }
          />
        )}
        {/* 리뷰 내용 입력 모달창 내부 footer */}
        {!isUploading && !result && (
          <Modal.Footer className="d-flex justify-content-end">
            <Button
              variant="primary"
              type="submit"
              onClick={addReview ? addReview : null}
            >
              공유
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

export default AddReview;
