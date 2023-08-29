import {
  faArrowLeft,
  faArrowRight,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Image } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { serverUrl } from "../../Api";

const CarouselWrapper = ({ preview, setPreview, imageUrls }) => {
  // 업로드, 수정 할 때 삭제버튼 누르면 하나씩 제거

  const removeUrl = (index) => {
    setPreview((current) => {
      const newImageUrls = current.filter((item, idx) => idx !== index);
      return newImageUrls;
    });
  };

  console.log(imageUrls);

  return (
    <Carousel
      className={`carousel__container px-0`}
      interval={null}
      variant="dark"
      indicators={imageUrls?.length > 1}
      prevIcon={
        imageUrls?.length > 1 && (
          <FontAwesomeIcon icon={faArrowLeft} className="carousel-arrow-icon" />
        )
      }
      nextIcon={
        imageUrls?.length > 1 && (
          <FontAwesomeIcon
            icon={faArrowRight}
            className="carousel-arrow-icon"
          />
        )
      }
    >
      {/* to do: 중복 코드 제거하기 */}
      {imageUrls?.map((url, index) => {
        return (
          <Carousel.Item key={url}>
            <Image
              src={url.includes("blob") ? url : `${serverUrl}${url}`}
              fluid
            />
          </Carousel.Item>
        );
      })}
      {preview?.map((url, index) => {
        return (
          <Carousel.Item key={url}>
            <Image
              src={url.includes("blob") ? url : `${serverUrl}${url}`}
              fluid
            />
            {/* preview 삭제버튼 */}
            <Carousel.Caption className="d-flex justify-content-end">
              <Button variant="danger" onClick={() => removeUrl(index)}>
                삭제 <FontAwesomeIcon icon={faTrashCan} />
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

export default CarouselWrapper;
