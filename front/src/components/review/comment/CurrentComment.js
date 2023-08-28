import Comment from "./Comment";
import useModal, { MODAL_TYPE } from "../../../hooks/useModal";
import useReview from "../../../hooks/useReview";

const CurrentComments = ({
  review,
  selectedReview,
  setSelectedReview,
  commentList,
  newCommentsList,
}) => {
  const { openModal } = useModal();
  const { setReviews } = useReview();

  return (
    <div className="comments-container">
      {/* 댓글 3개까지만 미리보기 */}
      {/* 삭제 로직 구현 */}
      {/* setComments 갱신 */}
      {commentList?.map(
        (comment, index) =>
          index < 2 && (
            <div key={comment._id}>
              <Comment
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
            comment={comment}
            selectedReview={selectedReview}
            setSelectedReview={setSelectedReview}
          />
        </div>
      ))}
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
        className="link"
      >
        {/* 임시로 2개!! 원래 3개임 */}
        {commentList?.length > 2 && `댓글 ${commentList.length}개 모두 보기`}
      </div>
    </div>
  );
};

export default CurrentComments;
