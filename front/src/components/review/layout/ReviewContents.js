import { useContext, useState } from "react";
import Like from "../../common/microComponents/Like";
import { UserStateContext } from "../../../App";
import { IS_LIKE } from "../../../constants";
import LikeText from "../../common/microComponents/LikeText";

const ReviewContents = ({ review, setReviews }) => {
  const { user: loggedInUser } = useContext(UserStateContext);
  const iLiked = loggedInUser && review.isLike === IS_LIKE.yes;
  const { _id: reviewId, title, content, likeCount } = review;
  const [showDetails, setShowDetails] = useState(content?.length > 10);
  // 글자수 10자 이상이면 showDetails true
  // false 때 줄임말 제거
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
      <div className="">
        <div className="comment__title">{title}</div>
        <div className={showDetails ? "text-overflow" : ""}>{content}</div>
        {!showDetails && (
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
