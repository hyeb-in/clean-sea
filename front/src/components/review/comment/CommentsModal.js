import {
  Button,
  CloseButton,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import ReviewTitle from "../ReviewTitle";
import CarouselWrapper from "../../common/Carousel";
import { ModalVisibleContext, UserStateContext } from "../../../App";
import { useContext, useState } from "react";
import { MODAL_TYPE } from "../../../constants";
import * as Api from "../../../Api";
import Comment from "./Comment";

// 댓글 목록을 볼 수 있고, 댓글을 수정, 삭제 할 수 있는 모달창
// 그냥 Review를 볼 수 있는 컴포넌트와 다르게 생김 주의... 이름 바꿔야할 듯
// 모든 커멘트 목록이 필요함
const FloatingReview = () => {
  const { user: loggedInUser } = useContext(UserStateContext);
  const { modalVisible, setModalVisible } = useContext(ModalVisibleContext);
  const {
    data: { reviewId, review, setNewComments, setReviews },
  } = modalVisible;

  // data: {
  //   reviewId,
  //   review,
  //   setNewComments,
  //   setReviews,
  const [comment, setComment] = useState("");
  const isValid = comment.length > 0 && comment.length < 100;

  console.log(modalVisible.data);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!loggedInUser) {
        alert("유저 없음");
      }
      // 글자수 제한: 1글자이상 100자이하
      if (!isValid) {
        alert("글자수 제한");
      }
      // review id로 해당 리뷰를 찾아서 review.Likes id가 있나? 값으로 갱신한다??
      // isLikes에 userId가 저장되어있음
      const res = await Api.post(`comments/${reviewId}`, { content: comment });
      if (!res.data) {
        return alert("요청 실패");
      }

      setReviews((current) => [...current, res.data]);
      setNewComments((newComments) => [...newComments, res.data]);
      setComment("");
    } catch (error) {
      // 서버 error 핸들링
      alert(error);
    }
  };

  return (
    <Modal
      sm={1}
      lg={6}
      show={modalVisible.type === MODAL_TYPE.floatingReview}
      onHide={() => {
        setModalVisible({
          type: null,
          isVisible: false,
          data: null,
        });
      }}
      centered
    >
      <Row className="flex-row-center-center carousel-bg-black">
        <Col className="carousel-bg-white">
          <ReviewTitle review={modalVisible.data}>
            <CloseButton
              className="close-btn"
              // to do: 댓글 입력중이었다면 경고창 먼저 띄우기
              onClick={() =>
                setModalVisible({
                  type: null,
                  isVisible: false,
                  data: null,
                })
              }
            />
          </ReviewTitle>
          <CarouselWrapper
            className="carousel__container"
            imageUrls={[
              "https://health.chosun.com/site/data/img_dir/2023/05/31/2023053102582_0.jpg",
              "https://health.chosun.com/site/data/img_dir/2023/05/31/2023053102582_0.jpg",
            ]}
          />
        </Col>
        <Col className="carousel-bg-white">
          <Container>
            <Row className="py-4 mx-2">
              {review.comments?.map((comment) => (
                <Comment comment={comment} />
              ))}
              <Form onSubmit={handleCommentSubmit} className="comment__form">
                <input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="댓글 달기..."
                  className="comment__input"
                />
                {comment?.length > 0 && (
                  <Button
                    onClick={handleCommentSubmit}
                    variant="outline-primary"
                    className="comment__button"
                  >
                    게시
                  </Button>
                )}
              </Form>
            </Row>
          </Container>
        </Col>
      </Row>
    </Modal>
  );
};

export default FloatingReview;
