import { Col, Container, Row } from "react-bootstrap";
import Avatar from "../common/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { useContext } from "react";
import { UserStateContext } from "../../App";

const Comment = ({ comment }) => {
  const { user: loggedInUser } = useContext(UserStateContext);
  const { postId, userId, content, userName, date } = comment;
  // get user avatarUrl
  const isMyComment = loggedInUser && loggedInUser._id === userId;
  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center">
        <Col xs="auto">
          <Avatar width="50" />
        </Col>
        <Col className="px-0 py-2">
          <div>
            <strong>{userName}</strong> {content}
          </div>
          {/* to do: 날짜 형식 변환 */}
          <div className="">날짜</div>
        </Col>
        {isMyComment && (
          <Col xs="auto">
            <FontAwesomeIcon icon={faPenToSquare} />
            {/* to do:  댓글 edit 기능 구현 */}
          </Col>
        )}
        <Col xs="auto">
          <FontAwesomeIcon icon={faHeart} />
          {/* to do:  좋아요 기능 구현 ? */}
        </Col>
      </Row>
    </Container>
  );
};
export default Comment;
