import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Image } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

const CarouselWrapper = ({ imageUrls, setReview }) => {
  const removeUrl = (index) => {
    const newImageUrls = imageUrls.filter((_, idx) => index !== idx); // Use a different variable name, like `_`, for clarity
    setReview((current) => ({ ...current, imageUrls: newImageUrls }));
  };
  return (
    <Carousel
      className="carousel px-0"
      interval={null}
      variant="dark"
      indicators={imageUrls.length > 1}
      prevIcon={
        imageUrls.length > 1 && (
          <FontAwesomeIcon icon={faArrowLeft} className="carousel-arrow-icon" />
        )
      }
      nextIcon={
        imageUrls.length > 1 && (
          <FontAwesomeIcon
            icon={faArrowRight}
            className="carousel-arrow-icon"
          />
        )
      }
    >
      {imageUrls.length === 0 && <Image src={imageUrls[0]} />}
      {/* to do: 실제 데이터로 바꾸면서 key 값 확인할 것 */}
      {imageUrls.map((img, index) => (
        <Carousel.Item key={img}>
          <Image src={img} fluid />
          {setReview && (
            <Carousel.Caption className="d-flex justify-content-end">
              <Button variant="danger" onClick={() => removeUrl(index)}>
                삭제 <FontAwesomeIcon icon={faTrashCan} />
              </Button>
            </Carousel.Caption>
          )}
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselWrapper;
