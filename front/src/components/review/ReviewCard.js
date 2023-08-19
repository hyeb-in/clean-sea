import React, { useContext, useState } from "react";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import Avatar from "../common/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { EditingDataContext, UserStateContext } from "../../App";
import { useNavigate } from "react-router-dom";
import ActionSelectorModal from "../common/ActionSelectorModal";

// get review list -> 보여지는 하나의 리뷰 카드가 이 컴포넌트
const ReviewCard = ({ review, setReviews }) => {
  const { user: loggedInUser } = useContext(UserStateContext);
  const { setEditingData } = useContext(EditingDataContext);

  const [isActionModalVisible, setIsActionModalVisible] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {
    _id: reviewId,
    author: authorId,
    title,
    content,
    createdAt,
    imageUrl,
    userName,
  } = review;

  // get user avatar >> get 'users/id' ?

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
            <Col xs="auto" onClick={() => navigate(`/users/${authorId}`)}>
              {/* to do: get user's info -> avatar url */}
              <Avatar width="50" />
            </Col>
            <Col className="d-flex align-items-center px-0">
              {userName}
              {/* TO DO: 몇 일 전, 몇시간 전 */}
            </Col>

            {/* 로그인 유저가 작성한 글이라면 ellipsis 버튼을 보여준다 */}
            {/* 클릭하면 수정, 삭제 선택하는 모달 창을 띄운다 */}
            <Col className="d-flex align-items-center justify-content-end">
              {loggedInUser && loggedInUser._id === authorId && (
                <Button
                  variant="link"
                  style={{ color: "black" }}
                  onClick={() => {
                    setIsActionModalVisible(true);
                    setEditingData(review);
                  }}
                >
                  <FontAwesomeIcon icon={faEllipsis} />
                </Button>
              )}

              {/* '수정, 삭제' 선택하는 모달 창 */}
              <ActionSelectorModal
                show={isActionModalVisible}
                reviewId={reviewId}
                handleClose={() => setIsActionModalVisible(false)}
                isActionModalVisible={isActionModalVisible}
                setIsActionModalVisible={setIsActionModalVisible}
                setReviews={setReviews}
                setError={setError}
              />
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          {/* to do: 서버 image 저장 후 carousel */}
          <Image src={imageUrl} fluid />
          <Card.Title>{title}</Card.Title>
          <Card.Text>{content}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default ReviewCard;
