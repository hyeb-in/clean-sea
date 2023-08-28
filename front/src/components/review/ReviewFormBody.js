import { Col, Container, Row } from "react-bootstrap";

const ReviewFormBody = ({ title, content, review, setReview }) => {
  return (
    // state로 값을 관리할 거면 굳이 form 사용 안해도 되는 듯 -> 확인 필요
    <Container className="w-100">
      <Row className="d-flex flex-column">
        <Col className="w-100">
          <label className="w-100">제목</label>
          <input
            className="w-100"
            type="input"
            value={title}
            onChange={(e) => setReview({ ...review, title: e.target.value })}
          />
        </Col>
        <Col className="w-100">
          <label className="w-100">내용</label>
          <textarea
            className="w-100"
            rows={6}
            value={content}
            onChange={(e) => {
              if (content.length < 300) {
                // 300 길이로 조건 걸어두면 300에서 멈춰서 글자가 지워지지도 않음
                setReview({ ...review, content: e.target.value });
              }
            }}
          />
        </Col>
        <small
          className={
            content.length < 300
              ? "text-muted flex-justify-end"
              : "delete flex-justify-end"
          }
        >
          {content ? content.length : "0"}/300
        </small>
      </Row>
    </Container>
  );
};

export default ReviewFormBody;
