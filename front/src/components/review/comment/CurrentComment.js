import { useEffect, useRef } from "react";
import Comment from "./Comment";
// import { useEffect, useRef } from "react";

const CurrentComments = ({
  comments,
  setComments,
  newComments,
  setNewComments,
  setCommentCount,
}) => {
  return (
    <div className="comments-container scroll-container">
      {/* 댓글 3개까지만 미리보기 */}
      {comments?.map(
        (comment, index) =>
          index < 3 && (
            <div key={comment._id}>
              <Comment
                comment={comment}
                setComments={setComments}
                setCommentCount={setCommentCount}
              />
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
              setCommentCount={setCommentCount}
            />
          </div>
        ))}
      {/* <div ref={scrollRef}></div> */}
      {/* 댓글 더보기 클릭시 댓글 상세 모달창으로 이동 */}
    </div>
  );
};

export default CurrentComments;
