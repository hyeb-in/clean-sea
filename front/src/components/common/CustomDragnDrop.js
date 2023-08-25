import { faImage } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    <div
      className={`upload-area ${isDragging ? "active" : ""}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <label htmlFor="file-input" className="upload-label">
        파일 선택
      </label>
      <input
        type="file"
        id="file-input"
        className="file-input"
        multiple
        onChange={handleFileChange}
        accept="image/png, image/jpeg"
      />
      <div className="drag-drop-area">
        <FontAwesomeIcon icon={faImage} />
      </div>
    </div>
  );
};

export default CustomDragnDrop;
