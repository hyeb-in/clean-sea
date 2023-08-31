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

export const IS_LIKE = {
  yes: "yes",
  no: "no",
  removed: "Like removed",
  added: "Like added",
};

export const RESULT_ENUM = {
  NOT_YET: "작성중",
  UPLOADING: "업로드 중",
  SEND: "완료",
  FAIL: "실패",
  SUCCESS: "성공",
};

export const DEFAULT_AVATAR = "/image/icon.png";
export const DEFAULT_IMAGE_URL = "/image/imageLoading.png";
