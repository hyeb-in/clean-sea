const ShowMoreButton = ({ showDetails, setShowDetails }) => {
  return (
    <div
      onClick={() => setShowDetails(!showDetails)}
      className="text-timestamp mx-3 link"
    >
      더보기
    </div>
  );
};

export default ShowMoreButton;
