import React, { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import ReviewTitle from "./ReviewTitle";
import CurrentComments from "../comment/CurrentComment";
import ReviewContents from "./ReviewContents";
import CarouselWrapper from "../../common/Carousel";
import CommentForm from "../comment/CommentForm";
import { UserStateContext } from "../../../App";
import useModal, { MODAL_TYPE } from "../../../hooks/useModal";

// get review list -> 보여지는 하나의 리뷰 카드가 이 컴포넌트
const Review = ({ review, setReviews }) => {
  const { user: loggedInUser } = useContext(UserStateContext);
  const { openModal } = useModal();
  const [comments, setComments] = useState(review?.comments || []);
  const [newComments, setNewComments] = useState([]);
  const [commentCount, setCommentCount] = useState(review.commentCount);

  return (
    <>
      {review && (
        <Card
          bg="light"
          key={review._id}
          className="my-5 review-container review flexible-col "
        >
          <Card.Header className="review__flexible-child">
            <ReviewTitle review={review} setReviews={setReviews} />
            <CarouselWrapper imageUrls={review.uploadFile} />
          </Card.Header>
          <Card.Body className="py-12 pt-0">
            <div className="pb-3 ">
              <ReviewContents
                review={review}
                setReviews={setReviews}
                className="d-flex flex-column"
              />
              <div>
                {/* 기존 댓글 + 새로 생성될 댓글 리스트 */}
                <CurrentComments
                  review={review}
                  setReviews={setReviews}
                  comments={comments}
                  setComments={setComments}
                  newComments={newComments}
                  setNewComments={setNewComments}
                  setCommentCount={setCommentCount}
                />
              </div>
              <div
                onClick={() =>
                  openModal(MODAL_TYPE.commentsList, {
                    review,
                    setComments,
                    newComments,
                    setNewComments,
                    setCommentCount,
                  })
                }
                className="link flex-justify-end"
              >
                {/* 임시로 2개!! 원래 3개임 */}
                <div className="more-comments">
                  {commentCount > 2 && `댓글 ${commentCount}개 모두 보기`}
                </div>
              </div>
              {/* 댓글 다는 창이 있다? reviewId가 필요함 */}
              {loggedInUser && (
                <CommentForm
                  review={review}
                  setNewComments={setNewComments}
                  setCommentCount={setCommentCount}
                  setReviews={setReviews}
                />
              )}
            </div>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default Review;
