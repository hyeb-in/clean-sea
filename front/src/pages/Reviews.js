import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ReviewCard from "../components/review/ReviewCard";
import SpinnerWrapper from "../components/common/Spinner";
import NoReviewIndicator from "../components/review/NoReviewIndicator";
import * as Api from "../Api";

const Reviews = ({ reviews, setReviews }) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Api.get("reviews/reviewList");
        if (res.statusText !== "OK") throw new Error("서버 에러 발생");
        // data 0이라면?
        // 로딩 indicator 만들기
        // 프로필 클릭시 /users/:id로 이동
        setReviews(res.data);
        setIsLoaded(true);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [setReviews]);

  return (
    <>
      <Container className="py-3">
        <Row xs={1} md={2} lg={3}>
          {!isLoaded && <SpinnerWrapper />}
          {isLoaded &&
            reviews?.length > 0 &&
            reviews.map((review) => (
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
    </>
  );
};

export default Reviews;
