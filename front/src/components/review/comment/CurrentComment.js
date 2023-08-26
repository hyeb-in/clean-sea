import Comment from "./Comment";
import useModal, { MODAL_TYPE } from "../../../hooks/useModal";
import { useState } from "react";

const CurrentComments = ({
  review,
  setReviews,
  commentList,
  setCommentList,
  selectedReview,
  setSelectedReview,
  newCommentsList,
}) => {
  const { openModal } = useModal();

  console.log(commentList);

  return (
    <>
      {/* 댓글 3개까지만 미리보기 */}
      {/* 추가된 커맨트까지 갯수가 3개 이상이 된다면 이전 커맨트는 사라지게 해준다 */}
      {/* 순서 역순이어야 함 ㅋㅋ */}
      {commentList?.map(
        (comment, index) =>
          index < 3 && (
            <div key={comment._id}>
              <Comment
                comment={comment}
                selectedReview={selectedReview}
                setSelectedReview={setSelectedReview}
              />
            </div>
          )
      )}
      {newCommentsList?.map((comment, index) => (
        <div key={comment._id}>
          <Comment
            comment={comment}
            selectedReview={selectedReview}
            setSelectedReview={setSelectedReview}
          />
        </div>
      ))}
      <div
        onClick={() =>
          openModal(MODAL_TYPE.commentsList, {
            review,
            setReviews,
            comments: commentList,
            setCommentList,
          })
        }
        className="link"
      >
        {/* 임시로 2개!! 원래 3개임 */}
        {commentList?.length > 2 && `댓글 ${commentList.length}개 모두 보기`}
      </div>
    </>
  );
};

export default CurrentComments;
