import { useState } from "react";

const useReview = () => {
  // 잘못생각한 것 같은뎅...a
  const [reviews, setReviews] = useState([]);
  const [currentReview, setCurrentReview] = useState({
    title: "",
    content: "",
  });

  return {
    reviews,
    setReviews,
    currentReview,
    setCurrentReview,
    // comments,
  };
};

export default useReview;
