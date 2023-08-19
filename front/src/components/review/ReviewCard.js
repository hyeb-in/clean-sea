import React, { useContext, useState } from "react";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import Avatar from "../Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import ModalWrapper from "../ModalWrapper";
import { UserStateContext } from "../../App";
import * as Api from "../../Api";
import ReviewForm from "./ReviewForm";
import { useNavigate } from "react-router-dom";

// get review list -> 보여지는 하나의 리뷰 카드가 이 컴포넌트
const ReviewCard = ({ review, setReviews }) => {
  const { user: loggedInUser } = useContext(UserStateContext);
  const navigate = useNavigate();
  const [isActionModalVisible, setIsActionModalVisible] = useState(false);
  const [isEditingModalVisible, setIsEditingModalVisible] = useState(false);
  const { _id: reviewId, author, title, content, createdAt, imageUrl } = review;
  const [error, setError] = useState(null);

  const handleClose = () => setIsActionModalVisible(false);

  const showEditForm = async () => {
    setIsActionModalVisible(false);
    setIsEditingModalVisible(true);
  };

  const deleteReview = async (reviewId) => {
    if (isActionModalVisible) {
      setIsActionModalVisible(false);
    }
    try {
      const res = await Api.delete(`reviews/${reviewId}`);
      // to do: error handle
      if (!res.statusText === "OK") throw new Error("서버 에러 받아오기");
      setReviews((current) => {
        return current.filter((review) => review._id !== reviewId);
      });
    } catch (err) {
      setError(err);
    }
  };

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
                  onClick={() => setIsActionModalVisible(!isActionModalVisible)}
                >
                  <FontAwesomeIcon icon={faEllipsis} />
                </Button>
              )}
              <ModalWrapper show={isActionModalVisible} onHide={handleClose}>
                <ListGroup className="text-center">
                  <ListGroup.Item key="edit" action onClick={showEditForm}>
                    수정
                  </ListGroup.Item>
                  <ListGroup.Item
                    key="del"
                    action
                    style={{ color: "red" }}
                    onClick={() => deleteReview(reviewId)}
                  >
                    삭제
                  </ListGroup.Item>
                  <ListGroup.Item
                    key="cancel"
                    action
                    onClick={() =>
                      setIsActionModalVisible(!isActionModalVisible)
                    }
                  >
                    취소
                  </ListGroup.Item>
                </ListGroup>
              </ModalWrapper>
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
      {isEditingModalVisible && (
        <ReviewForm
          showModal={isEditingModalVisible}
          setShowModal={setIsEditingModalVisible}
          headerTitle="게시물 수정하기"
          currentFormData={review}
          setReviews={setReviews}
        />
      )}
    </>
  );
};

export default ReviewCard;
