import Comment from "./Comment";
import useModal, { MODAL_TYPE } from "../../../hooks/useModal";
import useReview from "../../../hooks/useReview";

const CurrentComments = ({
  review,
  selectedReview,
  setSelectedReview,
  commentList,
  newCommentsList,
  setNewCommentsList,
}) => {
  const { openModal } = useModal();
  const { setReviews } = useReview();
  return (
    <div className="comments-container">
      {/* 댓글 3개까지만 미리보기 */}
      {/* 추가된 커맨트까지 갯수가 3개 이상이 된다면 이전 커맨트는 사라지게 해준다 */}
      {/* 순서 역순이어야 함 ㅋㅋ */}
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
            setNewCommentsList,
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
