import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ReviewCard from "../components/review/ReviewCard";
import SpinnerWrapper from "../components/common/Spinner";
import NoReviewIndicator from "../components/review/NoReviewIndicator";
import * as Api from "../Api";
import ToastWrapper from "../components/common/ToastWrapper";
import ReviewModal from "../components/review/ReviewModal";
import { IsReviewModalVisibleContext } from "../App";

const Reviews = ({ reviews, setReviews }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [showingReview, setShowingReview] = useState(null);
  const { isReviewModalVisible } = useContext(IsReviewModalVisibleContext);
  // review를 받아서 Modal창 띄운다
  // comments를 받아서 같이 띄운다

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Api.get("reviews/reviewList");
        // 프로필 클릭시 /users/:id로 이동
        // to do: error handling
        if (!res) return setToastMsg("데이터를 불러올 수 없습니다");
        setReviews(res.data);
        setIsLoaded(true);
      } catch (error) {
        setToastMsg(error);
      }
    };
    fetchData();
  }, [setReviews]);

  return (
    <>
      <Container className="py-3">
        <Row xs={1} md={2} lg={3}>
          {!isLoaded && <SpinnerWrapper text="로딩 중..." />}
          {isLoaded &&
            reviews?.length > 0 &&
            reviews.map((review) => (
              <>
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
              </>
            ))}
          {isLoaded && reviews?.length === 0 && <NoReviewIndicator />}
        </Row>
      </Container>

      {/* 에러 메세지 toast pop-up으로 유저에게 알려줌 */}
      {toastMsg && (
        <ToastWrapper
          onClose={() => setToastMsg("")}
          text={toastMsg}
          position="middle-center"
          // middle-center center-center(커멘트 에러msg)
          bg="warning"
        />
      )}
      {isReviewModalVisible && (
        <ReviewModal
          showingReview={showingReview}
          setShowingReview={setShowingReview}
          setReviews={setReviews}
        />
      )}
    </>
  );
};

export default Reviews;
