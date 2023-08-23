import React, { useContext, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import CarouselWrapper from "../common/Carousel";
import ReviewTitle from "./ReviewTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import Comment from "./Comment";
import * as Api from "../../Api";
import { UserStateContext } from "../../App";

// get review list -> 보여지는 하나의 리뷰 카드가 이 컴포넌트
const ReviewCard = ({
  review,
  setReviews,
  setShowingReview,
  selectedReview,
  setSelectedReview,
}) => {
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
  const { user: loggedInUser } = useContext(UserStateContext);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const isValid = comment.length > 0 && comment.length < 100;
  const [newComments, setNewComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const isContentReduced = content?.length > 25;

  const currentTime = new Date(); // 현재 시간
  const createdAtgg = new Date(createdAt); // 주어진 시간

  const timeDifference = currentTime.getTime() - createdAtgg.getTime(); // 밀리초 단위의 차이

  const minutesPassed = Math.floor(timeDifference / (1000 * 60));
  const hoursPassed = Math.floor(timeDifference / (1000 * 60 * 60)); // 시간으로 변환
  const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // 일자로 변환

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!loggedInUser) {
        alert("유저 없음");
        // to do: 유저 없음 ?? 로그인화면으로 이동
      }
      // 글자수 제한: 1글자이상 100자이하
      if (!isValid) {
        alert("글자수 제한");
      }
      const res = await Api.post(`comments/${reviewId}`, { content: comment });
      if (!res.data) {
        alert("요청 실패");
      }

      setReviews((current) => [...current, res.data]);
      setNewComments([...newComments, res.data]);
      setComment("");
    } catch (error) {
      // 서버 error 핸들링
      alert(error);
    }
  };

  const handleLikes = async (e) => {
    if (!loggedInUser) {
      return alert("로그인 유저 없음");
    }
    // targetType, targetId
    try {
      const res = await Api.post(`api/like`, {
        targetType: "review",
        targetId: reviewId,
      });

      if (res.data.message === "Like removed") {
        console.log("좋아요 제거");
      }
      if (res.data.message === "Like added") {
        console.log("좋아요❤️");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const url = [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=873&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=873&q=80",
  ];
  return (
    <>
      <Card bg="light" key={reviewId} className="my-5 review-container">
        <Card.Header>
          <ReviewTitle review={review} setReviews={setReviews} />
        </Card.Header>
        <Card.Body className="px-5 py-12">
          {uploadFile?.length === 0 && <CarouselWrapper imageUrls={url} />}
          {uploadFile?.length > 0 && <CarouselWrapper imageUrls={uploadFile} />}
          <Row>
            <Col className="comment__author">{userName}</Col>
            {likeCount > 0 && `좋아요 ${likeCount}개`}
          </Row>
          <Row xs="auto" className="pb-3">
            <span className="comment__title">
              {`${title}  `}
              <span className="comment__content">
                {showMore && isContentReduced
                  ? content.substring(0, 80) + "..."
                  : content}
              </span>
            </span>
            {/* to do: 좋아요를 눌렀나 여부에 따라 solid 하트 or regular 하트 */}
            <Row className="d-flex w-100">
              <Col className="link bold" onClick={() => setShowMore(!showMore)}>
                더보기
              </Col>
              <Col onClick={handleLikes} className="flex-justify-end mx-0">
                {<FontAwesomeIcon className="link" icon={farHeart} />}
                {/* <FontAwesomeIcon icon={fasHeart} /> */}
              </Col>
            </Row>
          </Row>
          <Card.Text className="d-flex justify-content-end">
            {minutesPassed < 1 && "방금 전"}
            {minutesPassed < 60 && minutesPassed > 0 && `${minutesPassed}분 전`}
            {minutesPassed >= 60 && hoursPassed < 24 && `${hoursPassed}시간 전`}
            {minutesPassed >= 60 && hoursPassed >= 24 && `${daysPassed}일 전`}
          </Card.Text>

          {/* 댓글 모두보기: 클릭하면 모달창으로 리뷰 카드 띄우기 */}
          <div>{}</div>
          {
            <Card.Text
              onClick={() => {
                setShowingReview(review);
                setShowComments(review);
                // to do: 댓글보기 모달창
              }}
              className="link"
            >
              {comments?.length > 3 && `댓글 ${comments.length}개 모두 보기`}
            </Card.Text>
          }
          {/* 댓글 3개까지만 미리보기 */}
          {comments?.map(
            (comment, index) =>
              index < 3 && (
                <Row>
                  <Comment
                    comment={comment}
                    key={comment._id}
                    selectedReview={selectedReview}
                    setSelectedReview={setSelectedReview}
                  />
                </Row>
              )
          )}
          {newComments && (
            <Row>
              {newComments.map((item) => (
                <Comment
                  comment={item}
                  key={item._id}
                  selectedReview={selectedReview}
                  setSelectedReview={setSelectedReview}
                />
              ))}
            </Row>
          )}
          <Form onSubmit={handleCommentSubmit} className="comment__form">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="댓글 달기..."
              className="comment__input"
            />
            {comment?.length > 0 && (
              <Button
                onClick={handleCommentSubmit}
                variant="outline-primary"
                className="comment__button"
              >
                게시
              </Button>
            )}
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default ReviewCard;
