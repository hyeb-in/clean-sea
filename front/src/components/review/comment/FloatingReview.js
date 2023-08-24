import { CloseButton, Col, Container, Modal, Row } from "react-bootstrap";
import ReviewTitle from "../ReviewTitle";
import CarouselWrapper from "../../common/Carousel";
import { ModalVisibleContext } from "../../../App";
import { useContext } from "react";
import { MODAL_TYPE } from "../../../constants";
import Comment from "./Comment";

// 댓글 목록을 볼 수 있고, 댓글을 수정, 삭제 할 수 있는 모달창
// 그냥 Review를 볼 수 있는 컴포넌트와 다르게 생김 주의... 이름 바꿔야할 듯
// 모든 커멘트 목록이 필요함
const FloatingReview = () => {
  const { modalVisible, setModalVisible } = useContext(ModalVisibleContext);

  console.log(modalVisible.data);

  return (
    <Modal
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
            {
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
            }
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
              {/* {comments?.map((comment) => (
                <Comment comment={comment} />
              ))} */}
            </Row>
          </Container>
        </Col>
      </Row>
    </Modal>
  );
};

export default FloatingReview;
