import Comment from "./Comment";
import useModal, { MODAL_TYPE } from "../../../hooks/useModal";
import useReview from "../../../hooks/useReview";
// import { useEffect, useRef } from "react";

const CurrentComments = ({
  review,
  selectedReview,
  setSelectedReview,
  commentList,
  newCommentsList,
}) => {
  const { openModal } = useModal();
  const { setReviews } = useReview();
  // const scrollRef = useRef(null);
  console.log(review, "wiejfwlifj");
  // useEffect(() => {
  //   if (newCommentsList) {
  //     scrollRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [newCommentsList]);

  return (
    <div className="comments-container scroll-container">
      {/* 댓글 3개까지만 미리보기 */}
      {commentList?.map(
        (comment, index) =>
          index < 2 && (
            <div key={comment._id}>
              <Comment
                review={review}
                comment={comment}
                selectedReview={selectedReview}
                setSelectedReview={setSelectedReview}
              />
            </div>
          )
      )}
      {newCommentsList?.map((comment) => (
        <div key={comment._id}>
          <Comment
            review={review}
            comment={comment}
            selectedReview={selectedReview}
            setSelectedReview={setSelectedReview}
          />
        </div>
      ))}
      {/* <div ref={scrollRef}></div> */}
      {/* 댓글 더보기 클릭시 댓글 상세 모달창으로 이동 */}
      <div
        onClick={() =>
          openModal(MODAL_TYPE.commentsList, {
            review,
            setReviews,
            comments: commentList,
            newCommentsList,
          })
        }
        className="link flex-justify-end"
      >
        {/* 임시로 2개!! 원래 3개임 */}
        <div className="more-comments">
          {review.commentCount > 2 && `댓글 ${review.commentCount}개 모두 보기`}
        </div>
      </div>
    </div>
  );
};

export default CurrentComments;
