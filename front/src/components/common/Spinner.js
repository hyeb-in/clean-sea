import { Spinner } from "react-bootstrap";

const SpinnerWrapper = () => {
  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};
export default SpinnerWrapper;
