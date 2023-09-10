import { faBomb, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Spinner } from "react-bootstrap";
import ModalBodyWrapper from "../layout/ModalBodyWrapper";
import { RESULT_ENUM } from "../../../constants";
import ToastWrapper from "../popup/ToastWrapper";
import useToast from "../../../hooks/useToast";

const UploadStatusIndicators = ({ uploadingStatus, setUploadingStatus }) => {
  const { showToast, toastData } = useToast();

  let modalTitle = "";
  let modalIcon = null;

  if (uploadingStatus === RESULT_ENUM.UPLOADING) {
    modalTitle = "업로드 중입니다";
    modalIcon = <Spinner className="uploading-indicator-icons" />;
  } else if (uploadingStatus === RESULT_ENUM.SUCCESS) {
    modalTitle = "업로드 성공";
    modalIcon = (
      <FontAwesomeIcon
        icon={faCircleCheck}
        className="uploading-indicator-icons"
      />
    );
  } else if (uploadingStatus === RESULT_ENUM.FAIL) {
    modalTitle = "업로드에 실패했습니다";
    modalIcon = (
      <FontAwesomeIcon icon={faBomb} className="uploading-indicator-icons" />
    );
  }

  return (
    <>
      <Modal
        show={
          uploadingStatus === RESULT_ENUM.UPLOADING ||
          uploadingStatus === RESULT_ENUM.FAIL ||
          uploadingStatus === RESULT_ENUM.SUCCESS
        }
        centered
        className="backdrop"
        onHide={() => setUploadingStatus(null)}
      >
        <ModalBodyWrapper title={modalTitle}>
          {modalIcon}
          {uploadingStatus === RESULT_ENUM.FAIL && showToast && (
            <ToastWrapper toastData={toastData} />
          )}
        </ModalBodyWrapper>
      </Modal>
    </>
  );
};

export default UploadStatusIndicators;
