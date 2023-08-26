import React, { useContext, useState } from "react";
import { Card } from "react-bootstrap";
import ReviewTitle from "./ReviewHeader";
import CommentsList from "./comment/CommentsList";
import ReviewContents from "./ReviewContents";
import CarouselWrapper from "../common/Carousel";
import AddCommentForm from "./comment/AddCommentForm";
import { UserStateContext } from "../../App";

export const IMAGE_URLS = [
  "https://img.freepik.com/free-photo/beautiful-beach-and-sea_74190-6620.jpg?t=st=1691935043~exp=1691935643~hmac=7d32dd31eda2acee9b8c0a03ff9d29d591c8e105715746b9643e2600cd4b2b70",
  "https://png.pngtree.com/thumb_back/fh260/png-vector/20200530/ourmid/pngtree-beach-png-image_2215226.jpg",
];

// get review list -> 보여지는 하나의 리뷰 카드가 이 컴포넌트
const Review = ({ review, setReviews, selectedReview, setSelectedReview }) => {
  const { user: loggedInUser } = useContext(UserStateContext);
  const { _id: reviewId, comments, userName } = review;
  const [newComments, setNewComments] = useState([]);
  // console.log(review);
  return (
    <>
      <Card
        bg="light"
        key={reviewId}
        className="my-5 review-container review flexible-col "
      >
        <Card.Header>
          <ReviewTitle review={review} setReviews={setReviews} />
          <CarouselWrapper preview={IMAGE_URLS} />
          {/* 사진이 없는 형식일 경우에 레이아웃이 망가지는데 어떡해야할지 모르겠음! */}
        </Card.Header>
        <Card.Body className="px-0 py-12 pt-0">
          <div xs="auto" className="pb-3 ">
            <ReviewContents
              review={review}
              setReviews={setReviews}
              className="d-flex flex-column"
            />

            <div>
              <CommentsList
                comments={comments}
                newComments={newComments}
                selectedReview={selectedReview}
                setSelectedReview={selectedReview}
                review={review}
                reviewId={reviewId}
                setNewComments={setNewComments}
                setReviews={setReviews}
              />
            </div>
            {/* 댓글 다는 창이 있다? reviewId가 필요함  */}
            {loggedInUser && (
              <AddCommentForm
                review={review}
                setNewComments={setNewComments}
                setReviews={setReviews}
              />
            )}
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default Review;
