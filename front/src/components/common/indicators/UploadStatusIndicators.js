import { faBomb, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Spinner } from "react-bootstrap";
import ModalBodyWrapper from "../layout/ModalBodyWrapper";
import { RESULT_ENUM } from "../../../constants";
import ToastWrapper from "../popup/ToastWrapper";
import useToast from "../../../hooks/useToast";

const UploadStatusIndicators = ({ uploadingStatus, setUploadingStatus }) => {
  const { showToast, toastData } = useToast();
  return (
    <>
      <Modal
        show={uploadingStatus === RESULT_ENUM.UPLOADING}
        centered
        className="backdrop"
        onHide={() => setUploadingStatus(null)}
      >
        <ModalBodyWrapper title="업로드 중입니다">
          <Spinner />
        </ModalBodyWrapper>
      </Modal>
      <Modal
        show={uploadingStatus === RESULT_ENUM.SUCCESS}
        centered
        className="backdrop"
        onHide={() => setUploadingStatus(null)}
      >
        <ModalBodyWrapper title="업로드 성공">
          <FontAwesomeIcon
            icon={faCircleCheck}
            className="uploading-indicator-icons"
          />
        </ModalBodyWrapper>
      </Modal>
      <Modal
        show={uploadingStatus === RESULT_ENUM.FAIL}
        centered
        className="backdrop"
        onHide={() => setUploadingStatus(null)}
      >
        <ModalBodyWrapper title="업로드에 실패했습니다">
          <FontAwesomeIcon
            icon={faBomb}
            className="uploading-indicator-icons"
          />
          {showToast && <ToastWrapper toastData={toastData} />}
        </ModalBodyWrapper>
      </Modal>
    </>
  );
};

export default UploadStatusIndicators;
