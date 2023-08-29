import Avatar from "../../common/Avatar";
import { useContext, useState } from "react";
import { UserStateContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import Timestamp from "../../common/microComponents/Timestamp";
import useModal, { MODAL_TYPE } from "../../../hooks/useModal";
import { Form } from "react-bootstrap";
import * as Api from "../../../Api";

const Comment = ({ review, comment }) => {
  const navigate = useNavigate();
  const { user: loggedInUser } = useContext(UserStateContext);
  const { userId } = comment;
  const { modalVisible, setModalVisible } = useModal();
  const isMyComment = loggedInUser && loggedInUser._id === userId;

  // 만약 modalVisible에 currentComment가 있다면
  // 해당 코멘트 id로 커맨트 창을 찾아서 edit input 을 보여준다
  const targetId = modalVisible.data?.currentComment?._id;

  const [isEditing, setIsEditing] = useState(targetId === comment._id);
  const [editCommentValue, setEditCommentValue] = useState(
    comment?.content || modalVisible.data?.currentComment?.content
  );
  const [result, setResult] = useState(comment);

  const onEditComment = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.put(`comments/${comment._id}`, {
        content: editCommentValue,
      });
      if (!res.ok) throw new Error("업데이트에 실패했습니다");

      setResult(res.data);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {
        <div className="comment__container">
          <div className="comment__col comment__title">
            {!isEditing && (
              <div className="text-content">
                <Avatar
                  className="comment__avatar"
                  width="30"
                  onClick={() => navigate(`/users/${userId}`)}
                />
                <span className="text-author">{result.userName}</span>
                {result.content}
              </div>
            )}
          </div>
          <div className="comment__col link">
            {!isEditing && (
              <Timestamp
                createdAt={result.date}
                className="text-timestamp comment__timestamp flex-justify-end"
              />
            )}

            {isMyComment && !isEditing && (
              <div className="comment__btn-col">
                <div
                  className="comment__edit-btn"
                  onClick={() => setIsEditing(true)}
                >
                  수정
                </div>
                <div
                  className="comment__col flex-justify-end link comment__edit-btn"
                  onClick={() => {
                    setModalVisible({
                      type: MODAL_TYPE.actionSelector,
                      isVisible: true,
                      data: {
                        commentId: comment._id,
                        setResult,
                      },
                    });
                  }}
                >
                  삭제
                </div>
              </div>
            )}

            {isMyComment && isEditing && (
              <Form
                onSubmit={onEditComment}
                className="comment__edit-input-container"
              >
                <input
                  className="comment__edit-input comment__input"
                  value={editCommentValue}
                  onChange={(e) => setEditCommentValue(e.target.value)}
                />
                <div
                  className="comment__edit-btn "
                  onClick={() => setIsEditing(false)}
                >
                  취소
                </div>
              </Form>
            )}
          </div>
        </div>
      }
    </>
  );
};
export default Comment;
