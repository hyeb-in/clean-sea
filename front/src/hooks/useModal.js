import { useContext, useState } from "react";
import { ModalVisibleContext } from "../App";
import ModalBodyWrapper from "../components/common/layout/ModalBodyWrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBomb } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import ConfirmDeleteModal from "../components/common/popup/ConfirmDeleteModal";

export const MODAL_TYPE = {
  commentsList: "COMMENTS_LIST",
  actionSelector: "ACTION_SELECTOR",
  addReview: "ADD_REVIEW",
  editReview: "EDIT_REVIEW_FORM",
  deleteReview: "DELETE_REVIEW",
  editComment: "EDIT_COMMENT",
  deleteComment: "DELETE_COMMENT",
};

/**
 * @description 모달창 열고 닫는 용도! 어떤 모달창을 열지 전달. 모달창 안에서 필요한 정보가 있다면 전달
 * @type (type: MODAL_TYPE.type)
 *
 */
const useModal = () => {
  const { modalVisible, setModalVisible } = useContext(ModalVisibleContext);
  const [editedReview, setEditedReview] = useState({ title: "", content: "" });

  const closeModal = () => {
    setModalVisible({
      type: null,
      isVisible: false,
      data: null,
    });
  };

  const openModal = (type, data) => {
    return setModalVisible({
      type,
      isVisible: true,
      data,
    });
  };

  const showServerErrorModal = (show) => {
    return (
      <ModalBodyWrapper show={show} title="게시물을 업로드하지 못했습니다">
        <FontAwesomeIcon icon={faBomb} className="indicator-success" />
      </ModalBodyWrapper>
    );
  };

  const showSuccessMsgModal = (show) => {
    return (
      <ModalBodyWrapper show={show} title="게시물이 공유되었습니다">
        <FontAwesomeIcon icon={faCircleCheck} className="indicator-success" />
      </ModalBodyWrapper>
    );
  };

  const showDeleteConfirmModal = (
    showConfirmModal,
    setShowConfirmModal,
    closeModal
  ) => {
    return (
      <ConfirmDeleteModal
        show={showConfirmModal}
        setShowConfirmModal={setShowConfirmModal}
        closeReviewFormModal={closeModal}
      />
    );
  };

  return {
    editedReview,
    setEditedReview,
    modalVisible,
    setModalVisible,
    closeModal,
    openModal,
    showServerErrorModal,
    showSuccessMsgModal,
    showDeleteConfirmModal,
  };
};

export default useModal;
