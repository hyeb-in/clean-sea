import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Modal, Row } from "react-bootstrap";
import ReviewCard from "./Review";
import SpinnerWrapper from "../common/Spinner";
import NoReviewIndicator from "./NoReviewIndicator";
import * as Api from "../../Api";
import { HandlerEnabledContext, ModalVisibleContext } from "../../App";
import ActionSelectorModal from "../common/ActionSelectorModal";
import { MODAL_TYPE } from "../../constants";
import FloatingReview from "./FloatingReview";
import EditReview from "./EditReview";

const Reviews = ({ reviews, setReviews }) => {
  const { setIsHandlerEnabled } = useContext(HandlerEnabledContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const { modalVisible, setModalVisible } = useContext(ModalVisibleContext);
  console.log(modalVisible?.type === MODAL_TYPE.actionSelector);
  console.log(modalVisible);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Api.get("reviews/reviewList");
        // to do: 서버에러 -> 모달창으로 바꾸기
        setIsHandlerEnabled(true);
        setReviews(res.data);
        setIsLoaded(true);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [setIsHandlerEnabled, setReviews]);

  return (
    <>
      <Container className="py-3">
        <Row xs={1}>
          {/* to do: 서버 에러 났을 경우 알려주기 -> 해결 방안 보여주기 */}
          {!isLoaded && <SpinnerWrapper text="로딩 중..." />}
          {isLoaded &&
            reviews?.length > 0 &&
            reviews.map((review) => (
              <Col
                key={review._id}
                className="d-flex justify-content-center align-items-center"
              >
                <ReviewCard review={review} setReviews={setReviews} />
              </Col>
            ))}
          {isLoaded && reviews?.length === 0 && <NoReviewIndicator />}
        </Row>
      </Container>
      {/* {} */}
      {/* 1. isActionSelectorVisible, setActionSelectorVisible 상태관리 useContext */}
      {/* 2. 삭제, 취소, 수정 띄우는 ActionSelectorModal */}
      {/* 3. 커멘트 수정 -> ActionSelectorModal 없애고 -> FloatingReviewModal */}

      {/* 액션 셀렉터 - 수정, 삭제, 취소 모달창 띄우기 */}
      {modalVisible.type === MODAL_TYPE.actionSelector && (
        <ActionSelectorModal />
      )}

      {/* 댓글 전체 볼 수 있는 창 띄우기 */}
      {modalVisible.type === MODAL_TYPE.floatingReview && (
        <Modal show={true} centered>
          <FloatingReview />
          {/* to do: Modal은 FloatingReview 내부로 옮겨도 될 듯 */}
        </Modal>
      )}
      {/* 수정하기 폼 모달 띄우기 */}
      {modalVisible.type === MODAL_TYPE.editReview && (
        <EditReview
          headerTitle="수정하기"
          reviews={reviews}
          setReviews={setReviews}
        />
      )}
    </>
  );
};

export default Reviews;
