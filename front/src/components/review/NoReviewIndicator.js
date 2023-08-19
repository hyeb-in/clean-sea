import { Button, Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const NoReviewIndicator = ({ loggedInUser, setShowUploadForm }) => {
  const navigate = useNavigate();

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ width: "100%", height: "calc(100vh - 20px)" }}
    >
      <Card style={{ width: "18rem", padding: "30px" }}>
        <Card.Body className="d-flex flex-column justify-content-center align-items-center">
          <Card.Title>작성된 리뷰가 없습니다</Card.Title>
          <Card.Text
            style={{
              margin: "0 0 50px 0",
              display: "flex",
              alignItems: "center",
              justifyItems: "center",
            }}
          >
            첫번째 게시물을 작성해보세요
          </Card.Text>
          {/* 클릭하면 setShowModal */}

          {loggedInUser ? (
            <Button variant="primary" onClick={() => setShowUploadForm(true)}>
              글 작성하기
            </Button>
          ) : (
            <Button variant="primary" onClick={() => navigate("/login")}>
              로그인
            </Button>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};
export default NoReviewIndicator;
