import React, { useEffect, useState } from "react";
import ReviewCard from "../components/review/ReviewCard";
import { Col, Container, Row } from "react-bootstrap";
import * as Api from "../Api";

const Network = () => {
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Api.get("reviews/reviewList");
        if (res.statusText !== "OK") throw new Error("서버 에러 발생");
        console.log(res.data);
        setReviews(res.data);
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
          {reviews?.length > 0 &&
            reviews.map((review) => (
              <Col
                key={review._id}
                className="d-flex justify-content-center align-items-center"
              >
                <ReviewCard review={review} setReviews={setReviews} />
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
};

export default Network;
