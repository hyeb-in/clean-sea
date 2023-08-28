import { Spinner } from "react-bootstrap";

const SpinnerWrapper = ({ text }) => {
  return (
    <div className="spinner">
      <Spinner animation="border" variant="primary" />
      <div className="mt-4">{text}</div>
    </div>
  );
};
export default SpinnerWrapper;
