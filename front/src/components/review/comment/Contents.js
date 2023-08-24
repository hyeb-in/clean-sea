import { truncate } from "../../../constants";

const Contents = ({ title, showDetails, content }) => {
  return (
    <div className="comment__title">
      <span> {title}</span>
      <span className="comment__content">
        {showDetails && truncate(content)}
      </span>
    </div>
  );
};

export default Contents;
