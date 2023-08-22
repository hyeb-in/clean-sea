import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Avatar from "../common/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useContext, useState } from "react";
import { UserStateContext } from "../../App";
import * as Api from "../../Api";
import { faDeleteLeft, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ToastWrapper from "../common/ToastWrapper";

const Comment = ({ comment }) => {
  const navigate = useNavigate();
  const { user: loggedInUser } = useContext(UserStateContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState(comment);
  const [isEllipsisClicked, setIsEllipsisClicked] = useState(false);
  const [toastMsg, setToastMsg] = useState();
  console.log(isEditing, "is editing");

  console.log(newComment);
  const { postId, userId, content, userName, date } = comment;
  // get user avatarUrl
  const isMyComment = true;
  console.log(loggedInUser === userId, loggedInUser);
  // to do: 주석 풀기
  // const isMyComment = loggedInUser && loggedInUser._id === userId;
  const isButtonsVisible = isMyComment && !isEditing && isEllipsisClicked;
  const handleSubmit = async (e) => {
    // put api
    e.preventDefault();
    if (!isMyComment) {
      return setToastMsg("다른 사람의 게시물을 수정할 수 없습니다");
    }

    try {
      // const res = await Api.put(`/comments/${postId}`);
      console.log(comment);
      // 성공시 데이터 반영
      setIsEditing(false);
      setNewComment(comment);
      setIsEllipsisClicked(false);
    } catch (error) {
      console.log(error);
      // to do: 에러 메세지 핸들링
    }
  };

  const deleteComment = async () => {
    if (!isMyComment) {
      return setToastMsg("다른 사람의 게시물을 수정할 수 없습니다");
    }
    try {
      // const res = await Api.delete(`/comments/${postId}`);
      console.log(postId);
      // 성공시 data 반영
      setIsEditing(false);
      setNewComment(comment);
      setIsEllipsisClicked(false);
    } catch (error) {
      console.log(error);
      // to do: error handling
    }
  };

  return (
    <>
      <Container>
        <Row className="flex-row-center-center">
          <Col xs="auto" onClick={() => navigate(`/users/${userId}`)}>
            <Avatar width="50" />
          </Col>
          {!isEditing && (
            <Col className="py-2">
              <div>
                <strong>{userName}</strong> {content}
              </div>
              {/* to do: 날짜 형식 변환 */}
              <div className="">날짜</div>
            </Col>
          )}
          {/* isButtonsVisible 이면 수정, 삭제, 취소 버튼을 보여준다 */}
          {isButtonsVisible && (
            <>
              {/* to do: 댓글 수정 기능 구현 */}
              <Col xs="auto" onClick={() => setIsEditing(true)}>
                {/* 수정버튼 */}
                <FontAwesomeIcon icon={faPenToSquare} />
              </Col>
              <Col xs="auto" onClick={deleteComment}>
                <FontAwesomeIcon icon={faDeleteLeft}>삭제</FontAwesomeIcon>
              </Col>
              <Col
                xs="auto"
                onClick={() => {
                  setIsEditing(false);
                  setNewComment(comment);
                  setIsEllipsisClicked(false);
                }}
              >
                <Button variant="outline-danger">취소</Button>
              </Col>
            </>
          )}
          {/* 댓글 수정 입력 인풋창 */}
          {isMyComment && isEditing && (
            <>
              <Col className="pr-2 py-2">
                {/* to do: 인풋 레이아웃. pr, px 적용 안됨 */}
                <Form onSubmit={(e) => handleSubmit(e)}>
                  <Form.Control
                    value={newComment.content}
                    onChange={(e) => {
                      // put api 요청 보내기
                      setNewComment({ ...comment, content: e.target.value });
                    }}
                  />
                </Form>
              </Col>
            </>
          )}
          {/* to do: 내가 올린 거, 좋아요 누른 게시물이면 하트 solid */}
          {/* ellipsis 아이콘: 클릭시 수정, 삭제, 취소 버튼 나타남 */}
          {!isButtonsVisible && !isEditing && (
            <>
              <Col xs="auto">
                {/* to do: 좋아요 기능 구현 ? */}
                <FontAwesomeIcon icon={faHeart} />
              </Col>
              <Col xs="auto" onClick={() => setIsEllipsisClicked(true)}>
                <FontAwesomeIcon icon={faEllipsis} />
              </Col>
            </>
          )}
        </Row>
      </Container>
      {toastMsg && (
        <ToastWrapper
          onClose={() => setToastMsg("")}
          text={toastMsg}
          bg="warning"
          position="middle-center"
        />
      )}
    </>
  );
};
export default Comment;
