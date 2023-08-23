import { useContext } from "react";
import { Col, Modal } from "react-bootstrap";
import { ModalVisibleContext } from "../../App";
import { MODAL_TYPE } from "../../constants";
import CarouselWrapper from "../common/Carousel";
import ModalBodyWrapper from "../common/ModalBodyWrapper";

const EditReview = () => {
  const { modalVisible, setModalVisible } = useContext(ModalVisibleContext);
  // to do: 수정 로직
  return (
    <Modal
      show={modalVisible.type === MODAL_TYPE.editReview}
      onHide={() =>
        setModalVisible({ type: null, isVisible: false, data: null })
      }
      centered
    >
      <ModalBodyWrapper title="게시글 수정하기" content={null}>
        <Col>
          <CarouselWrapper
            imageUrls={[
              "https://health.chosun.com/site/data/img_dir/2023/05/31/2023053102582_0.jpg",
              "https://health.chosun.com/site/data/img_dir/2023/05/31/2023053102582_0.jpg",
            ]}
          />
        </Col>
        <Col></Col>
      </ModalBodyWrapper>
    </Modal>
  );
};

export default EditReview;
