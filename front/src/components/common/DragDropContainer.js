import { FileUploader } from "react-drag-drop-files";
import CarouselWrapper from "./Carousel";
import DragAndDrop from "./DragAndDrop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ModalVisibleContext } from "../../App";
import { MODAL_TYPE } from "../../constants";

const allowedFileTypes = ["png", "jpeg"];

const MAX_FILE_COUNT = 5;

const DragAndDropnPreview = ({ preview, setPreview, review, setReview }) => {
  const { modalVisible, setModalVisible } = useContext(ModalVisibleContext);
  const fileUploaderIndicator = !preview ? (
    <DragAndDrop />
  ) : (
    <Button className="mb-2">
      <FontAwesomeIcon icon={faPlus} /> 추가하기
    </Button>
  );

  // url 형식: 'blob:http://localhost:3001/06d1eea8-6299-4a3f-8bc8-98b3d5971515'
  // 이름 확인해야함
  const handleFileChange = (files) => {
    setReview(() => ({ ...review, uploadFile: files }));
    const blobUrls = [];
    const isFileCountValid = preview?.length + files.length <= MAX_FILE_COUNT;
    if (!isFileCountValid) {
      return alert("사진 한번에 5개까지 업로드");
    }
    Array.prototype?.forEach.apply(files, [
      (file) => {
        const blob = new Blob([file], { type: file.type });
        const url = URL.createObjectURL(blob);
        blobUrls.push(url);
      },
    ]);
    setPreview(blobUrls);
    setReview({ ...review, uploadFile: files });
  };

  useEffect(() => {
    // 모달이 닫힐 때 메모리에 저장된 Blob URL 삭제
    if (
      ((modalVisible.isVisible && modalVisible.type === MODAL_TYPE.addReview) ||
        modalVisible.type === MODAL_TYPE.editReview) &&
      preview?.length > 0
    ) {
      return () => {
        preview?.forEach((url) => URL.revokeObjectURL(url));
      };
    }
  }, [preview, modalVisible]);

  return (
    <>
      <FileUploader
        handleChange={handleFileChange}
        name="file"
        types={allowedFileTypes}
        multiple={true}
        maxSize={1} // 최대 2MB 크기까지 허용
        children={fileUploaderIndicator}
      />
      {preview && preview.length > 0 && (
        <CarouselWrapper imageUrls={preview} setPreview={setPreview} />
      )}
    </>
  );
};

export default DragAndDropnPreview;
