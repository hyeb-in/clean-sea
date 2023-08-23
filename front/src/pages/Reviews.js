import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ReviewCard from "../components/review/ReviewCard";
import SpinnerWrapper from "../components/common/Spinner";
import NoReviewIndicator from "../components/review/NoReviewIndicator";
import * as Api from "../Api";
import { HandlerEnabledContext, IsReviewModalVisibleContext } from "../App";
import { TOAST_POPUP_POSITION, TOAST_POPUP_STATUS } from "../constants";
import ToastWrapper from "../components/common/ToastWrapper";

const Reviews = ({ reviews, setReviews }) => {
  const { isHandlerEnabled, setIsHandlerEnabled } = useContext(
    HandlerEnabledContext
  );
  const [isLoaded, setIsLoaded] = useState(false);
  // const { toast, setToast } = useState();

  const [showingReview, setShowingReview] = useState(null);
  // const { isReviewModalVisible } = useContext(IsReviewModalVisibleContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Api.get("reviews/reviewList");
        // to do: 서버에러 -> 모달창으로 바꾸기

        setIsHandlerEnabled(true);
        setReviews(res.data);
        setIsLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setIsHandlerEnabled, setReviews]);

  return (
    <>
      <Container className="py-3">
        <Row xs={1} md={2} lg={3}>
          {/* to do: 서버 에러 났을 경우 알려주기 -> 해결 방안 보여주기 */}
          {!isLoaded && <SpinnerWrapper text="로딩 중..." />}
          {isLoaded &&
            reviews?.length > 0 &&
            reviews.map((review) => (
              <Col
                key={review._id}
                className="d-flex justify-content-center align-items-center"
              >
                <ReviewCard
                  review={review}
                  setReviews={setReviews}
                  setShowingReview={setShowingReview}
                />
              </Col>
            ))}
          {isLoaded && reviews?.length === 0 && <NoReviewIndicator />}
        </Row>
      </Container>
      {/* {toast && isHandlerEnabled && <ToastWrapper toast={toast} />} */}
    </>
  );
};

export default Reviews;
