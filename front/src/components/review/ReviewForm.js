import { Col, Form, Row } from "react-bootstrap";

const ReviewForm = ({
  children: dargdrop,
  title,
  content,
  review,
  setReview,
  onSubmit,
}) => {
  return (
    <form
      id="uploadForm"
      onSubmit={onSubmit}
      method="POST"
      enctype="multipart/form-data"
    >
      {/* <Row className="align-items-center"> */}
      {/* <Col xs={7} className="d-flex flex-column align-items-center h-100"> */}
      {/* 드래그앤 드롭으로 파일 업로드 받을 수 있는 구역 */}
      {dargdrop}
      {/* </Col> */}
      {/* 리뷰 제목, 내용 입력 받는 인풋 */}
      {/* <Col xs={5}>
          <Form.Group>
            <Form.Label>제목</Form.Label>
            <Form.Control
              as="input"
              size="sm"
              value={title}
              onChange={(e) => setReview({ ...review, title: e.target.value })}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>내용</Form.Label>
            <Form.Control
              rows={6}
              as="textarea"
              value={content}
              onChange={(e) => {
                if (content.length < 300) {
                  // 300 길이로 조건 걸어두면 300에서 멈춰서 글자가 지워지지도 않음
                  setReview({ ...review, content: e.target.value });
                }
              }}
            />
          </Form.Group>
          <small
            className={
              content.length < 300
                ? "text-muted flex-justify-end"
                : "delete flex-justify-end"
            }
          >
            {content ? content.length : "0"}/300
          </small> */}
      <button
        form="uploadForm"
        type="submit"
        // onClick={onSubmit}
      >
        buttonwwwww
      </button>
      {/* </Col>
      </Row>  */}
    </form>
  );
};

export default ReviewForm;
