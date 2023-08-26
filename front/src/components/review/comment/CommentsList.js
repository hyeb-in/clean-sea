import { useContext } from "react";
import Comment from "../../common/microComponents/Comment";
import { ModalVisibleContext } from "../../../App";
import useModal, { MODAL_TYPE } from "../../../hooks/useModal";

const CommentsList = ({
  comments,
  selectedReview,
  setSelectedReview,
  review,
  setReviews,
  newComments,
  setNewComments,
}) => {
  const { modalVisible, setModalVisible } = useContext(ModalVisibleContext);
  const displayedComments = comments || modalVisible?.data?.comments;
  return (
    <>
      {/* 댓글 3개까지만 미리보기 */}
      {/* 추가된 커맨트까지 갯수가 3개 이상이 된다면 이전 커맨트는 사라지게 해준다 */}
      {comments?.map(
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
      {/* 새로 작성될 커맨트 리스트 */}
      {newComments && (
        <div>
          {newComments.map((item) => (
            <Comment
              comment={item}
              key={item._id}
              selectedReview={selectedReview}
              setSelectedReview={setSelectedReview}
              review={review}
            />
          ))}
        </div>
      )}
      {/* ::::댓글 모두 보기:::: 클릭시 floatingReview 모달에 데이터 보내주기 */}
      <div
        onClick={() =>
          setModalVisible({
            type: MODAL_TYPE.floatingReview,
            isVisible: true,
            data: {
              review,
              setNewComments,
              setReviews,
            },
          })
        }
        className="link"
      >
        {/* 임시로 2개!! 원래 3개임 */}
        {comments?.length > 2 && `댓글 ${comments.length}개 모두 보기`}
      </div>
    </>
  );
};

export default CommentsList;
