import React, { useCallback, useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import SpinnerWrapper from "../common/indicators/Spinner";
import NoReviewIndicator from "../common/indicators/NoReviewIndicator";
import { ModalVisibleContext, UserStateContext } from "../../App";
import ActionSelectorModal from "../common/popup/ActionSelectorModal";
import CommentsModal from "./comment/CommentsModal";
import Review from "./Review";
import { MODAL_TYPE } from "../../hooks/useModal";
import * as Api from "../../Api";
import useToast from "../../hooks/useToast";
import ToastWrapper from "../common/popup/ToastWrapper";
import { TOAST_POPUP_STATUS } from "../../constants";
import EditReview from "./EditReview";

const ReviewsList = ({ setReview, reviews, setReviews }) => {
  const { user: loggedInUser } = useContext(UserStateContext);
  const { modalVisible } = useContext(ModalVisibleContext);

  const isActionPopupOpen = modalVisible?.type === MODAL_TYPE.actionSelector;
  const isCommentListPopupOpen = modalVisible?.type === MODAL_TYPE.commentsList;

  const [isLoaded, setIsLoaded] = useState(false);
  const {
    showToast,
    showToastPopup,
    toastMessage,
    setShowToast,
    toastStatus,
    toastPosition,
  } = useToast();

  const fetchPrivateReviews = async () =>
    await Api.get("reviews/reviewListLogin");
  const fetchPublicReviews = async () => await Api.get("reviews/reviewList");

  const fetchData = useCallback(async () => {
    try {
      // 로그인 유저가 있다면 iLiked 포함된 전체 리뷰를 받아온다
      if (loggedInUser) {
        const res = await fetchPrivateReviews();
        console.log(res);
        if (!res.data) {
          showToastPopup(
            "유저의 데이터를 불러올 수 없습니다",
            TOAST_POPUP_STATUS.error
          );
        }
        setReviews(res.data);
        setIsLoaded(true);
      } else {
        const res = await fetchPublicReviews();
        if (!res.data) {
          showToastPopup(
            "공개된 데이터를 불러올 수 없습니다",
            TOAST_POPUP_STATUS.error
          );
        }

        setReviews(res.data);
        setIsLoaded(true);
      }
    } catch (error) {
      // showToastPopup(error, TOAST_POPUP_STATUS.error);
    }
  }, [loggedInUser, setReviews]);

  useEffect(() => {
    fetchData();
  }, [loggedInUser, setReviews, fetchData]);

  useEffect(() => {
    console.log(modalVisible);

    if (modalVisible.status === "deleted") {
      console.log("hi");
      fetchData();
      // reviews 정보를 새로 받아오는 방법
    }
  }, [modalVisible, setReviews, fetchData]);
  const isEditReviewPopupOpen = modalVisible?.type === MODAL_TYPE.editReview;

  return (
    <>
      {showToast && (
        <ToastWrapper
          setShowToast={setShowToast}
          text={toastMessage}
          status={toastStatus}
          position={toastPosition}
        />
      )}
      <Container className="py-3">
        <div xs={1}>
          {/* to do: 서버 에러 났을 경우 알려주기 -> 해결 방안 보여주기 */}
          {/* 응답 상태에 관한 메세지는 전체 하나로 합치기 */}
          {!isLoaded && <SpinnerWrapper text="로딩 중..." />}
          {isLoaded &&
            reviews?.length > 0 &&
            reviews.map((review) => (
              <div
                // to do: key 중복 없애라는 경고가 계속 발생함
                key={review._id}
                className="d-flex justify-content-center align-items-center"
              >
                <Review
                  review={review}
                  setReviews={setReviews}
                  setReview={setReview}
                />
              </div>
            ))}
          {isLoaded && reviews?.length === 0 && <NoReviewIndicator />}
        </div>
      </Container>
      {/* 1. isActionSelectorVisible, setActionSelectorVisible 상태관리 useContext */}
      {/* 2. 삭제, 취소, 수정 띄우는 ActionSelectorModal */}
      {/* 3. 커멘트 수정 -> 이미 떠있는 모달 없애고(ActionSelectorModal) -> EditCommentsModal */}

      {/* 모달1. edit review 수정, 삭제, 취소 선택할 수 있는 모달창 띄우기 */}
      {isActionPopupOpen && <ActionSelectorModal />}

      {/* 모달2. comments get, post, 댓글 전체 볼 수 있는 창 띄우기 */}
      {/* delete comment는 actionselector에서 처리한다 */}
      {isCommentListPopupOpen && <CommentsModal />}

      {/* 모달3. review 수정하기 폼 모달 */}
      {/* >>>> Review 하위 컴포넌트로 이동 */}

      {/* 모달3. review 수정하기 폼 모달 */}
      {isEditReviewPopupOpen && <EditReview />}
    </>
  );
};

export default ReviewsList;
