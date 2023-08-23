import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Modal, Row, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBomb,
  faCircleCheck,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FileUploader } from "react-drag-drop-files";
import Carousel from "../common/Carousel";
import ToastWrapper from "../common/ToastWrapper";
import {
  EditFormContext,
  EditingDataContext,
  UploadFormContext,
  UserStateContext,
} from "../../App";
import DragAndDrop from "../common/DragAndDrop";
import * as Api from "../../Api";
import SpinnerWrapper from "../common/Spinner";
import ModalBodyWrapper from "../common/ModalBodyWrapper";
import ConfirmModal from "../common/ConfirmModal";
import { TOAST_POPUP_POSITION, TOAST_POPUP_STATUS } from "../../constants";

const allowedFileTypes = ["png", "jpeg"];

const MAX_FILE_COUNT = 5;
const RESULT_ENUM = {
  SUCCESS: "성공",
  FAIL: "실패",
};

const ReviewForm = ({ headerTitle, setReviews }) => {
  const { isUploadFormVisible, setIsUploadFormVisible } =
    useContext(UploadFormContext);
  const { editingData: currentFormData, setEditingData } =
    useContext(EditingDataContext);
  const { isEditFormVisible, setIsEditFormVisible } =
    useContext(EditFormContext);
  const FORM_STATUS = {
    adding: isUploadFormVisible,
    editing: isEditFormVisible,
  };
  const { user: loggedInUser } = useContext(UserStateContext);

  const [review, setReview] = useState({
    title: currentFormData?.title || "",
    content: currentFormData?.content || "",
    location: currentFormData?.location || "",
    uploadFile: currentFormData?.uploadFile || [],
    // 서버에서 오는 값 안바뀌나 ??
  });

  const { title, content, uploadFile } = review;

  // const [toast, setToast] = useState({
  //   text: "",
  //   position: "",
  //   status: "",
  // });
  const [searchTerm, setSearchTerm] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  const [currentPosition, setCurrentPosition] = useState();
  const [preview, setPreview] = useState(null);

  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

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
    // if (!isFileCountValid) {
    //   return alert("사진 한번에 5개까지 업로드");
    // return setToast({
    //   text: `사진은 한번에 ${MAX_FILE_COUNT}개까지 업로드할 수 있습니다`,
    //   status: TOAST_POPUP_STATUS.alert,
    //   position: TOAST_POPUP_POSITION.middleCenter,
    // });
    // }
    Array.prototype.forEach.apply(files, [
      (file) => {
        const blob = new Blob([file], { type: file.type });
        const url = URL.createObjectURL(blob);
        blobUrls.push(url);
      },
    ]);
    setPreview(blobUrls);
    setReview({ title, content, uploadFile: files });
  };

  const handleSubmit = async (e) => {
    //로그인 안했으면 submit 자체를 막아야 함
    // submit 눌렀을 때 바로 상태 표시해주기 (토스트 팝업)
    console.log(uploadFile);
    e.preventDefault();
    // to do: 백엔드랑 합쳐서 확인 필요
    // 이미지 없을 경우에 빈 배열이 아니라 그냥 데이터 안넣는 걸로 ?
    if (!loggedInUser) throw new Error("로그인 한 유저만 사용할 수 있습니다");

    try {
      if (title.length < 4) {
        return alert("글자수 길게 4 이상");
      }

      if (content.length < 4) {
        return alert("content length 4이상");
      }

      if (content.length > 300) {
        return alert("content length 제한");
      }

      // return setToast({
      //   text: "제목을 4글자 이상 입력해주세요",
      //   status: TOAST_POPUP_STATUS.alert,
      //   position: TOAST_POPUP_POSITION.middleCenter,
      // });

      // return setToast({
      //   text: "내용을 4글자 이상 입력해주세요",
      //   status: TOAST_POPUP_STATUS.alert,
      //   position: TOAST_POPUP_POSITION.middleCenter,
      // });

      // POST reviews
      if (FORM_STATUS.adding) {
        setIsUploading(true);
        console.log(review, "업로드 될 review 형식 <<<<");
        const res = await Api.post("reviews/register", review);
        // 에러 메세지 안가져와지는 거 같은뎅
        if (!res.status === 400) throw new Error("업로드에 실패했습니다");
        setReviews((currentReviews) => [...currentReviews, res.data]);
      }

      // PUT reviews
      if (FORM_STATUS.editing) {
        const { author: authorId } = currentFormData;
        if (loggedInUser._id !== authorId) {
          // return setToast({
          //   text: "다른사람의 게시물을 수정할 수 없습니다",
          //   status: TOAST_POPUP_STATUS.alert,
          //   position: TOAST_POPUP_POSITION.middleCenter,
          // });
          return alert("다른 사람의 게시물 수정할 수 없습니다");
        }
        setIsUploading(true);
        const res = await Api.put(`reviews/${currentFormData._id}`, review);
        if (!res.status === 400) throw new Error("업로드에 실패했습니다");
        setReviews((currentReviews) =>
          currentReviews.map((review) =>
            review._id === currentFormData._id
              ? { ...review, title, content }
              : review
          )
        );
        setIsUploadFormVisible(false);
        setEditingData(null);
        setReview(null);
        setPreview(null);
      }
    } catch (error) {
      console.error(error);
      setResult(RESULT_ENUM.FAIL);
      // to do: 모달창 띄우기
    }
    setIsUploading(false);
    setResult(RESULT_ENUM.SUCCESS);
  };

  useEffect(() => {
    // 모달이 닫힐 때 메모리에 저장된 Blob URL 삭제
    if (!isUploadFormVisible && !isEditFormVisible && preview?.length > 0) {
      return () => {
        preview?.forEach((url) => URL.revokeObjectURL(url));
      };
    }
  }, [preview, isUploadFormVisible, isEditFormVisible]);

  const closeReviewFormModal = () => {
    setIsUploadFormVisible(false);
    setIsEditFormVisible(false);
    setEditingData(null);
    setReview(null);
    // setToast(null);
    setResult(null);
  };
  // 브라우저의 Geolocation API 기능을 사용해서 사용자의 위치 정보를 불러온다
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords?.latitude,
            lng: position.coords?.longitude,
          });
        },
        (error) => {
          if (error.code === 1) {
            // setToast({
            //   text: "사용자가 위치 정보 사용을 거부했습니다",
            //   status: TOAST_POPUP_STATUS.alert,
            //   position: TOAST_POPUP_POSITION.middleCenter,
            // });
          } else if (error.code === 2) {
            // setToast({
            //   text: "브라우저가 위치 정보 사용을 지원하지 않습니다",
            //   status: TOAST_POPUP_STATUS.alert,
            //   position: TOAST_POPUP_POSITION.middleCenter,
            // });
          } else if (error.code === 3) {
            // setToast({
            //   text: "위치 정보를 가져올 수 없습니다",
            //   status: TOAST_POPUP_STATUS.alert,
            //   position: TOAST_POPUP_POSITION.middleCenter,
            // });
          }
        }
      );
    }
  };

  useEffect(() => {
    try {
      if (searchTerm === "") return;
      if (!currentPosition) {
        // return setToast({
        //   text: "사용자 위치를 찾을 수 없습니다",
        //   status: TOAST_POPUP_STATUS.alert,
        //   position: TOAST_POPUP_POSITION.middleCenter,
        // });
      }
      console.log(searchTerm, currentPosition);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  }, [currentPosition, searchTerm]);

  useEffect(() => {
    getCurrentLocation();
  }, []);
  const isLoading = !isUploading && !result;
  const isFetched = !isUploading && result;
  return (
    <>
      {/* 리뷰 입력 모달창: 유저가 리뷰 업로드하기 버튼이나 리뷰 수정 버튼을 누르면 팝업 */}
      <Modal
        centered
        show={isUploadFormVisible || isEditFormVisible}
        onHide={() => {
          // title과 content가 비어있다면 리뷰 작성하는 모달창을 제거한다
          if (title !== "" || content !== "") {
            // 내용이 있다면 다시 한 번 확인하는 모달창에 표시한다
            setShowConfirmModal(true);
          }
          if (title === "" && content === "") {
            return closeReviewFormModal();
          }
        }}
        onClick={(e) => e.stopPropagation()}
        // 이벤트 전파 방지용 >> 없을 시 모달창 클릭할 때도 모달창이 사라지는 현상 방지
        // to do: space bar입력시 모달창 사라짐 버그 (윈도우..? 확인하기)
      >
        {/* validation 통과하지 못했다면 toast pop-up으로 유저에게 알려줌 */}
        {/* {toast && (
          <ToastWrapper
            onClose={() => setToast(null)}
            text={toast}
            position="middle-center"
          />
        )} */}

        {/* 모달창 내부: 입력 받는 공간 */}
        {!isUploading && !result && (
          <ModalBodyWrapper title={headerTitle}>
            {
              <Row className="align-items-center">
                {/* 드래그앤 드롭으로 파일 업로드 받을 수 있는 구역 */}
                <Col
                  xs={7}
                  className="d-flex flex-column align-items-center h-100"
                >
                  <FileUploader
                    handleChange={handleFileChange}
                    name="file"
                    types={allowedFileTypes}
                    multiple={true}
                    maxSize={1} // 최대 2MB 크기까지 허용
                    children={fileUploaderIndicator}
                  />
                  {preview && preview.length > 0 && (
                    <Carousel imageUrls={preview} setPreview={setPreview} />
                  )}
                </Col>
                {/* 리뷰 제목, 내용에 대한 인풋 */}
                <Col xs={5}>
                  <Form onSubmit={handleSubmit} controlId="formFile">
                    <Form.Group>
                      <Form.Label>제목</Form.Label>
                      <Form.Control
                        as="input"
                        size="sm"
                        value={title}
                        onChange={(e) =>
                          setReview({ ...review, title: e.target.value })
                        }
                      />
                    </Form.Group>
                    {/* 사용자 위치, 검색어 기반으로 위치 추가하기 */}
                    {/* to do: cors 문제 해결한 후에 작업 */}
                    {/* <Form.Group>
                    <Form.Control
                      placeholder="위치추가 미구현"
                      as="input"
                      size="sm"
                      value={searchTerm}
                      onChange={(e) => {
                        if (!currentPosition)
                          return setToast({
                          text: "사용자의 위치를 찾을 수 없습니다",
            status: TOAST_POPUP_STATUS.alert,
            position: TOAST_POPUP_POSITION.middleCenter,
                            
                          }
                          );
                        setSearchTerm(e.target.value);
                      }}
                      className="my-2"
                    />
                  </Form.Group> */}

                    <Form.Group>
                      <Form.Label>내용</Form.Label>
                      <Form.Control
                        rows={6}
                        as="textarea"
                        value={content}
                        onChange={(e) =>
                          setReview({ ...review, content: e.target.value })
                        }
                      />
                    </Form.Group>
                    <small
                      className={content.length < 300 ? "text-muted" : "delete"}
                    >
                      {content ? content.length : "0"}/300
                    </small>
                  </Form>
                </Col>
              </Row>
            }
          </ModalBodyWrapper>
        )}
        {/* 리뷰 내용 입력 모달창 내부 */}
        {/* submit 후 업로드 중 -> 1. loading indicator */}
        {isUploading && (
          <ModalBodyWrapper
            title="게시물을 업로드하는 중입니다"
            content={<SpinnerWrapper />}
          />
        )}
        {/* submit 후 결과 -> 2. success or fail */}
        {/* to do: 버그수정. 공유되었습니다 모달창 뜬 후에 x 버튼이 아니라 바깥 창을 클릭하면 '게시글을 삭제하시겠어요?' 팝업이 뜸 */}
        {isFetched && (
          <ModalBodyWrapper
            title={
              RESULT_ENUM.SUCCESS
                ? "게시물이 공유되었습니다"
                : "게시물을 업로드하지 못했습니다"
            }
            onHide={() => closeReviewFormModal()}
            content={
              <FontAwesomeIcon
                icon={RESULT_ENUM.SUCCESS ? faCircleCheck : faBomb}
                className="indicator-success"
              />
            }
          />
        )}
        {/* 리뷰 내용 입력 모달창 내부 footer */}
        {!isUploading && !result && (
          <Modal.Footer className="d-flex justify-content-end">
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              {currentFormData ? "수정" : "공유"}
            </Button>
          </Modal.Footer>
        )}
        {/* 입력 도중에 화면 이탈할 경우 confirm 모달창 띄운다 */}
        {(content !== "" || title !== "") && (
          <ConfirmModal
            show={showConfirmModal}
            setShowConfirmModal={setShowConfirmModal}
            closeReviewFormModal={closeReviewFormModal}
          />
        )}
      </Modal>
    </>
  );
};

export default ReviewForm;
