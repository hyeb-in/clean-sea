import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { Col } from "react-bootstrap";
import * as Api from "../../../Api";
import { useContext } from "react";
import { UserStateContext } from "../../../App";
import { IS_LIKE } from "../../../constants";

// isLiked가 reviews list에서 받아오는 값
const Like = ({ iLiked, reviewId, setReviews, likeCount }) => {
  const { user: loggedInUser } = useContext(UserStateContext);

  const handleLikes = async (e) => {
    if (!reviewId) {
      return alert("해당 정보를  찾을 수 없습니다");
    }
    if (!loggedInUser) {
      return alert("로그인 유저 없음");
    }
    try {
      const res = await Api.post("api/like", {
        targetType: "review",
        targetId: reviewId,
      });

      if (!res.ok) alert("실패");

      setReviews((current) =>
        current.map((item) => {
          if (item._id === reviewId) {
            return {
              ...item,
              isLike:
                res.data.message === IS_LIKE.added ? IS_LIKE.yes : IS_LIKE.no,
              likeCount:
                res.data.message === IS_LIKE.added
                  ? item.likeCount + 1
                  : item.likeCount - 1,
            };
          }
          return item;
        })
      );
    } catch (error) {
      console.log(error.statusCode);
      alert(error.statusCode);
    }
  };
  return (
    <Col onClick={handleLikes} className="flex-justify-end mx-0">
      <div className="text-like text-timestamp flex-justify-end">
        {likeCount > 0 && `좋아요 ${likeCount}개`}
      </div>

      {iLiked ? (
        <FontAwesomeIcon className="link" icon={fasHeart} />
      ) : (
        <FontAwesomeIcon className="link" icon={farHeart} />
      )}
    </Col>
  );
};

export default Like;
