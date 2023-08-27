import { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ModalVisibleContext, UserStateContext } from "../../../App";
import * as Api from "../../../Api";

const AddCommentForm = ({
  review,
  setReviews,
  setNewCommentsList,
  modalCommentList,
  setModalCommentList,
}) => {
  const { user: loggedInUser } = useContext(UserStateContext);
  const { modalVisible } = useContext(ModalVisibleContext);
  // 부모 컴포넌트로부터 데이터를 받을 수 있다(리뷰 페이지에서 작성되는 경우)
  // 모달창에서 작성하는 경우 context로 전달받은 데이터를 사용한다
  const targetReview = review ? review : modalVisible?.data?.review;

  const [newCommentValue, setNewCommentValue] = useState("");
  const isValid = newCommentValue.length > 0 && newCommentValue.length <= 100;

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

      const res = await Api.post(`comments/${targetReview._id}`, {
        content: newCommentValue,
      });
      const updatedComment = res.data;
      if (!updatedComment) {
        return alert("요청 실패");
      }
      console.log(updatedComment, "응답 데이터");

      setNewCommentsList((current) => [...current, updatedComment]);
      setNewCommentValue("");
    } catch (error) {
      // 서버 error 핸들링
      // 인터셉터가 핸들링 하면 여긴 비워놔도 되는 건가?
      console.log(error);
    }
  };
  return (
    <Form onSubmit={handleCommentSubmit} className="comment__form">
      <input
        value={newCommentValue}
        onChange={(e) => {
          if (setModalCommentList) {
            setModalCommentList(e.target.value);
          } else {
            setNewCommentValue(e.target.value);
          }
        }}
        placeholder="댓글 달기..."
        className="comment__input"
      />
      {newCommentValue?.length > 0 && (
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
