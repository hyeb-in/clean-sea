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
  // commentId가 있다면 comment를 삭제 -----> comment 수정은 Comment 컴포넌트에서 해결하는 걸로 바뀜. 수정사항 반영할 것
  // reviewId가 있다면 reviewId를 삭제
  const { closeModal, openModal, modalVisible } = useModal();
  // 현 상황에선 edit된 상태 반영하기 위해 setReviews를 받아오기보단, 모달창을 닫은 후 새로 데이터를 받아오는 방법도 있음
  const review = modalVisible?.data?.review;
  const commentId = modalVisible?.data?.commentId;
  const setReviews = modalVisible?.data?.setReviews;
  const setComments = modalVisible?.data?.setComments;
  const setNewComments = modalVisible?.data?.setNewComments;
  const setCommentCount = modalVisible?.data?.setCommentCount;
  console.log(modalVisible.data);
  const editReview = () => {
    if (review) {
      // 임시로 addReview로 보냄-> EDIT REVIEW data
      openModal(MODAL_TYPE.editReview, {
        ...modalVisible.data,
        review,
      });
    }
  };
  // => 댓글 수정은 모달창 아니고 그냥 review 컨테이너 안에서 해결

  const deleteById = async () => {
    try {
      if (!commentId && !review) throw new Error("정보를 찾을 수 없습니다");
      // comment OR review 이기때문에 if문 제거하지 말 것!!

      // 댓글 삭제
      if (commentId) {
        const res = await Api.delete(`comments/${commentId}`);
        if (!res.ok) {
          throw new Error("failed");
        }
        // 글 생성 후 바로 댓글 모달창 들어와서 수정 혹은 삭제하려고하면 버그있음
        setComments((current) => {
          return current.filter((comment) => comment._id !== commentId);
        });
        if (setNewComments) {
          setNewComments((current) => {
            return current.filter((comment) => comment._id !== commentId);
          });
        }
        console.log(setCommentCount);
        setCommentCount((current) => current - 1);

        return closeModal();
      }

      // 리뷰 삭제 로직 -->> review가 있는지 체크 해야함 (뭔가 꼬여있음 주의)
      if (review) {
        const res = await Api.delete(`reviews/${review._id}`);
        if (!res.ok) {
          throw new Error("failed");
        }
        setReviews((current) => {
          const currentReviews = [...current];
          return currentReviews.filter((item) => item._id !== review._id);
        });
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
      centered
    >
      <ListGroup className="text-center">
        {review && (
          <ListGroup.Item action onClick={editReview}>
            수정
          </ListGroup.Item>
        )}

        <ListGroup.Item action className="delete" onClick={deleteById}>
          삭제
        </ListGroup.Item>
        <ListGroup.Item action onClick={closeModal}>
          취소
        </ListGroup.Item>
      </ListGroup>
    </Modal>
  );
};

export default ActionSelectorModal;
