import {
  faArrowLeft,
  faArrowRight,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";

const CarouselWrapper = ({ imageUrls, setImageUrls }) => {
  const removeUrl = (index) => {
    const newImageUrls = [...imageUrls].splice(index, 1);
    setImageUrls(newImageUrls);
  };
  return (
    <Carousel
      variant="dark"
      prevIcon={
        <FontAwesomeIcon
          icon={faArrowLeft}
          style={{
            backgroundColor: "black",
            padding: "5px",
            borderRadius: "50%",
          }}
        />
      }
      nextIcon={
        <FontAwesomeIcon
          icon={faArrowRight}
          style={{
            backgroundColor: "black",
            padding: "5px",
            borderRadius: "50%",
          }}
        />
      }
    >
      {imageUrls.map((img, index) => (
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={img}
            alt="slide"
            style={{ width: "auto", height: "320px", objectFit: "cover" }}
          />
          <Carousel.Caption style={{ textAlign: "right" }}>
            <Button variant="dark" onClick={() => removeUrl(index)}>
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default CarouselWrapper;
