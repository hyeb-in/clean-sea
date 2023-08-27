import { useContext, useState } from "react";
import Like from "../common/microComponents/Like";
import { UserStateContext } from "../../App";
import { IS_LIKE } from "../../constants";
import useReview from "../../hooks/useReview";

const ReviewContents = ({ review, className }) => {
  const { user: loggedInUser } = useContext(UserStateContext);

  const [showDetails, setShowDetails] = useState(false);
  const iLiked = loggedInUser && review.isLike === IS_LIKE.yes;
  const { setReviews } = useReview();

  const [likeCountState, setLikeCountState] = useState(review.comments?.length);
  const hasCommentsMoreThanThree = review.comments?.length > 3;

  const { _id: reviewId, title, content, likeCount } = review;
  return (
    <>
      <div className="flex-justify-between review__contents">
        <div className="text-like text-timestamp flex-justify-end">
          {likeCount === 0 && `좋아요 ${likeCount}개`}
        </div>
        {loggedInUser && (
          <Like
            className="text-like"
            isLiked={iLiked}
            reviewId={reviewId}
            setReviews={setReviews}
          />
        )}
      </div>
      {/* 이름과 제목, 내용 */}
      <div className={`comment__title`}>
        <span className="">{title}</span>
        <div className={!showDetails && "text-overflow"}>{content}</div>
        {!showDetails && (
          <div
            onClick={() => setShowDetails(true)}
            className={`text-timestamp link show-more-btn`}
          >
            더보기
          </div>
        )}
      </div>
    </>
  );
};

export default ReviewContents;
