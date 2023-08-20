import React, { useContext, useState } from "react";
import { ListGroup, Modal } from "react-bootstrap";
import * as Api from "../../Api";
import { EditFormContext } from "../../App";
import ToastWrapper from "./Toast";

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
  const [toastMsg, setToastMsg] = useState("");
  //       {/* 결과 토스트 팝업 알림: 삭제되었습니다 */}

  const deleteReview = async (reviewId) => {
    if (isActionModalVisible) {
      setIsActionModalVisible(false);
    }
    try {
      const res = await Api.delete(`reviews/${reviewId}`);
      // to do: error handle
      if (res) {
        throw new Error("hi");
      }
      if (!res.statusText === "OK") throw new Error("서버 에러 받아오기");
      setReviews((current) => {
        return current.filter((review) => review._id !== reviewId);
      });
      setToastMsg("게시물이 삭제되었습니다");
    } catch (err) {
      console.error(err);
      // {message, name, code, config, request, response}
      setToastMsg(err.message);
      // to do
    }
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
      {toastMsg && (
        <ToastWrapper onClose={() => setToastMsg("")} text={toastMsg} />
      )}
    </>
  );
};

export default ActionSelectorModal;
