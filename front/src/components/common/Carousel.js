import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

const CarouselWrapper = ({ imageUrls, setReview }) => {
  const removeUrl = (index) => {
    const newImageUrls = imageUrls.filter((idx) => index !== idx);
    setReview((current) => ({ ...current, imageUrls: newImageUrls }));
  };
  return (
    <Carousel
      interval={null}
      variant="dark"
      prevIcon={
        imageUrls.length > 1 && (
          <FontAwesomeIcon
            icon={faArrowLeft}
            style={{
              backgroundColor: "black",
              padding: "5px",
              borderRadius: "50%",
            }}
          />
        )
      }
      nextIcon={
        imageUrls.length > 1 && (
          <FontAwesomeIcon
            icon={faArrowRight}
            style={{
              backgroundColor: "black",
              padding: "5px",
              borderRadius: "50%",
            }}
          />
        )
      }
    >
      {imageUrls.map((img, index) => (
        <Carousel.Item key={img}>
          <img
            className="d-block w-100"
            src={img}
            alt="slide"
            style={{ width: "auto", height: "320px", objectFit: "cover" }}
          />
          <Carousel.Caption style={{ textAlign: "right" }}>
            <Button variant="danger" onClick={() => removeUrl(index)}>
              삭제 <FontAwesomeIcon icon={faTrashCan} />
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselWrapper;
