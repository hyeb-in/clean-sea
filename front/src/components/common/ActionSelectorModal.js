import React, { useContext, useState } from "react";
import { ListGroup, Modal } from "react-bootstrap";
import * as Api from "../../Api";
import { EditFormContext, UserStateContext } from "../../App";
import ToastWrapper from "./ToastWrapper";

/**
 * @param "취소, 수정, 삭제" 등 유저 입력을 받는 모달창
 */
const ActionSelectorModal = ({
  show,
  isActionModalVisible,
  setIsActionModalVisible,
  reviewId,
  authorId,
  setReviews,
}) => {
  const { user: loggedInUser } = useContext(UserStateContext);
  const { setIsEditFormVisible } = useContext(EditFormContext);
  const [toastMsg, setToastMsg] = useState("");

  // 결과 토스트 팝업 알림: 삭제 성공 혹은 에러
  const deleteReview = async (reviewId) => {
    if (isActionModalVisible) {
      setIsActionModalVisible(false);
    }
    if (loggedInUser._id !== authorId) {
      return setToastMsg("다른사람의 게시물을 삭제할 수 없습니다");
    }
    try {
      const res = await Api.delete(`reviews/${reviewId}`);
      // to do: error handle
      if (!res.statusText === "OK") throw new Error("서버 에러 받아오기");
      setReviews((current) => {
        return current.filter((review) => review._id !== reviewId);
      });
      setToastMsg("게시물이 삭제되었습니다");
    } catch (err) {
      setToastMsg(err);
    }
  };

  const editReview = () => {
    if (loggedInUser._id !== authorId) {
      setIsActionModalVisible(false);
      return setToastMsg("다른사람의 게시물을 수정할 수 없습니다");
    }
    setIsActionModalVisible(false);
    setIsEditFormVisible(true);
  };
  return (
    <>
      <Modal
        show={show}
        onHide={() => setIsActionModalVisible(false)}
        backdrop="true"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <ListGroup className="text-center">
          <ListGroup.Item key="edit" action onClick={editReview}>
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
      {toastMsg && (
        <ToastWrapper
          onClose={() => setToastMsg("")}
          text={toastMsg}
          bg="warning"
          position="bottom-center"
        />
      )}
    </>
  );
};

export default ActionSelectorModal;
