import React, { useContext } from "react";
import { ListGroup, Modal } from "react-bootstrap";
import { ModalVisibleContext } from "../../App";
import { MODAL_TYPE } from "../../constants";
import * as Api from "../../Api";

// export const MODAL_TYPE = {
//   floatingReview: "FLOATING_REVIEW",
//   actionSelector: "ACTION_SELECTOR",
//   addReview: "ADD_REVIEW",
//   editReview: "EDIT_REVIEW_FORM",
// };

/**
 * 수정, 삭제, 취소 선택하는 모달창
 *  초기값
 *  const [modalVisible, setModalVisible] = useState({
 *   type: MODAL_TYPE.floatingReview,      // 위의 MODAL_TYPE enum 참고
 *   isVisible: false, // 모달창 show 판단 기준
 *   data: null,  // 다른 곳으로 보내줄 데이터를 객체 형식으로 작성
 *  });
 * 
 * 사용 예시 const { modalVisible, setModalVisible } = useContext(ModalVisibleContext);
 * 
 *   setModalVisible({
          type: null,
          isVisible: false,
          data: null,
            })
 * 
 * 
 */
const ActionSelectorModal = () => {
  const { modalVisible, setModalVisible } = useContext(ModalVisibleContext);
  // user가 있는지, 유저 author인지 확인하는 로직은 모달로 넘어오기 전에 판단한다

  const deleteById = async (data) => {
    try {
      const { reviewId, commentId } = data;
      const path = reviewId ? "reviews/" : "comments";
      const id = reviewId ? reviewId : commentId;
      const res = await Api.delete(`${path}/${id}`);
      if (!res.status === 204) {
        throw new Error("failed");
      }
      setModalVisible({
        type: null,
        isVisible: false,
        data: null,
        // to do: set reviews state  ||  set comments state ????
        // 전역으로 관리 해야하는 건가?
      });
      alert("성공");
    } catch (error) {
      alert(error);
      // to do: 에러 메세지!_!
    }
  };

  return (
    <Modal
      show={modalVisible.isVisible}
      onHide={() =>
        setModalVisible({ type: null, isVisible: false, data: null })
      }
      backdrop="true"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter" //??????
      centered
    >
      {/* to do: refactoring */}
      <ListGroup className="text-center">
        <ListGroup.Item
          key="edit"
          action
          onClick={() =>
            setModalVisible({
              ...modalVisible,
              type: MODAL_TYPE.editReview,
            })
          }
        >
          수정
        </ListGroup.Item>
        <ListGroup.Item
          key="del"
          action
          className="delete"
          onClick={() => {
            // edit인지 delete인지 판단하는 로직 필요할 수도 ??
            if (!modalVisible.data.commentId && !modalVisible.data.reviewId) {
              // 어떤 로직으로 들어온 건지 찾아서 에러메세지 띄워주기
              alert("아무 정보가 없음. 지우거나 수정 불가");
            } else {
              // commentId가 있다면 comment를 삭제
              deleteById(modalVisible.data);
            }
            // 정보를 가져오지 못해서 실패할지라도 모달 제거를 위해서 업데이트해준다
            setModalVisible({
              type: null,
              isVisible: false,
              data: null,
            });
          }}
        >
          삭제
        </ListGroup.Item>
        <ListGroup.Item
          key="cancel"
          action
          onClick={() => {
            setModalVisible({ type: null, isVisible: false, data: null });
          }}
        >
          취소
        </ListGroup.Item>
      </ListGroup>
    </Modal>
  );
};

export default ActionSelectorModal;
