import { Button, Modal } from "react-bootstrap";

const ResponseIndicator = ({ modalOptions, setModalOptions }) => {
  return (
    <Modal
      show={modalOptions.state}
      onHide={() => {
        setModalOptions({
          state: null,
          description: null,
          title: null,
        });
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>{modalOptions.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{modalOptions.description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="success"
          onClick={() => {
            setModalOptions({
              state: null,
              description: null,
              title: null,
            });
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ResponseIndicator;
