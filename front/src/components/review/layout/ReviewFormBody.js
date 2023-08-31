import { Col, Container, Row } from "react-bootstrap";

const ReviewFormBody = ({
  editedReview,
  setEditedReview,
  userInputValues,
  setUserInputValues,
}) => {
  // setUserInputValues({
  //   title: currentReviewData.title,
  //   content: currentReviewData.content,
  // });
  // app[x] ==> 폼바디 안에서 상태 관리 ==?

  // title, content, uploadFile
  return (
    <Container className="w-100">
      <Row className="d-flex flex-column">
        <Col className="w-100">
          <label className="w-100">제목</label>
          <input
            className="w-100"
            type="input"
            value={editedReview ? editedReview?.title : userInputValues.title}
            onChange={(e) => {
              if (editedReview) {
                setEditedReview({ ...editedReview, title: e.target.value });
              } else {
                setUserInputValues({
                  ...userInputValues,
                  title: e.target.value,
                });
              }
            }}
          />
        </Col>
        <Col className="w-100">
          <label className="w-100">내용</label>
          <textarea
            className="w-100"
            rows={6}
            value={
              editedReview ? editedReview.content : userInputValues.content
            }
            onChange={(e) => {
              if (editedReview && editedReview.content.length < 300) {
                // 300 길이로 조건 걸어두면 300에서 멈춰서 글자가 지워지지도 않음
                setEditedReview({
                  ...editedReview,
                  content: e.target.value,
                });
              } else {
                setUserInputValues({
                  ...userInputValues,
                  content: e.target.value,
                });
              }
            }}
          />
        </Col>
        <small
          className={
            editedReview?.content?.length < 300
              ? "text-muted flex-justify-end"
              : "delete flex-justify-end"
          }
        >
          {editedReview?.content ? editedReview.content.length : "0"}/300
        </small>
      </Row>
    </Container>
  );
};

export default ReviewFormBody;
