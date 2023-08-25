import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { Col } from "react-bootstrap";
import { IS_LIKE } from "../../constants";
import * as Api from "../../Api";
import { useContext, useState } from "react";
import { UserStateContext } from "../../App";

// isLiked가 reviews list에서 받아오는 값
const Like = ({ isLiked, reviewId, setReviews }) => {
  const { user: loggedInUser } = useContext(UserStateContext);
  const [isLikedState, setIsLikedState] = useState(isLiked);

  const handleLikes = async (e) => {
    if (!loggedInUser) {
      return alert("로그인 유저 없음");
    }
    try {
      const res = await Api.post("api/like", {
        targetType: "review",
        targetId: reviewId,
      });
      console.log(res.data.message);

      if (res.data.message === IS_LIKE.added) {
        setReviews((current) => {
          const newReviews = [...current];
          newReviews.forEach((item) => {
            if (item._id === reviewId) {
              item.isLike = IS_LIKE.yes;
              item.likeCount += 1;
            }
          });
          return newReviews;
        });
      }

      if (res.data.message === IS_LIKE.removed) {
        setReviews((current) => {
          const newReviews = [...current];
          newReviews.forEach((item) => {
            if (item._id === reviewId) {
              item.isLike = IS_LIKE.no;
              if (item.likeCount > 0) {
                item.likeCount -= 1;
              }
            }
          });
          return newReviews;
        });
      }
      setIsLikedState(!isLikedState);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <Col onClick={handleLikes} className="flex-justify-end mx-0">
      {isLikedState ? (
        <FontAwesomeIcon className="link" icon={fasHeart} />
      ) : (
        <FontAwesomeIcon icon={farHeart} />
      )}
    </Col>
  );
};

export default Like;
