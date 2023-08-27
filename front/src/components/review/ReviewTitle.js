import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import Avatar from "../common/Avatar";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { UserStateContext } from "../../App";
import useModal, { MODAL_TYPE } from "../../hooks/useModal";

// children 사용처 어디?? 왜만든 건지 모르겠음
const ReviewTitle = ({ review, setReviews }) => {
  const navigate = useNavigate();
  const { user: loggedInUser } = useContext(UserStateContext);
  const { openModal, modalVisible } = useModal();
  const isMyReview = loggedInUser && loggedInUser._id === review?.author;
  console.log(modalVisible);
  return (
    <div className="d-flex align-items-center justify-content-between link px-0 commentModal">
      <div
        sm="auto"
        className="px-0"
        onClick={() => navigate(`/users/${review?.author}`)}
      >
        <Avatar width="40" />
        <div
          xs="10"
          className="px-2 pm-2 d-flex align-items-center text-author editForm__author"
        >
          {review?.userName}
        </div>
      </div>

      {/* 로그인 유저가 작성한 글이라면 ellipsis 버튼을 보여준다 */}
      {/* 클릭하면 수정, 삭제 선택하는 모달 창을 띄운다 */}
      <div className="flex-row-center-center" sm="auto">
        {isMyReview && (
          <Button
            variant="link"
            className="black"
            onClick={() => {
              const data = {
                target: MODAL_TYPE.editReview,
                review,
                setReviews,
              };
              openModal(MODAL_TYPE.actionSelector, data);
            }}
          >
            {/* 게시글 수정 화면이 아니라면 ... 대신 '완료'버튼을 보여준다 */}
            {modalVisible.type !== MODAL_TYPE.editReview && (
              <FontAwesomeIcon icon={faEllipsis} />
            )}
          </Button>
        )}
      </div>
      {/* {children && (
        <div xs="auto" className="flex-row-center-center p-4">
          {children}
        </div>
      )} */}
      {/* children  어디서 오는 건지 ???? */}
    </div>
  );
};

export default ReviewTitle;
