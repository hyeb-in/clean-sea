import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { UserStateContext } from "../../App";
import ModalBodyWrapper from "../common/layout/ModalBodyWrapper";
import DragDropContainer from "../common/DragDropContainer";
import ReviewFormBody from "./ReviewFormBody";
import { RESULT_ENUM } from "./AddReview";
import useModal, { MODAL_TYPE } from "../../hooks/useModal";
import useReview from "../../hooks/useReview";

// add review랑 형태가 같음 -> 하나로 합쳐도 될 듯?

// <ReviewTitle/>에서  '...' 버튼을 클릭 => id, review 값 modalVisible 컨텍스트에 전달
// => <ActionSelectorModal />에서 그 값을 받아서
// => 모달에 관한 컨텍스트만 변경 후 데이터를 현재 컴포넌트로 전달
const EditReview = ({ review, setReview }) => {
  const { user: loggedInUser } = useContext(UserStateContext);
  const { modalVisible, closeModal } = useModal();
  const { editReview } = useReview();

  const [files, setFiles] = useState(null);
  const { editStatus } = useState(false);
  const [preview, setPreview] = useState(null);

  const { _id: reviewId } = review;

  const isSuccessful = editStatus === RESULT_ENUM.SUCCESS;
  const isFailed = editStatus === RESULT_ENUM.FAIL;
  const isPosting = !editStatus === RESULT_ENUM.NOT_YET;
  const isFetched = !isPosting && (isSuccessful || isFailed);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!(review && reviewId)) {
      throw new Error("수정하려는 게시물 정보를 찾을 수 없습니다");
    }
    if (!loggedInUser) {
      throw new Error("로그인 한 유저만 수정 가능합니다");
      // (put, post, del에 관한 처리) => 인터셉터한테 시키기
    }
    try {
      const res = await editReview(reviewId, review);
      console.log(res);
    } catch (error) {
      alert(error);
      console.log(error.response);
    }
  };

  return (
    <Modal
      dialogClassName="addreview__modalWrapper"
      className="px-5"
      show={modalVisible.type === MODAL_TYPE.editReview}
      onHide={closeModal}
      centered
    >
      <ModalBodyWrapper
        title="게시글 수정하기"
        content={
          <div className="addReview__form flexible-col">
            <DragDropContainer
              preview={preview}
              setPreview={setPreview}
              review={review}
              setReview={setReview}
              blobURLsExpired={isFetched}
              files={files}
              setFiles={setFiles}
            />
            <ReviewFormBody review={review} setReview={setReview} />
          </div>
        }
      >
        {
          <Form onSubmit={onSubmit} className="addReview__form">
            <Button
              className="addreview__btn"
              variant="outline-primary"
              type="submit"
              onClick={onSubmit}
            >
              확인
            </Button>
          </Form>
        }
      </ModalBodyWrapper>
    </Modal>
  );
};

export default EditReview;
