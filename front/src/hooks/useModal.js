import { useContext } from "react";
import { ModalVisibleContext } from "../App";

export const MODAL_TYPE = {
  floatingReview: "FLOATING_REVIEW",
  actionSelector: "ACTION_SELECTOR",
  addReview: "ADD_REVIEW",
  editReview: "EDIT_REVIEW_FORM",
  deleteReview: "DELETE_REVIEW",
  editComment: "EDIT_COMMENT",
  deleteComment: "DELETE_COMMENT",
};

/**
 * @description 모달창 열고 닫는 용도! 어떤 모달창을 열지 전달. 모달창 안에서 필요한 정보가 있다면 전달
 * @type (type: MODAL_TYPE.type) /src/constants 파일에서 import 해서 사용한다
 */
const useModal = () => {
  const { setModalVisible } = useContext(ModalVisibleContext);

  const closeModal = () => {
    setModalVisible({
      type: null,
      isVisible: false,
      data: null,
    });
  };

  const openModal = (type, data) => {
    setModalVisible({
      type,
      isVisible: true,
      data,
    });
  };
  return { closeModal, openModal };
};

export default useModal;
