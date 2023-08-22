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

// 서버 에러 상태코드
// 403 : 인증 에러 권한 없음
// 400 : 클라이언트가 잘못된 값 전달
// 500 : 서버 에러

// 상태코드 사용할 수도 있을 거 같은데
export const TOAST_POPUP_STATUS = {
  error: {
    // code: '',
    title: "Oops!",
    bgColor: colors.red,
    color: colors.white,
    icon: <FontAwesomeIcon icon={faXmark} />,
  },
  alert: {
    // code:'',
    title: "Alert!",
    bgColor: colors.yellow,
    color: colors.black,
    icon: <FontAwesomeIcon icon={faTriangleExclamation} />,
  },
  success: {
    // code:400,
    title: "",
    bgColor: colors.green,
    color: colors.white,
    icon: <FontAwesomeIcon icon={faCheck} />,
  },
  info: {
    // code: 200,
    title: "Success!",
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
