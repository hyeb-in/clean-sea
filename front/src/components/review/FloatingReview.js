import { CloseButton, Container, Modal, Row } from "react-bootstrap";
import ReviewTitle from "./ReviewTitle";
import CarouselWrapper from "../common/Carousel";
import Comment from "./comment/Comment";
import { ModalVisibleContext } from "../../App";
import { useContext } from "react";

const FloatingReview = () => {
  const { modalVisible, setModalVisible } = useContext(ModalVisibleContext);
  const review = modalVisible?.data;
  console.log(modalVisible, review);

  return (
    <>
      <ReviewTitle
        // review={showingReview}
        // setReviews={setReviews}
        className="p-2"
      >
        {
          <CloseButton
            // to do: 경고창 먼저 띄우기
            onClick={() =>
              setModalVisible({
                type: null,
                isVisible: false,
                data: null,
              })
            }
            aria-label="Hide"
          />
        }
      </ReviewTitle>
      <CarouselWrapper
        imageUrls={[
          "https://health.chosun.com/site/data/img_dir/2023/05/31/2023053102582_0.jpg",
          "https://health.chosun.com/site/data/img_dir/2023/05/31/2023053102582_0.jpg",
        ]}
      />
      <Container>
        <Row className="py-4 mx-2">
          {/* {mock.map((comment) => (
        <Comment comment={comment} />
      ))} */}
        </Row>
      </Container>
    </>
  );
};

export default FloatingReview;
