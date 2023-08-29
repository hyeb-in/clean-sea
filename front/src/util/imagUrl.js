export const cleanUpBlobUrls = (blobUrls) => {
  blobUrls.forEach((url) => URL.revokeObjectURL(url));
};

// FormUtils.js

export const createFormData = (formDataFileRef, userInputValues) => {
  const formDataFiles = Array.from(formDataFileRef.current);
  const formData = new FormData();

  formData.append("uploadFile", formDataFiles);
  if (formDataFiles && formDataFiles.length > 0) {
    for (let i = 0; i < formDataFiles.length; i++) {
      formData.append("uploadFile[]", formDataFiles[i]);
    }
    formData.append("title", userInputValues.title);
    formData.append("content", userInputValues.content);
  }
  // console.log(formData.getAll("uploadFile[]"));
  // console.log(formData.getAll("title"));
  // console.log(formData.getAll("content"));

  return formData;
};
