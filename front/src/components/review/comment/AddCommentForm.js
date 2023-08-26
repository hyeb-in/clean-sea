import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ModalVisibleContext, UserStateContext } from "../../../App";
import * as Api from "../../../Api";

const AddCommentForm = ({
  review,
  setNewComments,
  setReviews,
  setModalComments,
}) => {
  const { user: loggedInUser } = useContext(UserStateContext);
  const { modalVisible } = useContext(ModalVisibleContext);
  // 부모 컴포넌트로부터 데이터를 받을 수 있다(리뷰 페이지에서 작성되는 경우)
  // 모달창에서 작성하는 경우 context로 전달받은 데이터를 사용한다
  const targetReview = review ? review : modalVisible?.data?.review;
  // review
  // reviewId
  // setNewComments
  // setReviews

  const [comment, setComment] = useState("");
  const isValid = comment.length > 0 && comment.length <= 100;

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!loggedInUser) {
        alert("유저 없음");
      }
      // 글자수 제한: 1글자이상 100자이하
      if (!isValid) {
        alert("글자수 제한");
      }
      console.log(modalVisible);

      const res = await Api.post(`comments/${targetReview._id}`, {
        content: comment,
      });

      if (!res.data) {
        return alert("요청 실패");
      }

      setReviews((current) => [...current, res.data]);
      setNewComments((newComments) => [...newComments, res.data]);
      setComment("");
      if (setModalComments) {
        setModalComments((newComments) => [...newComments, res.data]);
      }
    } catch (error) {
      // 서버 error 핸들링
      // 인터셉터가 핸들링 하면 여긴 비워놔도 되는 건가?
    }
  };
  return (
    <Form onSubmit={handleCommentSubmit} className="comment__form">
      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="댓글 달기..."
        className="comment__input"
      />
      {comment?.length > 0 && (
        <Button
          onClick={handleCommentSubmit}
          variant="outline-primary"
          className="comment__button"
        >
          게시
        </Button>
      )}
    </Form>
  );
};

export default AddCommentForm;
