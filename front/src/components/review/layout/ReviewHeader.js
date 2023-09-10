import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import Avatar from "../../common/Avatar";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { ModalVisibleContext, UserStateContext } from "../../../App";
import { MODAL_TYPE } from "../../../constants";
import * as Api from "../../../Api";

const ReviewTitle = ({ children, review }) => {
  const navigate = useNavigate();
  const { user: loggedInUser } = useContext(UserStateContext);
  const { modalVisible, setModalVisible } = useContext(ModalVisibleContext);
  const isMyReview = loggedInUser && loggedInUser._id === review?.author;

  return (
    <div className="d-flex align-items-center justify-content-between link px-0">
      <div sm="auto d-flex">
        <div
          sm="auto"
          className="px-0"
          onClick={() => navigate(`/users/${review?.author}`)}
        >
          <div
            xs="10"
            className="px-2 pm-2 d-flex align-items-center text-author editForm__author"
          >
            {review?.userName}
          </div>
        </div>
      </div>
      {/* 로그인 유저가 작성한 글이라면 ellipsis 버튼을 보여준다 */}
      {/* 클릭하면 수정, 삭제 선택하는 모달 창을 띄운다 */}
      <div className="flex-row-center-center" sm="auto">
        {isMyReview && (
          <Button
            variant="link"
            className="black"
            onClick={() =>
              setModalVisible({
                type: MODAL_TYPE.actionSelector,
                isVisible: true,
                data: {
                  reviewId: review._id,
                  review, // edit form 초기값을 위해서 필요
                },
              })
            }
          >
            {/* 게시글 수정 화면이 아니라면 ... 대신 '완료'버튼을 보여준다 */}
            {modalVisible.type !== MODAL_TYPE.editReview && (
              <FontAwesomeIcon icon={faEllipsis} />
            )}
          </Button>
        )}
      </div>
      {children && (
        <div xs="auto" className="flex-row-center-center p-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default ReviewTitle;
