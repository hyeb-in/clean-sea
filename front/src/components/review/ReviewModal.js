import React from "react-router-dom";
import { Modal } from "react-bootstrap";

import CarouselWrapper from "../common/Carousel";
import ReviewTitle from "./ReviewTitle";
import { useContext } from "react";
import { IsReviewModalVisibleContext } from "../../App";
import Comment from "./Comment";

const mock = [
  {
    postId: 1,
    userId: 1,
    content: "커맨트 내용입니다 아아아아아",
    userName: "유저 이름",
    date: "8/20",
  },
  {
    postId: 2,
    userId: 1,
    content: "커맨트 내용입니다 아아아아아",
    userName: "유저 이름",
    date: "8/20",
  },
  {
    postId: 3,
    userId: 2,
    content: "커맨트 내용입니다 아아아아아",
    userName: "유저 이름 22",
    date: "8/20",
  },
];
const ReviewModal = ({ showingReview, setShowingReview, setReviews }) => {
  const { setIsReviewModalVisible } = useContext(IsReviewModalVisibleContext);

  return (
    <Modal
      show={showingReview}
      onHide={() => {
        setShowingReview(null);
        setIsReviewModalVisible(false);
      }}
      centered
      className="px-2"
    >
      {/* 작은 화면에서는 세로로 정렬 */}
      {/* 큰 화면에서는 타이틀 한 줄, 사진이랑 댓글 한 줄로 나누기 */}
      <ReviewTitle
        review={showingReview}
        setReviews={setReviews}
        className="px-2"
      />
      <CarouselWrapper
        imageUrls={[
          "https://health.chosun.com/site/data/img_dir/2023/05/31/2023053102582_0.jpg",
          "https://health.chosun.com/site/data/img_dir/2023/05/31/2023053102582_0.jpg",
        ]}
      />
      {mock.map((comment) => (
        <Comment comment={comment} />
      ))}
    </Modal>
  );
};

export default ReviewModal;
