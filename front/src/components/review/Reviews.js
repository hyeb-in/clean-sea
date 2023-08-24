import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Review from "./Review";
import SpinnerWrapper from "../common/indicators/Spinner";
import NoReviewIndicator from "./NoReviewIndicator";
import * as Api from "../../Api";
import {
  HandlerEnabledContext,
  ModalVisibleContext,
  UserStateContext,
} from "../../App";
import ActionSelectorModal from "../common/popup/ActionSelectorModal";
import { MODAL_TYPE } from "../../constants";
import EditReview from "./EditReview";
import FloatingReview from "./comment/FloatingReview";

const Reviews = ({ reviews, setReviews }) => {
  const { setIsHandlerEnabled } = useContext(HandlerEnabledContext);
  const { user: loggedInUser } = useContext(UserStateContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const { modalVisible } = useContext(ModalVisibleContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!loggedInUser) {
          const res = await Api.get("reviews/reviewList");
          setIsHandlerEnabled(true);
          setReviews(res.data);
          setIsLoaded(true);
          return;
        }
        const getLoggedInUsersList = await Api.get("reviews/reviewListLogin");
        console.log(getLoggedInUsersList);
        setIsHandlerEnabled(true);
        setReviews(getLoggedInUsersList.data);
        setIsLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setIsHandlerEnabled, setReviews, loggedInUser]);

  return (
    <>
      <Container className="py-3">
        <Row xs={1}>
          {/* to do: 서버 에러 났을 경우 알려주기 -> 해결 방안 보여주기 */}
          {!isLoaded && <SpinnerWrapper text="로딩 중..." />}
          {isLoaded &&
            reviews?.length > 0 &&
            reviews.map((review) => (
              <Col
                key={review._id}
                className="d-flex justify-content-center align-items-center"
              >
                <Review review={review} setReviews={setReviews} />
              </Col>
            ))}
          {isLoaded && reviews?.length === 0 && <NoReviewIndicator />}
        </Row>
      </Container>
      {/* 1. isActionSelectorVisible, setActionSelectorVisible 상태관리 useContext */}
      {/* 2. 삭제, 취소, 수정 띄우는 ActionSelectorModal */}
      {/* 3. 커멘트 수정 -> ActionSelectorModal 없애고 -> FloatingReviewModal */}

      {/* 모달1. edit review 수정, 삭제, 취소 선택 모달창 띄우기 */}
      {modalVisible.type === MODAL_TYPE.actionSelector && (
        <ActionSelectorModal />
      )}

      {/* 모달2. comments get, post, 댓글 전체 볼 수 있는 창 띄우기 */}
      {/* delete comment는 actionselector에서 처리한다 */}
      {modalVisible.type === MODAL_TYPE.floatingReview && <FloatingReview />}

      {/* 모달3. review 수정하기 폼 모달 */}
      {modalVisible.type === MODAL_TYPE.editReview && (
        <EditReview
          headerTitle="수정하기"
          reviews={reviews}
          setReviews={setReviews}
        />
      )}
    </>
  );
};

export default Reviews;
