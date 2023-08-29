import React, { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import ReviewTitle from "./ReviewTitle";
import CurrentComments from "./comment/CurrentComment";
import ReviewContents from "./ReviewContents";
import CarouselWrapper from "../common/Carousel";
import AddCommentForm from "./comment/CommentForm";
import { UserStateContext } from "../../App";

// get review list -> 보여지는 하나의 리뷰 카드가 이 컴포넌트
const Review = ({ review, setReviews, setReview }) => {
  const { user: loggedInUser } = useContext(UserStateContext);

  const [commentList, setCommentList] = useState(
    review ? review.comments : null
  );
  const [newCommentsList, setNewCommentsList] = useState([]);

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
            {/* 사진이 없는 형식일 경우에 레이아웃이 망가지는데 어떡해야할지 모르겠음! */}
          </Card.Header>
          <Card.Body className="py-12 pt-0">
            <div className="pb-3 ">
              <ReviewContents
                review={review}
                setReviews={setReviews}
                className="d-flex flex-column"
              />
              <div>
                <CurrentComments
                  review={review}
                  commentList={commentList}
                  setCommentList={setCommentList}
                  newCommentsList={newCommentsList}
                  setNewCommentsList={setNewCommentsList}
                />
              </div>
              {/* 댓글 다는 창이 있다? reviewId가 필요함  */}
              {loggedInUser && (
                <AddCommentForm
                  review={review}
                  setReviews={setReviews}
                  setNewCommentsList={setNewCommentsList}
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
