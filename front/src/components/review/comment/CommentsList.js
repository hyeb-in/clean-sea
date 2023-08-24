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
          index < 3 && (
            <Row key={comment._id}>
              <Comment
                comment={comment}
                selectedReview={selectedReview}
                setSelectedReview={setSelectedReview}
              />
            </Row>
          )
      )}
      {/* 새로 작성될 커맨트 리스트 */}
      {newComments && (
        <Row>
          {newComments.map((item) => (
            <Comment
              comment={item}
              key={item._id}
              selectedReview={selectedReview}
              setSelectedReview={setSelectedReview}
              review={review}
            />
          ))}
        </Row>
      )}
    </>
  );
};

export default CommentsList;
