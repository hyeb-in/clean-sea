import { FileUploader } from "react-drag-drop-files";
import CarouselWrapper from "./Carousel";
import DropZone from "./DropZone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ModalVisibleContext } from "../../App";

const allowedFileTypes = ["png", "jpeg"];

const MAX_FILE_COUNT = 5;

const DragDropContainer = ({
  preview,
  setPreview,
  blobURLsExpired,
  setFiles,
}) => {
  const { modalVisible, setModalVisible } = useContext(ModalVisibleContext);

  const fileUploaderIndicator = !preview ? (
    <DropZone />
  ) : (
    <Button className="mb-2">
      <FontAwesomeIcon icon={faPlus} /> 추가하기
      {/* 실제 submit 버튼 아님!! >> 사진을 추가하는 버튼 */}
    </Button>
  );
  let fileCount = preview && preview.length;

  // url 형식: 'blob:http://localhost:3001/06d1eea8-6299-4a3f-8bc8-98b3d5971515'
  // 파일 => blob => image url로 변경 => preview에 저장해서 이미지 슬라이드로 띄운다
  const handleFileChange = (files) => {
    setFiles(files);
    fileCount += files?.length;
    const fileCountValid = fileCount <= MAX_FILE_COUNT;
    const blobUrls = [];
    // 1. 데이터 => 이미지 슬라이드 미리보기 먼저 구현
    // 2. 추가, 삭제 로직 <<<
    // 3. 새로 파일 업로드 해도 기존 데이터 유지시키고 삭제하려면 버튼으로 삭제한다
    if (!fileCountValid) {
      throw new Error("사진 한번에 5개까지 업로드");
    }

    // blob-> url 유사배열이기 때문에 apply로 배열의 메소드 적용
    Array.prototype?.forEach.apply(files, [
      (file) => {
        const blob = new Blob([file], { type: file.type });
        const url = URL.createObjectURL(blob);
        blobUrls.push(url);
      },
    ]);
    setPreview(blobUrls);
  };

  useEffect(() => {
    // 모달이 닫힐 때 메모리에 저장된 Blob URL 삭제
    if (blobURLsExpired) {
      const hasEnded = !modalVisible.isVisible;
      if (hasEnded && preview?.length > 0) {
        return () => {
          preview?.forEach((url) => URL.revokeObjectURL(url));
        };
      }
    }
  }, [preview, modalVisible, blobURLsExpired]);

  return (
    <>
      <FileUploader
        handleChange={handleFileChange}
        name="uploadFile"
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

export default DragDropContainer;
