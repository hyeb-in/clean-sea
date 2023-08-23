import { useContext, useState } from "react";
import { Col, Modal } from "react-bootstrap";
import { ModalVisibleContext, UserStateContext } from "../../App";
import { MODAL_TYPE } from "../../constants";
import ModalBodyWrapper from "../common/ModalBodyWrapper";
import DragDropContainer from "../common/DragDropContainer";
import ReviewTitle from "./ReviewTitle";
import ReviewTextForm from "./ReviewTextForm";
import * as Api from "../../Api";

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
  const [review, setReview] = useState(currentReview);
  const [preview, setPreview] = useState(null);
  const { title, content } = review;

  console.log(review);

  const onEditReview = async (e) => {
    e.preventDefault();
    if (!currentReview || !reviewId) {
      throw new Error("수정하려는 게시물 정보를 찾을 수 없습니다");
    }
    if (!loggedInUser) {
      throw new Error("로그인 한 유저만 수정 가능합니다");
      // 이런 건 인터셉터에서 일괄처리 할 수 있을 거 같은데
      // (put, post, del에 관한 처리)
    }
    try {
      const res = await Api.put(`reviews/${reviewId}`, { title, content });
      if (res.status !== 200) throw new Error("정보를 불러들일 수 없습니다");
      // to do: 이 부분은 인터셉터 말고 개별적으로 처리해주는 게 맞는 건가?
      // 에러 메세지를 그대로 출력 할 거라면 ?
      // 세분화된 메세지가 필요한가?
      // state 반영시킬 것
      console.log(type, title, content, reviewId);
      setModalVisible({
        type: null,
        isVisible: false,
        data: null,
      });
    } catch (error) {
      alert(error);
      console.log(error.response);
    }
  };

  return (
    <Modal
      show={modalVisible.type === MODAL_TYPE.editReview}
      onHide={() =>
        setModalVisible({ type: null, isVisible: false, data: null })
      }
      centered
    >
      <ModalBodyWrapper title="게시글 수정하기" content={null}>
        <Col>
          <DragDropContainer
            preview={preview}
            setPreview={setPreview}
            review={review}
            setReview={setReview}
          />
        </Col>
        <Col>
          <ReviewTitle review={review} onEditReview={onEditReview} />
          <ReviewTextForm
            title={title}
            content={content}
            review={review}
            setReview={setReview}
            onSubmit={onEditReview}
          />
        </Col>
      </ModalBodyWrapper>
    </Modal>
  );
};

export default EditReview;
