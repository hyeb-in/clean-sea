import React, { useContext, useEffect, useState } from "react";
import { Card, Modal } from "react-bootstrap";
import { IsReviewModalVisibleContext, UserStateContext } from "../../App";
import * as Api from "../../Api";
import CarouselWrapper from "../common/Carousel";
import ReviewTitle from "./ReviewTitle";

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
// get review list -> 보여지는 하나의 리뷰 카드가 이 컴포넌트
const ReviewCard = ({ review, setReviews, setShowingReview }) => {
  const [comments, setComments] = useState(mock);
  const { isReviewModalVisible, setIsReviewModalVisible } = useContext(
    IsReviewModalVisibleContext
  );
  const [selectedReview, setSelectedReview] = useState(false);

  const {
    _id: reviewId,
    author: authorId,
    title,
    content,
    createdAt,
    imageUrl,
    userName,
  } = review;
  // get comments : /comments/:reviewId
  useEffect(() => {
    const getComments = async () => {
      // const res = await Api.get("comments", reviewId);
      // to do: fetch
      // console.log(res);
      // setComments(res);
      // 성공 알림
    };
    getComments();
  }, [reviewId, comments]);

  // get user avatar >> get 'users/id' ?

  const currentTime = new Date(); // 현재 시간
  const createdAtgg = new Date(createdAt); // 주어진 시간

  const timeDifference = currentTime.getTime() - createdAtgg.getTime(); // 밀리초 단위의 차이

  const minutesPassed = Math.floor(timeDifference / (1000 * 60));
  const hoursPassed = Math.floor(timeDifference / (1000 * 60 * 60)); // 시간으로 변환
  const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // 일자로 변환

  return (
    <Card bg="light" key={reviewId} sm="12" md="6" lg="4" className="mb-5">
      <Card.Header>
        <ReviewTitle review={review} setReviews={setReviews} />
      </Card.Header>
      <Card.Body>
        {/* to do: 서버 image 저장 후 carousel */}
        <CarouselWrapper
          imageUrls={[
            "https://health.chosun.com/site/data/img_dir/2023/05/31/2023053102582_0.jpg",
            "https://health.chosun.com/site/data/img_dir/2023/05/31/2023053102582_0.jpg",
          ]}
        />
        <Card.Title>{title}</Card.Title>
        <Card.Text>{content}</Card.Text>
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
              console.log(review);
              console.log(selectedReview);
              setIsReviewModalVisible(true);
              setSelectedReview(review);
            }}
            className="link"
          >
            댓글 {comments.length}개 모두 보기
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};

export default ReviewCard;
