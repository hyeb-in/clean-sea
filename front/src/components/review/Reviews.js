import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { Col, Container, Row } from "react-bootstrap";
import * as Api from "../../Api";
import SpinnerWrapper from "../Spinner";
import NoReviewIndicator from "./NoReviewIndicator";

// to do: setShowUploadForm -> context api ?
const Reviews = ({ setShowUploadForm }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
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
        if (res.data.loggedInUser) {
          setLoggedInUser(res.data.loggedInUser);
        }
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

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
          {isLoaded && reviews?.length === 0 && (
            <NoReviewIndicator
              loggedInUser={loggedInUser}
              setShowUploadForm={setShowUploadForm}
            />
          )}
        </Row>
      </Container>
    </>
  );
};

export default Reviews;
