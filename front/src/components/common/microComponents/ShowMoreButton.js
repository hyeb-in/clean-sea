export const truncate = (content, number) => {
  return content?.length > number ? content.slice(0, number) + "..." : content;
};

export const ShowMoreButton = ({
  content,
  onClick,
  showDetails,
  className,
}) => {
  return (
    <span className="comment__content">
      <div
        onClick={onClick}
        className={`text-timestamp link show-more-btn ${className}`}
      >
        더보기 {showDetails ? truncate(content) : content}
      </div>
      {truncate(content, 40)}
    </span>
  );
};
