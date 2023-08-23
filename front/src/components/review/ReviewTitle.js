import React, { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActionSelectorModal from "../common/ActionSelectorModal";
import { Button, Col, Container, Row } from "react-bootstrap";
import Avatar from "../common/Avatar";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { EditingDataContext, UserStateContext } from "../../App";

const ReviewTitle = ({ children, review, setReviews, className }) => {
  const navigate = useNavigate();
  const { setEditingData } = useContext(EditingDataContext);
  const { user: loggedInUser } = useContext(UserStateContext);
  const [isActionModalVisible, setIsActionModalVisible] = useState(false);
  const isMyReview = loggedInUser && loggedInUser._id === review?.author;

  return (
    <Container className="d-flex align-items-center justify-space-between link">
      <Col sm="auto" onClick={() => navigate(`/users/${review?.author}`)}>
        {/* to do: 유저 프로필 모달로 보여주기 */}
        {/* to do: get user's info -> avatar url */}
        <Avatar width="50" />
      </Col>
      <Col xs="10" className="d-flex align-items-center px-2">
        {review?.userName}
      </Col>
      {/* 로그인 유저가 작성한 글이라면 ellipsis 버튼을 보여준다 */}
      {/* 클릭하면 수정, 삭제 선택하는 모달 창을 띄운다 */}
      <Col className="flex-row-center-center" sm="auto">
        {isMyReview && (
          <Button
            variant="link"
            className="black"
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
          reviewId={review?._id}
          authorId={review?.authorId}
          handleClose={() => setIsActionModalVisible(false)}
          isActionModalVisible={isActionModalVisible}
          setIsActionModalVisible={setIsActionModalVisible}
          setReviews={setReviews}
        />
      </Col>
      {children && (
        <Col xs="auto" className="flex-row-center-center p-4">
          {children}
        </Col>
      )}
    </Container>
  );
};

export default ReviewTitle;
