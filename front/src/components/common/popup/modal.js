import { MODAL_TYPE } from "../../../constants";

export const modal = {
  close: { state: null, isVisible: null, data: null },
  open: (modalType, isVisible, data) => ({
    type: modalType,
    isVisible,
    data,
    // data: {
    //   review,
    //   setNewComments,
    //   setReviews,
    // },
  }),
};
