import { Spinner } from "react-bootstrap";

const SpinnerWrapper = ({ text }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        margin: "100px 0",
        flexDirection: "column",
        justifyItems: "center",
        alignItems: "center",
      }}
    >
      <Spinner animation="border" variant="primary" />
      <div style={{ marginTop: "40px" }}>{text}</div>
    </div>
  );
};
export default SpinnerWrapper;
