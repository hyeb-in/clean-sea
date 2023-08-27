import Comment from "./Comment";
import useModal, { MODAL_TYPE } from "../../../hooks/useModal";

const CurrentComments = ({
  review,
  setReviews,
  selectedReview,
  setSelectedReview,
  commentList,
  setCommentList,
  newCommentsList,
  setNewCommentsList,
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
      {newCommentsList?.map((comment, index) => (
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
        {/* 불러올 수 있는 게 3개까지밖에 없어서 '더보기' 못열어 ㅋㅋ 그럼 그냥 2개로 줄이자 */}
        {/* 갖고있는 걸로 가능할까?? 근데 그러려면 api 또 여러번 쫘라라락 쏴야함 */}
        {commentList?.length > 2 && `댓글 ${commentList.length}개 모두 보기`}
      </div>
    </>
  );
};

export default CurrentComments;
