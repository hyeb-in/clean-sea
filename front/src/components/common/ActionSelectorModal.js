import React, { useContext } from "react";
import { ListGroup, Modal } from "react-bootstrap";
import * as Api from "../../Api";
import { EditFormContext } from "../../App";

/**
 * @param "취소, 수정, 삭제" 등 유저 입력을 받는 모달창
 */
const ActionSelectorModal = ({
  show,
  isActionModalVisible,
  setIsActionModalVisible,
  reviewId,
  setReviews,
}) => {
  const { setIsEditFormVisible } = useContext(EditFormContext);

  const deleteReview = async (reviewId) => {
    if (isActionModalVisible) {
      setIsActionModalVisible(false);
    }
    try {
      const res = await Api.delete(`reviews/${reviewId}`);
      // to do: error handle
      if (!res.statusText === "OK") throw new Error("서버 에러 받아오기");
      setReviews((current) => {
        return current.filter((review) => review._id !== reviewId);
      });
    } catch (err) {
      console.error(err);
      // to do
    }
  };
  return (
    <Modal
      show={show}
      onHide={() => setIsActionModalVisible(false)}
      backdrop="true"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ListGroup className="text-center">
        <ListGroup.Item
          key="edit"
          action
          onClick={() => {
            setIsActionModalVisible(false);
            setIsEditFormVisible(true);
          }}
        >
          수정
        </ListGroup.Item>
        <ListGroup.Item
          key="del"
          action
          style={{ color: "red" }}
          onClick={() => deleteReview(reviewId)}
        >
          삭제
        </ListGroup.Item>
        <ListGroup.Item
          key="cancel"
          action
          onClick={() => setIsActionModalVisible(false)}
        >
          취소
        </ListGroup.Item>
      </ListGroup>
    </Modal>
  );
};

export default ActionSelectorModal;
