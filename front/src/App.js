import React, { useReducer, useEffect, useState, createContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Search from "./pages/Search";
import Footer from "./components/common/Footer";
import NavBar from "./components/common/NavBar";
import Reviews from "./pages/Reviews";
import * as Api from "./Api";
import { loginReducer } from "./Reducer";
import "./Main.css";
import Graph from "./pages/Graph";
import MyProfile from "./pages/MyProfile";
import { Interceptor } from "./Interceptor";
import ReviewForm from "./components/review/ReviewForm";
import PageNotFound from "./pages/PageNotFound";
import ToastWrapper from "./components/common/ToastWrapper";
import ResponseIndicator from "./components/common/ResponseIndicator";
import axios from "axios";
import { TOAST_POPUP_POSITION, TOAST_POPUP_STATUS } from "./constants";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);
export const UploadFormContext = createContext(false);
export const EditFormContext = createContext(false);
export const EditingDataContext = createContext(null);
export const IsReviewModalVisibleContext = createContext(null);
export const HandlerEnabledContext = createContext(null);
export const ModalOptionContext = createContext(null);

function App() {
  const [toast, setToast] = useState(null);
  const [isHandlerEnabled, setIsHandlerEnabled] = useState(true);
  const [modalOptions, setModalOptions] = useState({
    state: false,
    description: null,
    title: null,
  });
  // 모든 요청에 isHandlerEnabled를 함께
  axios.interceptors.request.use((config) => {
    if (config.isHandlerEnabled) {
      setToast({
        text: "Sending Request",
        position: TOAST_POPUP_POSITION.bottomEnd,
        status: TOAST_POPUP_STATUS.success,
      });
    }
    return config;
  });

  axios.interceptors.response.use(
    (response) => {
      if (response.config.isHandlerEnabled) {
        setModalOptions({
          state: true,
          description: `Request done successfully: ${response.config.url}`,
          title: "Request succeeded!",
        });
      }
      return response;
    },
    (error) => {
      // 서버 에러 -> 인터셉터 -> 유저에게 노출
      // to do: 에러 핸들링 세분화 작업
      if (!error) return;
      if (error.config.isHandlerEnabled) {
        setModalOptions({
          state: true,
          description: `Unfortunately error happened during request: ${error.config.url}`,
          title: `Request failed: ${error.response.status}`,
        });
      }
      return Promise.reject({ ...error });
    }
  );

  // useReducer 훅을 통해 userState 상태와 dispatch함수를 생성함.
  const [userState, dispatch] = useReducer(loginReducer, {
    user: null,
  });

  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const [isUploadFormVisible, setIsUploadFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [editingData, setEditingData] = useState(null);
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);

  const location = useLocation();
  // 아래의 fetchCurrentUser 함수가 실행된 다음에 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면 isFetchCompleted 가 true여야 컴포넌트가 구현됨.
  const [reviews, setReviews] = useState(null);
  const path = location.pathname.split("/")[1];
  const is404Page =
    path !== "" &&
    path !== "users" &&
    path !== "search" &&
    path !== "graph" &&
    path !== "reviews";

  const fetchCurrentUser = async () => {
    try {
      // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
      const res = await axios.get("/users/current");
      const currentUser = res.data;
      // dispatch 함수를 통해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: currentUser,
      });
      console.log("%c sessionStorage에 토큰 있음.", "color: #d93d1a;");
    } catch {
      console.log("%c SessionStorage에 토큰 없음.", "color: #d93d1a;");
    }
    // fetchCurrentUser 과정이 끝났으므로, isFetchCompleted 상태를 true로 바꿔줌
    setIsFetchCompleted(true);
  };

  // useEffect함수를 통해 fetchCurrentUser 함수를 실행함.
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (!isFetchCompleted) {
    return "loading...";
  }

  return (
    <HandlerEnabledContext.Provider
      value={{ isHandlerEnabled, setIsHandlerEnabled }}
    >
      <ModalOptionContext.Provider value={{ modalOptions, setModalOptions }}>
        <UploadFormContext.Provider
          value={{ isUploadFormVisible, setIsUploadFormVisible }}
        >
          <EditFormContext.Provider
            value={{ isEditFormVisible, setIsEditFormVisible }}
          >
            <EditingDataContext.Provider
              value={{ editingData, setEditingData }}
            >
              <DispatchContext.Provider value={dispatch}>
                <UserStateContext.Provider value={userState}>
                  <IsReviewModalVisibleContext.Provider
                    value={{ isReviewModalVisible, setIsReviewModalVisible }}
                  >
                    <Interceptor>
                      {!is404Page && <NavBar />}
                      {(isUploadFormVisible || isEditFormVisible) && (
                        <ReviewForm
                          headerTitle={
                            isUploadFormVisible
                              ? "새 게시물 작성하기"
                              : "게시물 수정하기"
                          }
                          reviews={reviews}
                          setReviews={setReviews}
                        />
                      )}
                      <Routes>
                        <Route path="/" exact element={<Main />} />
                        <Route path="/login" exact element={<Login />} />
                        <Route path="/signup" exact element={<SignUp />} />
                        <Route
                          path="/users/:id"
                          exact
                          element={<MyProfile />}
                        />
                        <Route path="/search" exact element={<Search />} />
                        <Route
                          path="/reviews"
                          exact
                          element={
                            <Reviews
                              reviews={reviews}
                              setReviews={setReviews}
                            />
                          }
                        />
                        <Route path="/graph" exact element={<Graph />} />
                        {/* 404 페이지 */}
                        <Route path="*" element={<PageNotFound />} />
                      </Routes>
                      {toast && (
                        <ToastWrapper
                          toast={toast}
                          onClose={() => setToast(null)}
                        />
                      )}
                      {/* 서버에서 에러나 상태 관련 메세지를 받아서 유저에게
                    모달창으로 알려준다 */}
                      <ResponseIndicator
                        modalOptions={modalOptions}
                        setModalOptions={setModalOptions}
                      />
                      {!is404Page && <Footer />}
                    </Interceptor>
                  </IsReviewModalVisibleContext.Provider>
                </UserStateContext.Provider>
              </DispatchContext.Provider>
            </EditingDataContext.Provider>
          </EditFormContext.Provider>
        </UploadFormContext.Provider>
      </ModalOptionContext.Provider>
    </HandlerEnabledContext.Provider>
  );
}

const AppWithRoute = () => (
  <Router>
    <App />
  </Router>
);
export default AppWithRoute;
