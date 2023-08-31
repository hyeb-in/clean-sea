import React, { useCallback, useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import SpinnerWrapper from "../common/indicators/Spinner";
import NoReviewIndicator from "../common/indicators/NoReviewIndicator";
import { ModalVisibleContext, UserStateContext } from "../../App";
import ActionSelectorModal from "../common/popup/ActionSelectorModal";
import CommentsModal from "./comment/CommentsModal";
import Review from "./layout/Review";
import { MODAL_TYPE } from "../../hooks/useModal";
import * as Api from "../../Api";
import useToast from "../../hooks/useToast";
import ToastWrapper from "../common/popup/ToastWrapper";
import { TOAST_POPUP_STATUS } from "../../constants";

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

  // deps에 fetchData 포함시키면 무한요청 날림
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 로그인 유저가 있다면 iLiked 포함된 전체 리뷰를 받아온다
        if (loggedInUser) {
          const res = await fetchPrivateReviews();
          if (!res.data) {
            showToastPopup(
              "데이터를 불러올 수 없습니다",
              TOAST_POPUP_STATUS.error
            );
          }
          if (reviews === res.data) return;
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
          if (reviews === res.data) return;
          setReviews(res.data);
          setIsLoaded(true);
        }
      } catch (error) {
        // showToastPopup(error, TOAST_POPUP_STATUS.error);
        console.log(error);
      }
    };
    fetchData();
  }, [
    loggedInUser,
    // modalVisible, reviews, showToastPopup, setReviews
    // 다 넣으면 다시 무한 요청..
  ]);

  // fetchData가 변경될 때마다 useEffect 내부 함수를 실행한다
  // []에 포함되어있는 게 변경되어야 fetchData가 실행된다
  // fetchData가 포함이 되어있지 않다면 loggedInUser의 상태에 따라서 실행된다

  // useEffect(() => {
  //   if (modalVisible.status === "deleted") {
  //     fetchData();
  //     // setState 대신 reviews 정보를 새로 받아오는 방법
  //   }
  //   // 댓글 삭제 후 modalVisible.status에 'deleted'를 보내준다
  //   // status에 deleted가 있다면 fetchData() -> 새로운 review list를 받아온다
  // }, [modalVisible.status, fetchData]);

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
      {/* 3. 모든 댓글 볼 수 있는 CommentsModal */}

      {/* 모달1. edit review 수정, 삭제, 취소 선택할 수 있는 모달창 띄우기 */}
      {isActionPopupOpen && <ActionSelectorModal />}

      {/* 모달2. comments get, post, 댓글 전체 볼 수 있는 창 띄우기 */}
      {/* delete comment는 actionselector에서 처리한다 */}
      {isCommentListPopupOpen && <CommentsModal />}
      {/* 모달3. review 수정하기 폼 모달 */}
      {/* {isEditReviewPopupOpen && (
        <EditReview
          userInputValues={userInputValues}
          setUserInputValues={setUserInputValues}
        />
      )} */}
    </>
  );
};

export default ReviewsList;
