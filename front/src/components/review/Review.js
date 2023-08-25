import React, { useContext, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import CarouselWrapper from "../common/Carousel";
import ReviewTitle from "./ReviewTitle";
import * as Api from "../../Api";
import { ModalVisibleContext, UserStateContext } from "../../App";
import Timestamp from "../common/Timestamp";
import { IS_LIKE, MODAL_TYPE } from "../../constants";
import CommentsList from "./comment/CommentsList";
import Like from "../common/Like";
import Contents from "./comment/Contents";

export const IMAGE_URLS = [
  "https://img.freepik.com/free-photo/beautiful-beach-and-sea_74190-6620.jpg?t=st=1691935043~exp=1691935643~hmac=7d32dd31eda2acee9b8c0a03ff9d29d591c8e105715746b9643e2600cd4b2b70",
  "https://png.pngtree.com/thumb_back/fh260/png-vector/20200530/ourmid/pngtree-beach-png-image_2215226.jpg",
];

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
  const { setModalVisible } = useContext(ModalVisibleContext);
  const [newComments, setNewComments] = useState([]);
  const [showDetails, setShowDetails] = useState(true);
  const isLiked = loggedInUser && review?.isLike === IS_LIKE.yes;

  return (
    <>
      <Card bg="light" key={reviewId} className="my-5 review-container">
        <Card.Header>
          <ReviewTitle review={review} setReviews={setReviews} />
        </Card.Header>
        <Card.Body className="px-0 py-12 pt-0">
          {IMAGE_URLS?.length > 0 && <CarouselWrapper imageUrls={IMAGE_URLS} />}
          <Container className="px-10 py-2">
            <Row>
              <Col className="comment__author">{userName}</Col>
            </Row>
            <Row xs="auto" className="pb-3">
              <Contents
                title={title}
                showDetails={showDetails}
                content={content}
              />
              <Row className="d-flex w-100">
                <Col
                  className="link bold"
                  onClick={() => setShowDetails(!showDetails)}
                ></Col>
                {loggedInUser && (
                  <Like
                    isLiked={isLiked}
                    reviewId={reviewId}
                    setReviews={setReviews}
                  />
                )}
              </Row>
              <Card.Text className="d-flex justify-content-end">
                <Timestamp createdAt={createdAt} />
                {showDetails && (
                  <div className="text-timestamp mx-3 link">더보기</div>
                )}
                <Col className="text-timestamp flex-justify-end">
                  {likeCount > 0 && `좋아요 ${likeCount}개`}
                </Col>
              </Card.Text>
              <Col>
                <CommentsList
                  comments={comments}
                  newComments={newComments}
                  selectedReview={selectedReview}
                  setSelectedReview={selectedReview}
                  review={review}
                />
              </Col>
              {/* ::::댓글 모두 보기:::: 클릭시 floatingReview 모달에 데이터 보내주기 */}
              <Col
                onClick={() =>
                  setModalVisible({
                    type: MODAL_TYPE.floatingReview,
                    isVisible: true,
                    data: {
                      reviewId,
                      review,
                      setNewComments,
                      setReviews,
                    },
                  })
                }
                className="link"
              >
                {/* 임시로 2개!! 원래 3개임 */}
                {comments?.length > 2 && `댓글 ${comments.length}개 모두 보기`}
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </>
  );
};

export default Review;
