import React, { useContext, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { ModalVisibleContext, UserStateContext } from "../../App";
import SpinnerWrapper from "../common/indicators/Spinner";
import ModalBodyWrapper from "../common/ModalBodyWrapper";
import ConfirmModal from "../common/popup/ConfirmModal";
import ReviewForm from "./ReviewForm";
import DragDropContainer from "../common/DragDropContainer";
import { MODAL_TYPE } from "../../constants";
import axios from "axios";

const RESULT_ENUM = {
  NOT_YET: "작성중",
  UPLOADING: "업로드 중",
  SUCCESS: "성공",
  FAIL: "실패",
};

const AddReview = ({ headerTitle, reviews, setReviews }) => {
  const { user: loggedInUser } = useContext(UserStateContext);
  const { modalVisible, setModalVisible } = useContext(ModalVisibleContext);

  const [review, setReview] = useState({ title: "", content: "" });
  const [preview, setPreview] = useState(null);
  const [files, setFiles] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(RESULT_ENUM.NOT_YET);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const isPosting = !uploadStatus === RESULT_ENUM.NOT_YET;
  const isFetched =
    uploadStatus === RESULT_ENUM.SUCCESS || uploadStatus === RESULT_ENUM.FAIL;

  // 게시글 업로드
  const addReview = async (e) => {
    e.preventDefault();
    if (!loggedInUser) throw new Error("로그인 한 유저만 사용할 수 있습니다");
    try {
      if (review?.title.length < 4) {
        throw new Error("글자수 길게 4 이상");
      }
      if (review?.content.length < 4) {
        throw new Error("content length 4이상");
      }
      if (review?.content.length > 300) {
        throw new Error("content length 제한");
      }
      let formData = new FormData();
      // FormData 생성자의 첫 번째 매개변수로는 HTMLFormElement 객체가 필요함
      // FileList는 HTMLFormElement가 아니기때문에 일단 매개변수 없이 생성 후 append로 추가한다
      Array.from(files).forEach((file, index) => {
        formData.append("uploadFile", files);
        formData.append("title", review.title);
        formData.append("content", review.content);
      });

      setUploadStatus(RESULT_ENUM.UPLOADING);
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
        throw new Error("nono");
      }

      // 성공시
      setReviews([...reviews, res.data]);
      setUploadStatus(RESULT_ENUM.SUCCESS);
    } catch (error) {
      console.error(error);
      setUploadStatus(RESULT_ENUM.FAIL);
      setModalVisible({
        type: null,
        isVisible: false,
        data: null,
      });
    }
  };

  const closeReviewFormModal = () => {
    setModalVisible({
      type: null,
      isVisible: false,
      data: null,
    });
    setReview(null);
    setUploadStatus(null);
  };

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
            setModalVisible(null); // confirm modal도 modalVisible로직으로 옮길 때 작업 필요
          }
          if (review.title === "" && review.content === "") {
            return closeReviewFormModal();
          }
        }}
        onClick={(e) => e.stopPropagation()}
        // 이벤트 전파 방지용 >> 없을 시 모달창 클릭할 때도 모달창이 사라지는 현상 방지
        // to do: space bar입력시 모달창 사라짐 버그 (브라우저에 따라서 다른 듯? 확인하기)
      >
        {/* 모달창 내부: 입력 받는 공간 */}
        <ModalBodyWrapper title={headerTitle}>
          <Form onSubmit={addReview}>
            <DragDropContainer
              preview={preview}
              setPreview={setPreview}
              review={review}
              setReview={setReview}
              blobURLsExpired={isFetched}
              setFiles={setFiles}
            />
            <ReviewForm
              title={review.title}
              content={review.content}
              review={review}
              setReview={setReview}
            />
            <Button type="submit" onClick={addReview}>
              확인
            </Button>
          </Form>
        </ModalBodyWrapper>
        {/* 아래의 로직은 여기 있는 게 아니라 부모로 나가고, 전역적으로 사용되어야 할 것 같음 */}
        {/* 리뷰 내용 입력 모달창 내부 */}
        {/* submit 후 업로드 중 -> 1. loading indicator */}
        {isPosting && (
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
