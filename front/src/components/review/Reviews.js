import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import * as Api from "../../Api";
import SpinnerWrapper from "../Spinner";
import { useNavigate } from "react-router-dom";

const Reviews = ({ setShowUploadForm }) => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Api.get("reviews/reviewList");
        if (res.statusText !== "OK") throw new Error("서버 에러 발생");
        // data 0이라면?
        // 로딩 indicator 만들기
        // 프로필 클릭시 /users/:id로 이동
        setReviews([]);
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
            <Container
              className="d-flex flex-column justify-content-center align-items-center"
              style={{ width: "100%", height: "calc(100vh - 20px)" }}
            >
              <Card style={{ width: "18rem", padding: "30px" }}>
                <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                  <Card.Title>작성된 리뷰가 없습니다</Card.Title>
                  <Card.Text
                    style={{
                      margin: "0 0 50px 0",
                      display: "flex",
                      alignItems: "center",
                      justifyItems: "center",
                    }}
                  >
                    첫번째 게시물을 작성해보세요
                  </Card.Text>
                  {/* 클릭하면 setShowModal */}

                  {loggedInUser ? (
                    <Button
                      variant="primary"
                      onClick={() => setShowUploadForm(true)}
                    >
                      글 작성하기
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={() => navigate("/login")}
                    >
                      로그인
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </Container>
          )}
        </Row>
      </Container>
    </>
  );
};

export default Reviews;
