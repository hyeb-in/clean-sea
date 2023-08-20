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
  const isMyReview = loggedInUser && loggedInUser._id === authorId;

  // get user avatar >> get 'users/id' ?

  const currentTime = new Date(); // 현재 시간
  const createdAtgg = new Date(createdAt); // 주어진 시간

  const timeDifference = currentTime.getTime() - createdAtgg.getTime(); // 밀리초 단위의 차이

  const minutesPassed = Math.floor(timeDifference / (1000 * 60));
  const hoursPassed = Math.floor(timeDifference / (1000 * 60 * 60)); // 시간으로 변환
  const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // 일자로 변환
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
            <Col className="d-flex align-items-center px-0">{userName}</Col>

            {/* 로그인 유저가 작성한 글이라면 ellipsis 버튼을 보여준다 */}
            {/* 클릭하면 수정, 삭제 선택하는 모달 창을 띄운다 */}
            <Col className="d-flex align-items-center justify-content-end">
              {isMyReview && (
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
                authorId={authorId}
                handleClose={() => setIsActionModalVisible(false)}
                isActionModalVisible={isActionModalVisible}
                setIsActionModalVisible={setIsActionModalVisible}
                setReviews={setReviews}
              />
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          {/* to do: 서버 image 저장 후 carousel */}
          <Image src={imageUrl} fluid />
          <Card.Title>{title}</Card.Title>
          <Card.Text>{content}</Card.Text>
          <Card.Text className="d-flex justify-content-end">
            {minutesPassed < 1 && "방금 전"}
            {minutesPassed < 60 && minutesPassed > 0 && `${minutesPassed}분 전`}
            {minutesPassed >= 60 && hoursPassed < 24 && `${hoursPassed}시간 전`}
            {minutesPassed >= 60 && hoursPassed >= 24 && `${daysPassed}일 전`}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default ReviewCard;
