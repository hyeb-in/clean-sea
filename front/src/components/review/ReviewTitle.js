import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Container } from "react-bootstrap";
import Avatar from "../common/Avatar";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { ModalVisibleContext, UserStateContext } from "../../App";
import { MODAL_TYPE } from "../../constants";

const ReviewTitle = ({ children, review }) => {
  const navigate = useNavigate();
  const { user: loggedInUser } = useContext(UserStateContext);
  const { setModalVisible } = useContext(ModalVisibleContext);
  const isMyReview = loggedInUser && loggedInUser._id === review?.author;
  console.log(review);
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
            onClick={() =>
              setModalVisible({
                type: MODAL_TYPE.actionSelector,
                isVisible: true,
                data: {
                  reviewId: review._id,
                  review, // edit form 초기값을 위해서 필요
                },
              })
            }
          >
            <FontAwesomeIcon icon={faEllipsis} />
          </Button>
        )}
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
