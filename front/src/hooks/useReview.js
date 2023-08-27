import { useState } from "react";
import * as Api from "../Api";

const useReview = () => {
  // 잘못생각한 것 같은뎅...a
  const [reviews, setReviews] = useState([]);
  const [currentReview, setCurrentReview] = useState({
    title: "",
    content: "",
  });

  const editReview = async (reviewId, { title, content }) => {
    try {
      const response = await Api.put(`reviews/${reviewId}`, { title, content });
      setReviews([...reviews, response.data]);
    } catch (error) {
      console.error("리뷰를 수정할 수 없습니다", error);
    }
  };

  return {
    reviews,
    setReviews,
    currentReview,
    setCurrentReview,
    // comments,
    editReview,
  };
};

export default useReview;
