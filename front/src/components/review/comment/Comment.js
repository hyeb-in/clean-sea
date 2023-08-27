import { Container, Row } from "react-bootstrap";
import Avatar from "../../common/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { ModalVisibleContext, UserStateContext } from "../../../App";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Timestamp from "../../common/microComponents/Timestamp";
import { MODAL_TYPE } from "../../../hooks/useModal";

// 수정은 모달창에서만 가능하게 할 것임!!!
// ... 누르면 action handler 모달 띄우고 -> 수정 -> 댓글창
// 삭제 -> 삭제
// 취소 -> 취소

const Comment = ({ review, comment, setModalCommentList }) => {
  const navigate = useNavigate();
  const { user: loggedInUser } = useContext(UserStateContext);
  const [isEditing, setIsEditing] = useState(false);
  const { modalVisible, setModalVisible } = useContext(ModalVisibleContext);
  const { postId, userId, content, userName, date } = comment;

  const isMyComment = loggedInUser && loggedInUser._id === userId;
  const isButtonsVisible = isMyComment && !isEditing;
  const isCommentEditBtnVisible =
    isMyComment && modalVisible.type === MODAL_TYPE.commentsList;

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
                  FLOATING_REVIEW_DATA: {
                    commentId: comment._id,
                    setModalCommentList,
                  },
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
