import React, { useContext, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { ModalVisibleContext, UserStateContext } from "../../App";
import * as Api from "../../Api";
import SpinnerWrapper from "../common/indicators/Spinner";
import ModalBodyWrapper from "../common/ModalBodyWrapper";
import ConfirmModal from "../common/popup/ConfirmModal";
import ReviewForm from "./ReviewForm";
import DragDropContainer from "../common/DragDropContainer";
import { MODAL_TYPE } from "../../constants";
import axios from "axios";

const RESULT_ENUM = {
  SUCCESS: "성공",
  FAIL: "실패",
};

const AddReview = ({ headerTitle, reviews, setReviews }) => {
  const { user: loggedInUser } = useContext(UserStateContext);
  const { modalVisible, setModalVisible } = useContext(ModalVisibleContext);

  const [review, setReview] = useState({ title: "", content: "" });
  const [preview, setPreview] = useState(null);
  const [files, setFiles] = useState(null);

  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // 게시글 업로드
  const onAddReview = async (e) => {
    e.preventDefault();
    if (!loggedInUser) throw new Error("로그인 한 유저만 사용할 수 있습니다");

    try {
      if (review?.title.length < 4) {
        return alert("글자수 길게 4 이상");
      }

      if (review?.content.length < 4) {
        return alert("content length 4이상");
      }

      if (review?.content.length > 300) {
        return alert("content length 제한");
      }
      let formData = new FormData(files);
      if (files) {
        formData.append("uploadFile", formData);
      }
      setIsUploading(true);
      console.log(files, formData, "업로드 될 review 형식 <<<<");
      // const res = await Api.post("reviews/register", formData);
      // console.log(res);
      const res = await axios.post(
        "http://localhost:5001/reviews/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
        }
      );
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
          if (review.title !== "" || review.content !== "") {
            // 내용이 있다면 다시 한 번 확인하는 모달창에 표시한다
            setShowConfirmModal(true);
          }
          if (review.title === "" && review.content === "") {
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
            <ReviewForm
              title={review.title}
              content={review.content}
              review={review}
              setReview={setReview}
              onSubmit={onAddReview}
            >
              {/* children으로 바로 넣어주기 가능? */}
              <DragDropContainer
                preview={preview}
                setPreview={setPreview}
                review={review}
                setReview={setReview}
                blobURLsExpired={isFetched}
                setFiles={setFiles}
              />
              {/* <Button onSubmit={onAddReview} type="submit">
                button
              </Button> */}
            </ReviewForm>
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
        {/* {!isUploading && !result && (
          <Modal.Footer className="d-flex justify-content-end">
            <Button variant="primary" type="submit" onClick={onAddReview}>
              공유
            </Button>
          </Modal.Footer>
        )} */}
        {/* 입력 도중에 화면 이탈할 경우 confirm 모달창 띄운다 */}
        {(review?.content !== "" || review?.title !== "") && (
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
