import { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ModalVisibleContext, UserStateContext } from "../../App";
import { MODAL_TYPE } from "../../constants";
import ModalBodyWrapper from "../common/layout/ModalBodyWrapper";
import DragDropContainer from "../common/DragDropContainer";
import * as Api from "../../Api";
import ReviewFormBody from "./ReviewFormBody";
import { RESULT_ENUM } from "./AddReview";

// add review랑 형태가 같음 -> 하나로 합쳐도 될 듯?

// <ReviewTitle/>에서  '...' 버튼을 클릭 => id, review 값 modalVisible 컨텍스트에 전달
// => <ActionSelectorModal />에서 그 값을 받아서
// => 모달에 관한 컨텍스트만 변경 후 데이터를 현재 컴포넌트로 전달
const EditReview = () => {
  const { user: loggedInUser } = useContext(UserStateContext);
  const { modalVisible, setModalVisible } = useContext(ModalVisibleContext);
  const {
    type,
    data: { review: currentReview, reviewId },
  } = modalVisible;
  const { files, setFiles } = useState(null);
  // review에 저장된 이미지가 있다면 초기값으로 지정한다
  const { editStatus, setEditStatus } = useState(false);
  const [review, setReview] = useState(currentReview);
  const [preview, setPreview] = useState(null);
  const { title, content } = review;

  console.log(modalVisible.data);
  const isPosting = !editStatus === RESULT_ENUM.NOT_YET;
  const isFetched =
    editStatus === RESULT_ENUM.SUCCESS || editStatus === RESULT_ENUM.FAIL;

  console.log(review);

  const editReview = async (e) => {
    e.preventDefault();
    if (!currentReview || !reviewId) {
      throw new Error("수정하려는 게시물 정보를 찾을 수 없습니다");
    }
    if (!loggedInUser) {
      throw new Error("로그인 한 유저만 수정 가능합니다");
      // (put, post, del에 관한 처리) => 인터셉터한테 시키기
    }
    try {
      const res = await Api.put(`reviews/${reviewId}`, { title, content });
      if (res.status !== 200) throw new Error("정보를 불러들일 수 없습니다");
      // to do: 이 부분은 인터셉터 말고 개별적으로 처리한다?
      // 세분화된 메세지가 필요한가?
      // state 반영시키기
      console.log(type, title, content, reviewId);
      setModalVisible({
        type: null,
        isVisible: false,
        data: null,
      });
      // to do: custom hook ???
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
      onHide={() =>
        setModalVisible({ type: null, isVisible: false, data: null })
      }
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
              setFiles={setFiles}
            />
            <ReviewFormBody
              title={review.title}
              content={review.content}
              review={review}
              setReview={setReview}
            />
          </div>
        }
      >
        {
          <Form onSubmit={editReview} className="addReview__form">
            <Button
              className="addreview__btn"
              variant="outline-primary"
              type="submit"
              onClick={editReview}
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
