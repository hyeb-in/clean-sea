import { TOAST_POPUP_STATUS } from "../../constants";

const validationReview = (user, userInputValues) => {
  const isTitleInvalid = userInputValues.title.length < 4;
  const isContentInvalid = userInputValues.content.length < 4;
  const isTooLong = userInputValues.content.length > 300;

  if (userInputValues.content.length > 300) {
    return {
      message: "내용이 너무 깁니다",
      status: TOAST_POPUP_STATUS.alert,
    };
  }
  if (!user) {
    return {
      message: "로그인 한 유저만 사용할 수 있습니다",
      status: TOAST_POPUP_STATUS.error,
    };
  }
  if (isTitleInvalid) {
    return {
      message: "제목은 4글자 이상 작성해주세요",
      status: TOAST_POPUP_STATUS.alert,
    };
  }
  if (isContentInvalid) {
    return {
      message: "내용은 4글자 이상 작성해주세요",
      status: TOAST_POPUP_STATUS.alert,
    };
  }
  if (isTooLong) {
    return {
      message: "내용이 너무 깁니다",
      status: TOAST_POPUP_STATUS.alert,
    };
  }
  return null;
};

export default validationReview;
