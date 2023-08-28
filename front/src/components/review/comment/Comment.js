import Avatar from "../../common/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { UserStateContext } from "../../../App";
import {
  faEllipsis,
  faPenToSquare,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Timestamp from "../../common/microComponents/Timestamp";
import useModal, { MODAL_TYPE } from "../../../hooks/useModal";
import { Form } from "react-bootstrap";
import * as Api from "../../../Api";
import CommentForm from "./CommentForm";

// 수정은 모달창에서만 가능하게 할 것임!!!
// ... 누르면 action handler 모달 띄우고 -> 수정 -> 댓글창
// 삭제 -> 삭제
// 취소 -> 취소

const Comment = ({ review, comment }) => {
  const navigate = useNavigate();
  const { user: loggedInUser } = useContext(UserStateContext);
  const { userId, content, userName, date } = comment;
  const { modalVisible, setModalVisible } = useModal();
  const isMyComment = loggedInUser && loggedInUser._id === userId;

  const editingData = {
    currentComment: comment,
    review,
  };
  // 만약 modalVisible에 currentComment가 있다면
  // 해당 코멘트 id로 커맨트 창을 찾아서 edit input 을 보여준다
  const targetId = modalVisible.data?.currentComment?._id;

  const [isEditing, setIsEditing] = useState(targetId === comment._id);
  const [editCommentValue, setEditCommentValue] = useState(
    comment?.content || modalVisible.data?.currentComment?.content
  );
  const [data, setData] = useState(null);

  console.log(targetId === comment._id);

  const onEditComment = async (e) => {
    e.preventDefault();
    console.log(editCommentValue);
    try {
      const res = await Api.put(`comments/${comment._id}`, {
        content: editCommentValue,
      });
      if (!res.ok) throw new Error("업데이트에 실패했습니다");
      setData(res.data);
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {
        <div className="comment__flex">
          <span className="comment__col">
            <Avatar
              className="comment__avatar"
              width="30"
              onClick={() => navigate(`/users/${userId}`)}
            />
            <span className="text-author">{userName}</span>
            {!isEditing && !data && content}
            {data && !isEditing && data.content}
          </span>

          <Timestamp
            createdAt={date}
            className="text-timestamp comment__timestamp flex-justify-end"
          />

          {/* 2. 댓글 목록에서 ... 버튼: 클릭시 수정, 삭제, 취소 버튼 나타남 */}
          {/* 댓글 -> 수정으로 들어가면 댓글 창을 띄울 거라서 reviewId, review 정보가 필요함 */}
          {isMyComment && (
            <>
              {!isEditing ? (
                <div className="comment__btn-col">
                  <FontAwesomeIcon
                    onClick={() => setIsEditing(true)}
                    icon={faPenToSquare}
                  />
                  <div
                    className="comment__col flex-justify-end "
                    onClick={() => {
                      setModalVisible({
                        type: MODAL_TYPE.actionSelector,
                        isVisible: true,
                        data: editingData,
                      });
                    }}
                  ></div>
                  {<FontAwesomeIcon icon={faX} className="mx-3 link" />}
                </div>
              ) : (
                <Form onSubmit={onEditComment}>
                  <input
                    className="comment__edit-input"
                    value={editCommentValue}
                    onChange={(e) => setEditCommentValue(e.target.value)}
                  />
                </Form>
              )}
            </>
          )}
        </div>
      }
    </>
  );
};
export default Comment;
