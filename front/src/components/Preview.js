import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card, Col, Container, Image, Row } from "react-bootstrap";

const Preview = ({ images }) => {
  return (
    <Container>
      <Col className="mt-4">
        <Row xs={6}>
          {images.map((img) => (
            <Card>
              <Card.Header>
                <FontAwesomeIcon icon={faTrash} />
              </Card.Header>
              <Card.Body>
                <Image src={img} fluid />
              </Card.Body>
            </Card>
          ))}
        </Row>
      </Col>
    </Container>
  );
};
export default Preview;
