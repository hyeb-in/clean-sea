import React from "react";
import ReviewCard from "../components/ReviewCard";
import { Col, Container, Row } from "react-bootstrap";

const reviews = [
  {
    id: 0,
    author: "name",
    title: "title",
    content:
      "content Quis aliqua veniam minim aute tempor labore sunt nisi eu est aliqua eu velit ad.",
    imageUrl:
      "https://health.chosun.com/site/data/img_dir/2023/05/31/2023053102582_0.jpg",
  },
  {
    id: 1,
    author: "name",
    title: "title",
    content:
      "content Quis aliqua veniam minim aute tempor labore sunt nisi eu est aliqua eu velit ad.",
    imageUrl:
      "https://health.chosun.com/site/data/img_dir/2023/05/31/2023053102582_0.jpg",
  },
  {
    id: 2,
    author: "name",
    title: "title",
    content:
      "content Quis aliqua veniam minim aute tempor labore sunt nisi eu est aliqua eu velit ad.",
    imageUrl:
      "https://health.chosun.com/site/data/img_dir/2023/05/31/2023053102582_0.jpg",
  },
  {
    id: 3,
    author: "name",
    title: "title",
    content:
      "content Quis aliqua veniam minim aute tempor labore sunt nisi eu est aliqua eu velit ad.",
    imageUrl:
      "https://health.chosun.com/site/data/img_dir/2023/05/31/2023053102582_0.jpg",
  },
  {
    id: 4,
    author: "name",
    title: "title",
    content:
      "content Quis aliqua veniam minim aute tempor labore sunt nisi eu est aliqua eu velit ad.",
    imageUrl:
      "https://health.chosun.com/site/data/img_dir/2023/05/31/2023053102582_0.jpg",
  },
];

const Network = () => {
  return (
    <>
      <Container className="py-3">
        <Row xs={1} md={2} lg={3}>
          {reviews &&
            reviews.map((review) => (
              <Col
                key={review.id}
                className="d-flex justify-content-center align-items-center"
              >
                <ReviewCard review={review} />
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
};

export default Network;
