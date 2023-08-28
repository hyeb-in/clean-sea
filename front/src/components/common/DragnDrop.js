import { faImage } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";

const CustomDragnDrop = ({ setSelectedFiles, handleFileChange }) => {
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
    const files = e.dataTransfer.files;
    setSelectedFiles(Array.from(files));
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
          id="file-input"
          className="file-input"
          multiple
          onChange={handleFileChange}
          accept="image/png, image/jpeg"
        />
        <div className="drag-drop-area">
          <div className="drag-drop-area__btn-container">
            <Button variant="outline-primary">이미지 가져오기</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDragnDrop;
