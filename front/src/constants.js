import {
  faCheck,
  faCircleExclamation,
  faTriangleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const colors = {
  red: "#E3322D",
  yellow: "#F5AB2F",
  blue: "#4B89DC",
  green: "#389B34",
  white: "#E1E1E1",
  lightGray: "#B1B1B1",
  gray: "#888888",
  darkGray: "#505050",
  black: "#000000",
};
export const FOOTER_HEIGHT = "200";

// 프론트엔드 측 오류, 상태 알림 팝업
export const TOAST_POPUP_STATUS = {
  error: {
    bgColor: colors.red,
    color: colors.white,
    icon: <FontAwesomeIcon icon={faXmark} />,
  },
  alert: {
    bgColor: colors.yellow,
    color: colors.black,
    icon: <FontAwesomeIcon icon={faTriangleExclamation} />,
  },
  success: {
    bgColor: colors.green,
    color: colors.white,
    icon: <FontAwesomeIcon icon={faCheck} />,
  },
  info: {
    bgColor: colors.blue,
    color: colors.white,
    icon: <FontAwesomeIcon icon={faCircleExclamation} />,
  },
};

export const TOAST_POPUP_POSITION = {
  topStart: "top-start",
  topCenter: "top-center",
  topEnd: "top-end",
  middleStart: "middle-start",
  middleCenter: "middle-center",
  middleEnd: "middle-end",
  bottomStart: "bottom-start",
  bottomCenter: "bottom-center",
  bottomEnd: "bottom-end",
};

export const MODAL_TYPE = {
  floatingReview: "FLOATING_REVIEW",
  actionSelector: "ACTION_SELECTOR",
  addReview: "ADD_REVIEW",
  editReview: "EDIT_REVIEW_FORM",
  deleteReview: "DELETE_REVIEW",
  editComment: "EDIT_COMMENT",
  deleteComment: "DELETE_COMMENT",
};

export const IS_LIKE = {
  like: "yes",
  no: "no",
  removed: "Like removed",
  added: "Like added",
};

// export const MODAL_OPTIONS = {
//   FLOATING_REVIEW: {
//     type: MODAL_TYPE.floatingReview,
//     isVisible: false, // >> type이 있어서 굳이 필요한가 싶은데
//     data: (data) => data,
//   },
//   DESTROY_MODAL: {
//     type: null,
//     isVisible: false,
//     data: null,
//   },
// };
