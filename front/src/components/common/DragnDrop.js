import { faImage } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointer } from "@fortawesome/free-regular-svg-icons";

const CustomDragnDrop = ({ handleFileChange, setInputFile }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    console.log(e.dataTransfer.files, "from drop");
    setInputFile(e.dataTransfer.files);
    setIsDragging(false);
  };

  return (
    <div
      className={`upload-area ${isDragging ? "active" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="upload-label-bottom-text">
        <label htmlFor="file-input" className="upload-label link">
          클릭해서 파일찾기
        </label>
        <div>파일을 여기로 드래그하세요</div>
        <FontAwesomeIcon icon={faHandPointer} />
        <FontAwesomeIcon icon={faImage} className="upload-icon" />
        <input
          type="file"
          id="file-input" // 라벨의 htmlFor로 연결시켜준다
          className="file-input"
          multiple
          onChange={(e) => {
            console.log(e.target.files, "from file");
            setInputFile(e.target.files);
            handleFileChange(e);
          }}
          accept="image/png, image/jpeg"
        />
      </div>
    </div>
  );
};

export default CustomDragnDrop;
