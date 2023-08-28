import { useContext, useState } from "react";
import Like from "../common/microComponents/Like";
import { UserStateContext } from "../../App";
import { IS_LIKE } from "../../constants";
import { Col } from "react-bootstrap";
import LikeText from "../common/microComponents/LikeText";

const ReviewContents = ({ review, setReviews }) => {
  const { user: loggedInUser } = useContext(UserStateContext);
  const iLiked = loggedInUser && review.isLike === IS_LIKE.yes;
  const [showDetails, setShowDetails] = useState(false);

  const hasCommentsMoreThanThree = review.comments?.length > 3;

  const { _id: reviewId, title, content, likeCount } = review;

  return (
    <>
      <div className="flex-justify-between review__contents">
        {loggedInUser ? (
          <Like
            iLiked={iLiked}
            className="text-like"
            reviewId={reviewId}
            setReviews={setReviews}
            likeCount={likeCount}
          />
        ) : (
          <LikeText likeCount={likeCount} />
        )}
      </div>
      {/* 이름과 제목, 내용 */}
      <div className={"comment__title"}>
        <span className="">{title}</span>
        <div className={!showDetails && "text-overflow"}>{content}</div>
        {!showDetails && hasCommentsMoreThanThree && (
          <div
            onClick={() => setShowDetails(true)}
            className={"text-timestamp link show-more-btn"}
          >
            더보기
          </div>
        )}
      </div>
    </>
  );
};

export default ReviewContents;
