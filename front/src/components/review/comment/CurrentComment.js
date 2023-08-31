import Comment from "./Comment";
// import { useEffect, useRef } from "react";

const CurrentComments = ({
  comments,
  setComments,
  newComments,
  setNewComments,
}) => {
  // const { setReviews } = useReview();
  // const scrollRef = useRef(null);

  // useEffect(() => {
  //   if (newCommentsList) {
  //     scrollRef.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [newCommentsList]);

  return (
    <div className="comments-container scroll-container">
      {/* 댓글 3개까지만 미리보기 */}
      {comments?.map(
        (comment, index) =>
          index < 3 && (
            <div key={comment._id}>
              <Comment comment={comment} setComments={setComments} />
            </div>
          )
      )}
      {newComments &&
        newComments.map((comment) => (
          <div key={comment._id}>
            <Comment
              comment={comment}
              setComments={setComments}
              setNewComments={setNewComments}
            />
          </div>
        ))}
      {/* <div ref={scrollRef}></div> */}
      {/* 댓글 더보기 클릭시 댓글 상세 모달창으로 이동 */}
    </div>
  );
};

export default CurrentComments;
