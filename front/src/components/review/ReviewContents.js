import { useContext, useState } from "react";
import Like from "../common/microComponents/Like";
import { UserStateContext } from "../../App";
import { IS_LIKE } from "../../constants";
import useReview from "../../hooks/useReview";
import {
  ShowMoreButton,
  truncate,
} from "../common/microComponents/ShowMoreButton";

const ReviewContents = ({ review, className }) => {
  const { user: loggedInUser } = useContext(UserStateContext);
  const hasCommentsMoreThanThree = review.comments?.length > 3;
  const [showDetails, setShowDetails] = useState(false);
  const iLiked = loggedInUser && review.isLike === IS_LIKE.yes;
  const { setReviews } = useReview();
  console.log(showDetails);

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
      <div className={`comment__title ${className}`}>
        <span className="">{title}</span>
        <div className="text-overflow">{content}</div>
        <ShowMoreButton
          content={content}
          onClick={() => setShowDetails(!showDetails)}
        />
      </div>
    </>
  );
};

export default ReviewContents;
