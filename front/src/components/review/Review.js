import React, { useContext, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import CarouselWrapper from "../common/Carousel";
import ReviewTitle from "./ReviewTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import Comment from "./comment/Comment";
import * as Api from "../../Api";
import { ModalVisibleContext, UserStateContext } from "../../App";
import Timestamp from "../common/Timestamp";
import { IS_LIKE, MODAL_TYPE } from "../../constants";

// get review list -> 보여지는 하나의 리뷰 카드가 이 컴포넌트
const Review = ({ review, setReviews, selectedReview, setSelectedReview }) => {
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
  const { modalVisible, setModalVisible } = useContext(ModalVisibleContext);
  const [comment, setComment] = useState("");
  const isValid = comment.length > 0 && comment.length < 100;
  const [newComments, setNewComments] = useState([]);
  const [showDetails, setShowDetails] = useState(true);
  const isContentReduced = content?.length > 25;
  const isLiked = loggedInUser && review.isLike === IS_LIKE.yes;

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!loggedInUser) {
        alert("유저 없음");
      }

      // 글자수 제한: 1글자이상 100자이하
      if (!isValid) {
        alert("글자수 제한");
      }
      // review id로 해당 리뷰를 찾아서 review.Likes id가 있나? 값으로 갱신한다??
      // isLikes에 userId가 저장되어있음
      const res = await Api.post(`comments/${reviewId}`, { content: comment });
      if (!res.data) {
        return alert("요청 실패");
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
    // 좋아요 눌리면 하트 전환
    // 좋아요 ++개
    try {
      const res = await Api.post("api/like", {
        targetType: "review",
        targetId: reviewId,
      });

      // !좋아요 눌리면 하트 전환
      // 좋아요 --개
      if (res.data.message === IS_LIKE.added) {
        setReviews((current) => {
          const newReviews = [...current];
          newReviews.map((item) => (item.isLike = IS_LIKE.yes));
        });
        console.log("좋아요❤️");
      }

      if (res.data.message === IS_LIKE.removed) {
        setReviews((current) => {
          const newReviews = [...current];
          newReviews.map((item) => (item.isLike = IS_LIKE.no));
        });
        console.log("좋아요 제거");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <Card bg="light" key={reviewId} className="my-5 review-container">
        <Card.Header>
          <ReviewTitle review={review} setReviews={setReviews} />
        </Card.Header>
        <Card.Body className="px-5 py-12">
          {uploadFile?.length > 0 && <CarouselWrapper imageUrls={uploadFile} />}
          <Row>
            <Col className="comment__author">{userName}</Col>
            {likeCount > 0 && `좋아요 ${likeCount}개`}
          </Row>
          <Row xs="auto" className="pb-3">
            <span className="comment__title">
              {title}
              <span className="comment__content">
                {showDetails && isContentReduced
                  ? content.substring(0, 80) + "..."
                  : content}
              </span>
            </span>
            {/* 더 보기 누르면 모달창으로 details 띄운다 - 어떤 review의 정보인지 전달 */}
            <Row className="d-flex w-100">
              <Col
                className="link bold"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails && "더보기"}
              </Col>

              {/* to do: 좋아요를 눌렀나 여부에 따라 solid 하트 or regular 하트 */}
              {
                <Col onClick={handleLikes} className="flex-justify-end mx-0">
                  {isLiked ? (
                    <FontAwesomeIcon className="link" icon={farHeart} />
                  ) : (
                    <FontAwesomeIcon icon={fasHeart} />
                  )}
                </Col>
              }
            </Row>
          </Row>
          <Card.Text className="d-flex justify-content-end">
            <Timestamp createdAt={createdAt} />
          </Card.Text>
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
          {/* 새로 작성될 커맨트 리스트 */}
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

          <Row
            onClick={() => {
              setModalVisible({
                type: MODAL_TYPE.floatingReview,
                isVisible: true,
                data: review,
              });
            }}
            className="link"
          >
            {comments?.length > 3 && `댓글 ${comments.length}개 모두 보기`}
          </Row>

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

export default Review;
