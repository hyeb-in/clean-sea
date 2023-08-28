import React from "react";
import { ListGroup, Modal } from "react-bootstrap";
import useModal, { MODAL_TYPE } from "../../../hooks/useModal";
import * as Api from "../../../Api";

/**
 * 수정, 삭제, 취소 선택하는 모달창 --- 수정 중
 *
 *
 *
 *
 */
const ActionSelectorModal = () => {
  // commentId가 있다면 comment를 삭제 -----> comment 삭제는 Comment 컴포넌트에서 해결하는 걸로 바뀜. 수정사항 반영할 것
  // reviewId가 있다면 reviewId를 삭제
  const { closeModal, openModal, modalVisible } = useModal();

  const review = modalVisible?.data?.review;
  const setReviews = modalVisible?.data?.setReviews;
  const commentId = modalVisible?.data?.commentId;
  const editCommentData = modalVisible?.data?.currentComment;

  const onEdit = () => {
    console.log(modalVisible, "from actionselector");

    if (review && !editCommentData) {
      openModal(MODAL_TYPE.editReview, {
        ...modalVisible.data,
        review,
      });
    } else if (editCommentData) {
      openModal(MODAL_TYPE.commentsList, {
        ...modalVisible.data,
      });
    }
    // 수정은 모달창 아니고 그냥 review 컨테이너 안에서 해결.
  };

  const deleteById = async () => {
    try {
      if (!review._id) throw new Error("정보를 찾을 수 없습니다");

      if (review) {
        const res = await Api.delete(`reviews/${review._id}`);
        if (!res.ok) {
          throw new Error("failed");
        }
        setReviews((current) => {
          const currentReviews = [...current];
          return currentReviews.filter((item) => item._id !== review._id);
        });
      } else if (commentId) {
        // delete comment
        const res = await Api.delete(`comments/${commentId}`);
        if (!res.ok) {
          throw new Error("failed");
        }
        // 성공메세지 출력
      }
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const isActionPopupOpen = modalVisible.type === MODAL_TYPE.actionSelector;

  return (
    <Modal
      show={isActionPopupOpen}
      onHide={closeModal}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter" // to do: 정체가 뭐임
      centered
    >
      <ListGroup className="text-center">
        <ListGroup.Item action onClick={onEdit}>
          수정
        </ListGroup.Item>

        <ListGroup.Item action className="delete" onClick={deleteById}>
          삭제
        </ListGroup.Item>
        <ListGroup.Item action onClick={() => closeModal()}>
          취소
        </ListGroup.Item>
      </ListGroup>
    </Modal>
  );
};

export default ActionSelectorModal;
