import { ListGroup } from "react-bootstrap";
import ModalWrapper from "../ModalWrapper";
import * as Api from "../../Api";

// 취소, 수정, 삭제 등 유저 입력을 받는 모달창
const ActionSelectorModal = ({
  handleClose,
  isActionModalVisible,
  setIsActionModalVisible,
  setIsEditingModalVisible,
  reviewId,
  setReviews,
  setError,
}) => {
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
      setError(err);
    }
  };
  return (
    <ModalWrapper show={isActionModalVisible} onHide={handleClose}>
      <ListGroup className="text-center">
        <ListGroup.Item
          key="edit"
          action
          onClick={() => {
            setIsActionModalVisible(false);
            setIsEditingModalVisible(true);
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
    </ModalWrapper>
  );
};

export default ActionSelectorModal;
