import { useContext, useState } from "react";
import Like from "../common/microComponents/Like";
import Timestamp from "../common/microComponents/Timestamp";
import { UserStateContext } from "../../App";
import { IS_LIKE } from "../../constants";
import useReview from "../../hooks/useReview";

export const truncate = (content) => {
  return content?.length > 10 ? content.slice(0, 10) + "..." : content;
};

const ReviewContents = ({ review, className }) => {
  const { user: loggedInUser } = useContext(UserStateContext);
  const hasCommentsMoreThanThree = review.comments?.length > 3;
  const [showDetails, setShowDetails] = useState(hasCommentsMoreThanThree);
  const iLiked = loggedInUser && review.isLike === IS_LIKE.yes;
  const { setReviews } = useReview();

  const {
    _id: reviewId,
    author: authorId,
    title,
    content,
    createdAt,
    likeCount,
  } = review;
  return (
    <>
      <div className={`comment__title ${className}`}>
        <span className="mx-2">{title}</span>
        <span className="comment__content">
          {showDetails && truncate(content)}
          {content}
        </span>
      </div>
      {loggedInUser && (
        <Like isLiked={iLiked} reviewId={reviewId} setReviews={setReviews} />
      )}
      <div className="d-flex justify-content-end">
        <Timestamp createdAt={createdAt} />
        {showDetails && (
          <div
            onClick={() => setShowDetails(!showDetails)}
            className="text-timestamp mx-3 link"
          >
            {/* 리뷰 컨텐츠 더보기임!! truncate 어디감? 같이있어야되는데 */}
            더보기
          </div>
        )}
        <div className="text-timestamp flex-justify-end mx-2">
          {likeCount > 0 && `좋아요 ${likeCount}개`}
        </div>
      </div>
    </>
  );
};

export default ReviewContents;
