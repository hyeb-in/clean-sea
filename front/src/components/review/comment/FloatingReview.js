import {
  Button,
  CloseButton,
  Col,
  Container,
  Modal,
  Row,
} from "react-bootstrap";
import ReviewTitle from "../ReviewTitle";
import CarouselWrapper from "../../common/Carousel";
import { ModalVisibleContext } from "../../../App";
import { useContext } from "react";
import { MODAL_TYPE } from "../../../constants";
import Comment from "./Comment";

const FloatingReview = () => {
  const { modalVisible, setModalVisible } = useContext(ModalVisibleContext);
  const review = modalVisible?.data;
  console.log(modalVisible);

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
              {review.comments?.map((comment) => (
                <Comment comment={comment} />
              ))}
            </Row>
          </Container>
        </Col>
      </Row>
    </Modal>
  );
};

export default FloatingReview;
