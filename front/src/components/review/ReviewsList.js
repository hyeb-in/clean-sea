import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import SpinnerWrapper from "../common/indicators/Spinner";
import NoReviewIndicator from "../common/indicators/NoReviewIndicator";
import * as Api from "../../Api";
import {
  HandlerEnabledContext,
  ModalVisibleContext,
  UserStateContext,
} from "../../App";
import ActionSelectorModal from "../common/popup/ActionSelectorModal";
import EditReview from "./EditReview";
import CommentsModal from "./comment/CommentsModal";
import Review from "./Review";
import { MODAL_TYPE } from "../../hooks/useModal";

const ReviewsList = ({ reviews, setReviews }) => {
  const { user: loggedInUser } = useContext(UserStateContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const { modalVisible } = useContext(ModalVisibleContext);

  const isActionPopupOpen = modalVisible?.type === MODAL_TYPE.actionSelector;
  const isCommentListPopupOpen = modalVisible?.type === MODAL_TYPE.commentsList;
  const isEditReviewPopupOpen = modalVisible?.type === MODAL_TYPE.editReview;

  const fetchPrivateReviews = async () =>
    await Api.get("reviews/reviewListLogin");
  const fetchPublicReviews = async () => await Api.get("reviews/reviewList");

  // to do: 너무 데이터가 한 방에 많이 자주 불러와지는 거 같음
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 로그인 유저가 있다면 iLiked 포함된 전체 리뷰를 받아온다
        if (loggedInUser) {
          const res = await fetchPrivateReviews();
          if (!res.data) alert("로그인 유저의 데이터를 불러올 수 없습니다");
          setReviews(res.data);
          setIsLoaded(true);
        } else {
          const res = await fetchPublicReviews();
          if (!res.data) alert("공개된 데이터를 불러올 수 없습니다");
          setReviews(res.data);
          setIsLoaded(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [loggedInUser, setReviews]);

  return (
    <>
      <Container className="py-3">
        <div xs={1}>
          {/* to do: 서버 에러 났을 경우 알려주기 -> 해결 방안 보여주기 */}
          {/* 응답 상태에 관한 메세지는 전체 하나로 합치기 */}
          {!isLoaded && <SpinnerWrapper text="로딩 중..." />}
          {isLoaded &&
            reviews?.length > 0 &&
            reviews.map((review, index) => (
              <div
                // to do: key 중복 없애라는 경고가 계속 발생함
                key={`${review._id}-${modalVisible?.type}-${index}`}
                className="d-flex justify-content-center align-items-center"
              >
                <Review review={review} setReviews={setReviews} />
              </div>
            ))}
          {isLoaded && reviews?.length === 0 && <NoReviewIndicator />}
        </div>
      </Container>
      {/* 1. isActionSelectorVisible, setActionSelectorVisible 상태관리 useContext */}
      {/* 2. 삭제, 취소, 수정 띄우는 ActionSelectorModal */}
      {/* 3. 커멘트 수정 -> ActionSelectorModal 없애고 -> CommentsModal */}

      {/* 모달1. edit review 수정, 삭제, 취소 선택 모달창 띄우기 */}
      {isActionPopupOpen && <ActionSelectorModal />}

      {/* 모달2. comments get, post, 댓글 전체 볼 수 있는 창 띄우기 */}
      {/* delete comment는 actionselector에서 처리한다 */}
      {isCommentListPopupOpen && <CommentsModal />}

      {/* 모달3. review 수정하기 폼 모달 */}
      {isEditReviewPopupOpen && (
        <EditReview
          headerTitle="수정하기"
          reviews={reviews}
          setReviews={setReviews}
        />
      )}
    </>
  );
};

export default ReviewsList;
