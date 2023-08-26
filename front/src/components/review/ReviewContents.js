import { truncate } from "../../constants";

const ReviewContents = ({ title, showDetails, content }) => {
  return (
    <div className="comment__title">
      <span className="mx-2">{title}</span>
      <span className="comment__content">
        {showDetails && truncate(content)}
        {content}
      </span>
    </div>
  );
};

export default ReviewContents;
