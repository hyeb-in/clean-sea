import { Row } from "react-bootstrap";
import Comment from "./Comment";

const CommentsList = ({
  comments,
  newComments,
  selectedReview,
  setSelectedReview,
  review,
}) => {
  return (
    <>
      {/* 댓글 3개까지만 미리보기 */}
      {comments?.map(
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
    </>
  );
};

export default CommentsList;
