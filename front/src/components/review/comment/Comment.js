import { Col, Container, Form, Row } from "react-bootstrap";
import Avatar from "../../common/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { ModalVisibleContext, UserStateContext } from "../../../App";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { MODAL_TYPE } from "../../../constants";
import Timestamp from "../../common/Timestamp";

const Comment = ({ comment, review }) => {
  const navigate = useNavigate();
  const { user: loggedInUser } = useContext(UserStateContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState(comment);
  const { modalVisible, setModalVisible } = useContext(ModalVisibleContext);
  const [targetId, setTargetId] = useState(null);
  const { postId, userId, content, userName, date } = comment;
  const isMyComment = loggedInUser && loggedInUser._id === userId;
  const isButtonsVisible = isMyComment && !isEditing;
  const isCommentEditBtnVisible =
    isMyComment && modalVisible.type === MODAL_TYPE.floatingReview;

  const editComment = async (e) => {
    e.preventDefault();
    if (!isMyComment) {
      // return setToastMsg("다른 사람의 게시물을 수정할 수 없습니다");
      alert("다른사람 게시물 수정못함");
    }
    try {
      // const res = await Api.put(`/comments/${postId}`);
    } catch (error) {
      console.log(error);
      // to do: 에러 메세지 핸들링
    }
  };

  const deleteComment = async () => {
    if (!isMyComment) {
      alert("다른 사람의 게시물");
    }
    console.log("삭제");
    //     // const res = await Api.delete(`/comments/${postId}`);
    //     console.log(postId);
  };

  return (
    <Container className="flex">
      <Row>
        <div>
          {!isEditing && (
            <div>
              <div className="py-1 px-0 flex-space-between line-break">
                <div className="comment__content d-flex w-100 flex-col">
                  <Avatar
                    className="comment__avatar"
                    width="30"
                    onClick={() => navigate(`/users/${userId}`)}
                  />
                  <div className="text-author mx-2">{userName}</div> {content}
                </div>
              </div>
              <Timestamp
                createdAt={date}
                className="text-timestamp comment__timestamp flex-justify-end"
              />
            </div>
          )}
        </div>
        {/* 댓글 수정 입력 인풋창 */}
        {isMyComment && isEditing && (
          <div className="pr-2 py-2">
            {/* to do: 인풋 레이아웃. pr, px 적용 안됨 */}
            <Form onSubmit={(e) => editComment(e)}>
              <Form.Control
                value={newComment.content}
                onChange={(e) =>
                  setNewComment({ ...comment, content: e.target.value })
                }
              />
            </Form>
          </div>
        )}
        {/* 2. 댓글 목록에서 ... 버튼: 클릭시 수정, 삭제, 취소 버튼 나타남 */}
        {/* 댓글 -> 수정으로 들어가면 댓글 창을 띄울 거라서 reviewId, review 정보가 필요함 */}
        {isCommentEditBtnVisible && (
          <div
            xs="auto"
            onClick={() => {
              setModalVisible({
                type: MODAL_TYPE.actionSelector,
                isVisible: true,
                data: {
                  FLOATING_REVIEW_DATA: { review, commentId: comment._id },
                },
              });
            }}
          >
            <FontAwesomeIcon icon={faEllipsis} />
          </div>
        )}
      </Row>
    </Container>
  );
};
export default Comment;
