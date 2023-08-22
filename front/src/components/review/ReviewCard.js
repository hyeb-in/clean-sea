import React, { useContext, useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import {
  HandlerEnabledContext,
  IsReviewModalVisibleContext,
  UserStateContext,
} from "../../App";
import CarouselWrapper from "../common/Carousel";
import ReviewTitle from "./ReviewTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import Comment from "./Comment";
import * as Api from "../../Api";
import ToastWrapper from "../common/ToastWrapper";
import { TOAST_POPUP_POSITION, TOAST_POPUP_STATUS } from "../../constants";

// get review list -> 보여지는 하나의 리뷰 카드가 이 컴포넌트
const ReviewCard = ({ review, setReviews, setShowingReview }) => {
  const {
    _id: reviewId,
    author: authorId,
    title,
    content,
    createdAt,
    userName,
    uploadFile,
    comments,
    likeCount,
  } = review;
  const { isReviewModalVisible, setIsReviewModalVisible } = useContext(
    IsReviewModalVisibleContext
  );
  const { isHandlerEnabled, setIsHandlerEnabled } = useContext(
    HandlerEnabledContext
  );
  const { user: loggedInUser } = useContext(UserStateContext);
  const [selectedReview, setSelectedReview] = useState(false);
  const [comment, setComment] = useState("");
  const [toast, setToast] = useState({
    text: "",
    position: null,
    status: null,
  });
  //  text, position, status
  // get user avatar >> get 'users/id' ?

  const isValid = comment.length > 0 && comment.length < 100;

  const currentTime = new Date(); // 현재 시간
  const createdAtgg = new Date(createdAt); // 주어진 시간

  const timeDifference = currentTime.getTime() - createdAtgg.getTime(); // 밀리초 단위의 차이

  const minutesPassed = Math.floor(timeDifference / (1000 * 60));
  const hoursPassed = Math.floor(timeDifference / (1000 * 60 * 60)); // 시간으로 변환
  const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // 일자로 변환

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!loggedInUser) {
        // to do: 유저 없음 ?? 로그인화면으로 이동
        return setToast({
          text: "로그인 한 유저만 작성할 수 있습니다",
          status: TOAST_POPUP_STATUS.alert,
          position: TOAST_POPUP_POSITION.middleCenter,
        });
      }
      // 글자수 제한: 1글자이상 100자이하
      if (!isValid) {
        return setToast({
          text:
            comment === ""
              ? "1글자 이상 입력해주세요"
              : "100자 이하로 입력해주세요",
          status: TOAST_POPUP_STATUS.alert,
          position: TOAST_POPUP_POSITION.middleCenter,
        });
      }
      const res = await Api.post(`comments/${reviewId}`, { content: comment });
      console.log(res);
    } catch (error) {
      // 서버 error 핸들링
      console.log(error);
    }
  };
  const url = [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=873&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=873&q=80",
  ];

  return (
    <Card bg="light" key={reviewId} sm="12" md="6" lg="4" className="mb-5">
      <Card.Header>
        <ReviewTitle review={review} setReviews={setReviews} />
      </Card.Header>
      <Card.Body>
        {uploadFile.length === 0 && <CarouselWrapper imageUrls={url} />}
        {uploadFile.length > 0 && <CarouselWrapper imageUrls={uploadFile} />}
        {/* 좋아요 갯수 */}
        <Row>
          <Col className="comment__author">{userName}</Col>
          <Col xs="auto">
            <FontAwesomeIcon
              icon={faHeart}
              onClick={() => {
                window.alert("좋아요 기능 추가하기");
              }}
            />
          </Col>
          {likeCount.length > 0 && `좋아요 ${likeCount}개`}
        </Row>
        <Row xs="auto">
          <span className="comment__title">
            {`${title}  `}
            <span className="comment__content">{content}</span>
          </span>
          {/* to do: 글자수 줄이기 >> 더보기 (...) */}
        </Row>
        <Card.Text className="d-flex justify-content-end">
          {minutesPassed < 1 && "방금 전"}
          {minutesPassed < 60 && minutesPassed > 0 && `${minutesPassed}분 전`}
          {minutesPassed >= 60 && hoursPassed < 24 && `${hoursPassed}시간 전`}
          {minutesPassed >= 60 && hoursPassed >= 24 && `${daysPassed}일 전`}
        </Card.Text>
        {/* 댓글 모두보기: 클릭하면 모달창으로 리뷰 카드 띄우기 */}
        {!isReviewModalVisible && (
          <Card.Text
            onClick={() => {
              setShowingReview(review);
              setIsReviewModalVisible(true);
              setSelectedReview(review);
            }}
            className="link"
          >
            {comments.length > 3 && `댓글 ${comments.length}개 모두 보기}`}
            {comments.length <= 3 &&
              comments.map((comment) => <Comment comment={comment} />)}
          </Card.Text>
        )}
      </Card.Body>
      <Card.Footer>
        <Form.Label>댓글 달기...</Form.Label>
        <Form onSubmit={handleSubmit}>
          <Form.Control
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Form>
      </Card.Footer>
    </Card>
  );
};

export default ReviewCard;
