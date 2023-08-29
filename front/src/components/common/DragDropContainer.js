import CarouselWrapper from "./Carousel";
import { useContext, useEffect, useRef } from "react";
import { ModalVisibleContext } from "../../App";
import { FileUploader } from "react-drag-drop-files";
import { Button, Form } from "react-bootstrap";
import ReviewFormBody from "../review/ReviewFormBody";
import ModalBodyWrapper from "./layout/ModalBodyWrapper";

// const MAX_FILE_COUNT = 5;
// const MAX_TOTAL_SIZE = 10 * 1024 * 1024; // 10MB, 최대 총 크기

const DragDropContainer = ({
  preview,
  setPreview,
  addReview,
  userInputValues,
  setUserInputValues,
  setFormDataFiles,
}) => {
  const { modalVisible } = useContext(ModalVisibleContext);
  const fileInputRef = useRef(null);

  // let fileCount = 0;
  // let totalSize = 0;

  // url 형식: 'blob:http://localhost:3001/06d1eea8-6299-4a3f-8bc8-98b3d5971515'
  // 파일 => blob => image url로 변경 => preview에 저장해서 이미지 슬라이드로 띄운다
  const handleFileChange = (files) => {
    if (!files) return alert("파일이 선택되지 않았습니다");
    // formDataFiles = targetFileList;
    // fileCount += targetFileList?.length;
    // FileList는 유사배열이기때문에 targetFileList.forEach 이런식으로 배열의 메소드를 사용할 수 없다
    // 배열 메소드 사용하려면 변환 후 사용하거나 apply call 사용해야함

    // if (targetFileList.length > 0) {
    //   targetFileList.forEach((file) => {
    //     totalSize += file.size;
    //   });
    // }
    // else {
    //   totalSize = targetFileList[0].size;
    // }

    // const fileCountValid = fileCount <= MAX_FILE_COUNT;
    const blobUrls = [];
    // console.log(fileCount, "files length counter");
    // console.log(totalSize, "files size counter");
    // if (!fileCountValid) {
    //   alert("사진 한번에 5개까지 업로드 가능합니다");
    // }
    // if (totalSize > MAX_TOTAL_SIZE) {
    //   // 추가된 파일 크기 알려주기
    //   alert(
    //     `최대 ${
    //       MAX_TOTAL_SIZE / (10 * 1024 * 1024)
    //     }MB까지 업로드할 수 있습니다.`
    //   );
    // }
    // blob-> url 유사배열이기 때문에 Array로 변환 후 forEach 혹은 apply로 배열의 메소드 적용

    const formDataFiles = Array.from(files);

    formDataFiles.forEach((file) => {
      const blob = new Blob([file], { type: file.type });
      const url = URL.createObjectURL(blob);
      blobUrls.push(url);
    });
    setPreview(blobUrls);
  };

  useEffect(() => {
    // 모달이 닫힐 때 메모리에 저장된 Blob URL 삭제
    if (!modalVisible?.isVisible && preview?.length > 0) {
      return () => {
        preview?.forEach((url) => URL.revokeObjectURL(url));
      };
    }
  }, [preview, modalVisible]);

  return (
    <ModalBodyWrapper>
      <Form className="addReview__form">
        {preview && preview.length > 0 ? (
          <CarouselWrapper preview={preview} setPreview={setPreview} />
        ) : (
          <FileUploader
            ref={fileInputRef}
            handleChange={(files) => handleFileChange(files)}
            name="file"
            types={["png", "jpeg"]}
            maxSize={10}
            multiple={true}
            onSizeError={() => alert("용랑이 너무 큽니다")}
          />
        )}

        <ReviewFormBody
          userInputValues={userInputValues}
          setUserInputValues={setUserInputValues}
        />
        <Button
          onClick={addReview}
          className="addreview__btn"
          variant="outline-primary"
        >
          확인
        </Button>
      </Form>
    </ModalBodyWrapper>
  );
};

export default DragDropContainer;
