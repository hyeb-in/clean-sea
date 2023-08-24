import { Col, Container, Form, Row } from "react-bootstrap";
import Avatar from "../../common/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { ModalVisibleContext, UserStateContext } from "../../../App";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { MODAL_TYPE } from "../../../constants";
import Timestamp from "../../common/Timestamp";

const Comment = ({ comment }) => {
  const navigate = useNavigate();
  const { user: loggedInUser } = useContext(UserStateContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState(comment);
  const { modalVisible, setModalVisible } = useContext(ModalVisibleContext);
  const [targetId, setTargetId] = useState(null);
  const { postId, userId, content, userName, date } = comment;
  // get user avatarUrl
  const isMyComment = loggedInUser && loggedInUser._id === userId;
  const isButtonsVisible = isMyComment && !isEditing;
  //  && isActionSelectorVisible;

  console.log(modalVisible);

  const editComment = async (e) => {
    e.preventDefault();

    console.log(modalVisible.data);
    if (!isMyComment) {
      // return setToastMsg("다른 사람의 게시물을 수정할 수 없습니다");
      alert("다른사람 게시물 수정못함");
    }
    try {
      // const res = await Api.put(`/comments/${postId}`);

      // 성공시 데이터 반영
      setIsEditing(false);
      setNewComment(comment);
      // setIsActionSelectorVisible(false);
    } catch (error) {
      console.log(error);
      // to do: 에러 메세지 핸들링
    }
  };

  const deleteComment = async () => {
    if (!isMyComment) {
      // return setToastMsg("다른 사람의 게시물을 수정할 수 없습니다");
      alert("다른 사람의 게시물");
    }
    console.log("삭제");
    //   try {
    //     // const res = await Api.delete(`/comments/${postId}`);
    //     console.log(postId);
    //     // 성공시 data 반영
    //     setIsEditing(false);
    //     setNewComment(comment);
    // setIsActionSelectorVisible(false);
    //   } catch (error) {
    //     console.log(error);
    //     // to do: error handling
    //   }
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
              <Timestamp createdAt={date} />
            </Col>
          )}
          {/* 댓글 수정 입력 인풋창 */}
          {isMyComment && isEditing && (
            <Col className="pr-2 py-2">
              {/* to do: 인풋 레이아웃. pr, px 적용 안됨 */}
              <Form onSubmit={(e) => editComment(e)}>
                <Form.Control
                  value={newComment.content}
                  onChange={(e) => {
                    // put api 요청 보내기
                    setNewComment({ ...comment, content: e.target.value });
                  }}
                />
              </Form>
            </Col>
          )}
          {/* to do: 내가 올린 거, 좋아요 누른 게시물이면 하트 solid */}

          {/* 2.\\ MODAL_TYPE.actionSelector: 클릭시 수정, 삭제, 취소 버튼 나타남 */}
          {isMyComment && modalVisible.type === MODAL_TYPE.actionSelector && (
            <Col
              xs="auto"
              onClick={() => {
                setModalVisible({
                  type: MODAL_TYPE.actionSelector,
                  isVisible: true,
                  data: {
                    commentId: comment._id,
                    comment,
                  },
                });
              }}
            >
              <FontAwesomeIcon icon={faEllipsis} />
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};
export default Comment;
