import { useContext, useState } from "react";
import { Col, Modal } from "react-bootstrap";
import { ModalVisibleContext } from "../../App";
import { MODAL_TYPE } from "../../constants";
import ModalBodyWrapper from "../common/ModalBodyWrapper";
import DragDropContainer from "../common/DragDropContainer";
import ReviewTitle from "./ReviewTitle";

const EditReview = () => {
  const { modalVisible, setModalVisible } = useContext(ModalVisibleContext);
  const {
    type,
    data: { review: currentReview, reviewId },
  } = modalVisible;
  const [review, setReview] = useState(currentReview);
  const [preview, setPreview] = useState(null);
  const { title, content } = review;
  // to do: 수정 로직
  // edit review 모달을 띄워주는 부분에서 review 값 받아와야함
  console.log(review);

  if (!currentReview || !reviewId) {
    throw new Error("수정하려는 게시물 정보를 찾을 수 없습니다");
  }
  try {
    // edit
    console.log(type, title, content, reviewId);
  } catch (error) {
    alert(error);
  }

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
          <ReviewTitle review={review} />
          {/* 이름이 없어 왜 ?? */}
        </Col>
      </ModalBodyWrapper>
    </Modal>
  );
};

export default EditReview;
