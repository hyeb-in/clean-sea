import React, { useContext } from "react";
import { ListGroup, Modal } from "react-bootstrap";
import { ModalVisibleContext } from "../../../App";
import { MODAL_TYPE } from "../../../constants";
import * as Api from "../../../Api";

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
  // commentId가 있다면 comment를 삭제
  // reviewId가 있다면 reviewId를 삭제
  const { modalVisible, setModalVisible } = useContext(ModalVisibleContext);
  // user가 있는지, 유저 author인지 확인하는 로직은 모달로 넘어오기 전에 판단한다
  // 굳이 이 컴포넌트에까지 유저 정보를 가져오지 않도록한다
  const isReviewEditing = modalVisible?.data?.reviewId;
  const isCommentEditing = modalVisible?.data?.FLOATING_REVIEW_DATA;
  console.log(modalVisible.data);
  const commentId = modalVisible.data.FLOATING_REVIEW_DATA.commentId;

  const deleteById = async (data) => {
    try {
      const { reviewId } = data;
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
        // 요청 후 reviews 기존 레이아웃에 반영하기
        // reviews 값을 전역으로 관리 해야하는 건가?
      });
      alert("성공");
    } catch (error) {
      alert(error);
      // to do: 에러 메세지!_!
    }
  };
  const isActionPopupOpen = modalVisible.type === MODAL_TYPE.actionSelector;
  // 질문: 위에다 놓으면 여기서 잘 안보이는데 어차피 jsx 내부에서만 쓰일 변수라면 이곳에 작성해도 상관 없나요?

  return (
    <Modal
      show={isActionPopupOpen}
      onHide={() => {
        // 수정 클릭시 현재 가지고있는 data를 edit form에 전달해줘야함!
        // review 상세 메뉴 클릭 (review에 관한 data 전달) => (현재) => (<EditForm />에 전달)
        setModalVisible({
          type: null,
          isVisible: false,
          data: modalVisible.data,
        });
      }}
      backdrop="static"
      keyboard={false}
      aria-labelledby="contained-modal-title-vcenter" // to do: 정체가 뭐임
      centered
    >
      <ListGroup className="text-center">
        <ListGroup.Item
          // key="edit"
          action
          onClick={() => {
            // 수정하기 위해서 review 혹은 review id가 필요
            // review list -> ellipsis 클릭할 때 (<ReviewTitle /> 내부에서) data를 포함시켜서 건내준다
            // 받은 정보 + 여기서 필요한 정보를 추가해서 보내준다
            if (isReviewEditing) {
              // edit review인지 comment인지 구분해서 라우팅
              setModalVisible({
                ...modalVisible, // 받은 정보에 추가한다
                type: MODAL_TYPE.editReview,
              });
            } else if (isCommentEditing) {
              setModalVisible({
                ...modalVisible,
                type: MODAL_TYPE.floatingReview,
              });
            }

            // ActionSelector -> 실제 수정 가능한 모달 창으로 이동
            // <EditReview />
          }}
        >
          수정
        </ListGroup.Item>
        <ListGroup.Item
          key="del"
          action
          className="delete"
          onClick={() => {
            if (!modalVisible.data.commentId && !modalVisible.data.review) {
              // 어떤 로직으로 들어온 건지 찾아서 에러메세지 띄워주기
              return alert("아무 정보가 없음. 지우거나 수정 불가");
            }
            // commentId가 있다면 comment를 삭제
            // reviewId가 있다면 reviewId를 삭제
            deleteById(modalVisible.data);
          }}
        >
          삭제
        </ListGroup.Item>
        <ListGroup.Item
          key="cancel" // to do: key값 필요함 ??
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
