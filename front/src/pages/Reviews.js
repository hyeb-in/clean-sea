import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ReviewCard from "../components/review/ReviewCard";
import SpinnerWrapper from "../components/common/Spinner";
import NoReviewIndicator from "../components/review/NoReviewIndicator";
import * as Api from "../Api";
import ToastWrapper from "../components/common/ToastWrapper";

const Reviews = ({ reviews, setReviews }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Api.get("reviews/reviewList");
        // 프로필 클릭시 /users/:id로 이동
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
            // 임시 코드: 백엔드에서 데이터 역순으로 받아와야 함
            reviews
              .slice()
              .reverse()
              .map((review) => (
                <Col
                  key={review._id}
                  className="d-flex justify-content-center align-items-center"
                >
                  <ReviewCard review={review} setReviews={setReviews} />
                </Col>
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
          bg="warning"
        />
      )}
    </>
  );
};

export default Reviews;
