import { Col } from "react-bootstrap";

const LikeText = ({ likeCount }) => {
  return (
    <Col className="flex-justify-end mx-0">
      <div className="text-like text-timestamp flex-justify-end">
        {`좋아요 ${likeCount}개`}
      </div>
    </Col>
  );
};

export default LikeText;
