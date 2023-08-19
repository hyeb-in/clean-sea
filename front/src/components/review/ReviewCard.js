import React, { useContext, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Avatar from "../Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { UserStateContext } from "../../App";
// import ReviewForm from "./ReviewForm";
import { useNavigate } from "react-router-dom";
import ActionSelectorModal from "./ActionSelectorModal";

// get review list -> 보여지는 하나의 리뷰 카드가 이 컴포넌트
const ReviewCard = ({ review, setReviews, setIsEditingModalVisible }) => {
  const { user: loggedInUser } = useContext(UserStateContext);
  const navigate = useNavigate();
  const [isActionModalVisible, setIsActionModalVisible] = useState(false);
  const { _id: reviewId, author, title, content, createdAt, imageUrl } = review;
  const [error, setError] = useState(null);

  const handleClose = () => setIsActionModalVisible(false);

  return (
    <>
      <Card
        bg="light"
        key={reviewId}
        text="black"
        style={{ width: "18rem" }}
        className="mb-5"
      >
        <Card.Header>
          <Row>
            <Col xs="auto" onClick={() => navigate(`/users/${author}`)}>
              <Avatar width="50" />
            </Col>
            <Col className="d-flex align-items-center px-0">
              {author}
              {/* TO DO: 몇 일 전, 몇 시간 전 */}
            </Col>
            {/* 로그인 유저가 작성한 글이라면 수정, 삭제 모달 창을 띄운다 */}
            <Col className="d-flex align-items-center justify-content-end">
              {/*  author 값이 바뀌면 수정 되어야 함 */}
              {loggedInUser && loggedInUser._id === author && (
                <Button
                  variant="link"
                  style={{ color: "black" }}
                  onClick={() => setIsActionModalVisible(true)}
                >
                  <FontAwesomeIcon icon={faEllipsis} />
                </Button>
              )}
              <ActionSelectorModal
                reviewId={reviewId}
                handleClose={handleClose}
                isActionModalVisible={isActionModalVisible}
                setIsActionModalVisible={setIsActionModalVisible}
                setIsEditingModalVisible={setIsEditingModalVisible}
                setReviews={setReviews}
                setError={setError}
              />
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          {/* to do: 서버 image 저장 후 */}
          {/* <Image src={imageUrl} fluid /> */}
          <Card.Title>{title}</Card.Title>
          <Card.Text>{content}</Card.Text>
        </Card.Body>
      </Card>
      {/* {isEditingModalVisible && (
        <ReviewForm
          showModal={isEditingModalVisible}
          setShowModal={setIsEditingModalVisible}
          headerTitle="게시물 수정하기"
          currentFormData={review}
          setReviews={setReviews}
        />
      )} */}
    </>
  );
};

export default ReviewCard;
