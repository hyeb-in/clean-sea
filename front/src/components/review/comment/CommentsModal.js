import { CloseButton, Col, Container, Modal, Row } from "react-bootstrap";
import ReviewHeader from "../ReviewTitle";
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

  const { review } = modalVisible.data;
  const { closeModal } = useModal();
  const [modalCommentList, setModalCommentList] = useState([]);
  const [newCommentsList, setNewCommentsList] = useState([]);

  // 댓글 입력시 자동 스크롤
  useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [modalCommentList, newCommentsList]);

  try {
    useEffect(() => {
      const getAllComments = async () => {
        const res = await Api.get(`comments/${review._id}`);
        if (!res.data) throw new Error("데이터를 가져올 수 없습니다");
        setModalCommentList(res.data);
      };
      getAllComments();
    }, [review]);
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
        <ReviewHeader
          review={modalVisible.data.review}
          className="commentModal__title"
        >
          <CloseButton
            className="close-btn"
            // to do: 댓글 입력중이었다면 경고창 먼저 띄우기
            onClick={closeModal}
          />
        </ReviewHeader>
        <Col className="carousel-bg-white">
          <CarouselWrapper
            className="carousel__container"
            preview={[
              "https://health.chosun.com/site/data/img_dir/2023/05/31/2023053102582_0.jpg",
              "https://health.chosun.com/site/data/img_dir/2023/05/31/2023053102582_0.jpg",
            ]}
          />
        </Col>
        <Col className="carousel-bg-white">
          <Container className="comment-list__container">
            <Row className="py-4 mx-2">
              {modalCommentList?.length > 0 &&
                modalCommentList?.map((comment) => (
                  <Comment
                    comment={comment}
                    key={comment._id}
                    setModalCommentList={setModalCommentList}
                  />
                ))}
              {newCommentsList?.length > 0 &&
                newCommentsList.map((comment) => (
                  <div key={comment._id}>
                    <Comment comment={comment} />
                  </div>
                ))}
              <AddCommentForm setNewCommentsList={setNewCommentsList} />
            </Row>
            <div ref={scrollRef}></div>
          </Container>
        </Col>
      </Row>
    </Modal>
  );
};

export default CommentsModal;
