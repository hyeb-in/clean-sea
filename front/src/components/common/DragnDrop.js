import { faImage } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomDragnDrop = ({ handleFileChange }) => {
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
    setIsDragging(false);
  };

  return (
    <div>
      <div
        className={`upload-area ${isDragging ? "active" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <label htmlFor="file-input" className="upload-label">
          최대 10MB / jpeg, png 첨부 가능
        </label>
        <div className="upload-label-bottom-text">
          파일을 여기로 드래그하세요
        </div>

        <FontAwesomeIcon icon={faImage} className="upload-icon" />
        <input
          type="file"
          id="file-input" // 라벨의 htmlFor로 연결시켜준다
          className="file-input"
          multiple
          onChange={handleFileChange}
          accept="image/png, image/jpeg"
        />
        <div className="drag-drop-area">
          <div className="drag-drop-area__btn-container">
            {/* <label htmlFor="file-input" className="upload-label-bottom-text"> */}
            {/* <Button>클릭해서 업로드하기</Button> */}
            {/* </label> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDragnDrop;
