import { useContext } from "react";
import { ModalVisibleContext } from "../App";

const useModal = () => {
  const { setModalVisible } = useContext(ModalVisibleContext);

  const closeModal = () => {
    setModalVisible({
      type: null,
      isVisible: false,
      data: null,
    });
  };

  return { closeModal };
};

export default useModal;
