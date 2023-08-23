import { Form } from "react-bootstrap";

const ReviewTextForm = ({ title, content, review, setReview, onSubmit }) => {
  // const [searchTerm, setSearchTerm] = useState("");
  // const [searchResults, setSearchResults] = useState([]);
  // const [currentPosition, setCurrentPosition] = useState();

  // 브라우저의 Geolocation API 기능을 사용해서 사용자의 위치 정보를 불러온다
  // const getCurrentLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setCurrentPosition({
  //           lat: position.coords?.latitude,
  //           lng: position.coords?.longitude,
  //         });
  //       },
  //       (error) => {
  //         if (error.code === 1) {
  //           // setToast({
  //           //   text: "사용자가 위치 정보 사용을 거부했습니다",
  //           //   status: TOAST_POPUP_STATUS.alert,
  //           //   position: TOAST_POPUP_POSITION.middleCenter,
  //           // });
  //         } else if (error.code === 2) {
  //           // setToast({
  //           //   text: "브라우저가 위치 정보 사용을 지원하지 않습니다",
  //           //   status: TOAST_POPUP_STATUS.alert,
  //           //   position: TOAST_POPUP_POSITION.middleCenter,
  //           // });
  //         } else if (error.code === 3) {
  //           // setToast({
  //           //   text: "위치 정보를 가져올 수 없습니다",
  //           //   status: TOAST_POPUP_STATUS.alert,
  //           //   position: TOAST_POPUP_POSITION.middleCenter,
  //           // });
  //         }
  //       }
  //     );
  //   }
  // };

  // useEffect(() => {
  //   try {
  //     if (searchTerm === "") return;
  //     if (!currentPosition) {
  //       // return setToast({
  //       //   text: "사용자 위치를 찾을 수 없습니다",
  //       //   status: TOAST_POPUP_STATUS.alert,
  //       //   position: TOAST_POPUP_POSITION.middleCenter,
  //       // });
  //     }
  //     console.log(searchTerm, currentPosition);
  //   } catch (error) {
  //     console.error("Error fetching places:", error);
  //   }
  // }, [currentPosition, searchTerm]);

  // useEffect(() => {
  //   getCurrentLocation();
  // }, []);

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Label>제목</Form.Label>
        <Form.Control
          as="input"
          size="sm"
          value={title}
          onChange={(e) => setReview({ ...review, title: e.target.value })}
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
          onChange={(e) => setReview({ ...review, content: e.target.value })}
        />
      </Form.Group>
      <small
        className={
          content.length < 300
            ? "text-muted flex-justify-end"
            : "delete flex-justify-end"
        }
      >
        {content ? content.length : "0"}/300
      </small>
    </Form>
  );
};

export default ReviewTextForm;
