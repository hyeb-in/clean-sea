import { CloseButton, Col, Container, Modal, Row } from "react-bootstrap";
import ReviewHeader from "../layout/ReviewTitle";
import CarouselWrapper from "../../common/Carousel";
import Comment from "./Comment";
import AddCommentForm from "./CommentForm";
import useModal, { MODAL_TYPE } from "../../../hooks/useModal";
import * as Api from "../../../Api";
import { useEffect, useRef, useState } from "react";

// 리뷰와 함께 댓글 목록을 볼 수 있고, 댓글을 수정, 삭제 할 수 있는 모달창
// 업데이트시 해야할 일
// 1. background에 보이는 커맨트 리스트를 업데이트 해야함
// 2. 모달창에 있는 커맨트 리스트 업데이트
// -> 모든 커멘트 목록이 필요
const CommentsModal = () => {
  const { modalVisible } = useModal();
  const scrollRef = useRef(null);

  const { review, setComments, newComments, setNewComments, setCommentCount } =
    modalVisible.data;
  const { closeModal } = useModal();
  const [modalNewComments, setModalNewComments] = useState([]);

  // // 댓글 입력시 자동 스크롤
  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [modalNewComments, newComments]);

  try {
    useEffect(() => {
      console.log("newComments");
      const getAllComments = async () => {
        const res = await Api.get(`comments/${review._id}`);
        if (!res.data) throw new Error("데이터를 가져올 수 없습니다");
        setModalNewComments(res.data);
      };
      getAllComments();

      // newComments 가 갱신될 때마다 다시 그려준다 ??
    }, [review, newComments, setNewComments]);
  } catch (error) {
    console.log(error);
  }

  return (
    <Modal
      sm={1}
      lg={6}
      show={modalVisible.type === MODAL_TYPE.commentsList}
      onHide={closeModal}
      centered
      dialogClassName="commentModal__modalWrapper"
    >
      <Row className="flex-row-center-center carousel-bg-black">
        <ReviewHeader review={review} className="commentModal__title">
          <CloseButton className="close-btn" onClick={closeModal} />
        </ReviewHeader>
        <Col className="carousel-bg-white">
          <CarouselWrapper
            className="carousel__container"
            imageUrls={review.uploadFile}
          />
        </Col>
        <Col className="carousel-bg-white">
          <Container className="comment-list__container">
            <Row className="py-4 mx-2">
              {modalNewComments?.map((comment) => (
                <div key={comment._id}>
                  <Comment comment={comment} setComments={setComments} />
                </div>
              ))}
              <AddCommentForm
                setNewComments={setNewComments}
                setModalNewComments={setModalNewComments}
                setCommentCount={setCommentCount}
              />
            </Row>
            <div ref={scrollRef}></div>
          </Container>
        </Col>
      </Row>
    </Modal>
  );
};

export default CommentsModal;
