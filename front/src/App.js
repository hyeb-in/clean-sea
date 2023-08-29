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
import Footer from "./components/common/layout/Footer";
import NavBar from "./components/common/layout/NavBar";
import ReviewsList from "./components/review/ReviewsList";
import { loginReducer } from "./Reducer";
import "./Main.css";
import Graph from "./pages/Graph";
import MyProfile from "./pages/MyProfile";
import { Interceptor } from "./Interceptor";
import AddReview from "./components/review/AddReview";
import PageNotFound from "./pages/PageNotFound";
import ResponseIndicator from "./components/common/indicators/ResponseIndicator";
import axios from "axios";
import * as Api from "./Api";
import { MODAL_TYPE } from "./hooks/useModal";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);
export const HandlerEnabledContext = createContext(null);
export const ModalOptionContext = createContext(null);
export const ModalVisibleContext = createContext(null);

function App() {
  const [isHandlerEnabled, setIsHandlerEnabled] = useState(true);
  const [modalOptions, setModalOptions] = useState({
    state: false,
    description: null,
    title: null,
  });
  const [modalVisible, setModalVisible] = useState({
    type: null,
    isVisible: false,
    data: null,
  });

  // 모든 요청에 isHandlerEnabled(상태 관리)를 함께 보낸다
  axios.interceptors.request.use((config) => {
    // if (config.isHandlerEnabled) {
    //   console.log("from App.js REQ.use isHandlerEnabled", isHandlerEnabled);
    // }
    return config;
  });

  axios.interceptors.response.use(
    (response) => {
      // if (response.config.isHandlerEnabled) {
      //   console.log(
      //     `from App.js RES.use isHandlerEnabled, ${isHandlerEnabled}`
      //   );
      //   setModalOptions({
      //     state: true,
      //     description: `from App.js RES.use isHandlerEnabled, ${isHandlerEnabled}`,
      //     title: "Request succeeded!",
      //   });
      // }
      return response;
    },
    (error) => {
      // 서버 에러 -> 인터셉터 -> 유저에게 노출
      // to do: 에러 핸들링 세분화 작업
      // if (!error) return;
      if (error.config.isHandlerEnabled) {
        console.log("from app.js, ", isHandlerEnabled);
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
  const [review, setReview] = useState({ title: "", content: "" });
  const [reviews, setReviews] = useState([]);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const [userInputValues, setUserInputValues] = useState({
    title: "",
    content: "",
  });

  const location = useLocation();
  // 아래의 fetchCurrentUser 함수가 실행된 다음에 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면 isFetchCompleted 가 true여야 컴포넌트가 구현됨.

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
      const res = await Api.get("users/current");
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
    // to do: 구조.................?
    <UserStateContext.Provider value={userState}>
      <HandlerEnabledContext.Provider
        value={{ isHandlerEnabled, setIsHandlerEnabled }}
      >
        <ModalVisibleContext.Provider value={{ modalVisible, setModalVisible }}>
          <ModalOptionContext.Provider
            value={{ modalOptions, setModalOptions }}
          >
            <DispatchContext.Provider value={dispatch}>
              <Interceptor>
                {!is404Page && <NavBar />}
                {/* upload는 모든 페이지에서 할 수 있기때문에 여기 있어야 함!! 옮기지 말 것 */}
                {modalVisible?.isVisible &&
                  modalVisible?.type === MODAL_TYPE.addReview && (
                    <AddReview
                      headerTitle="새 게시물 작성하기"
                      reviews={reviews}
                      setReviews={setReviews}
                      userInputValues={userInputValues}
                      setUserInputValues={setUserInputValues}
                    />
                  )}

                <Routes>
                  <Route path="/" exact element={<Main />} />
                  <Route path="/login" exact element={<Login />} />
                  <Route path="/signup" exact element={<SignUp />} />
                  <Route path="/users/:id" exact element={<MyProfile />} />
                  <Route path="/search" exact element={<Search />} />
                  <Route
                    path="/reviews"
                    exact
                    element={
                      <ReviewsList
                        // review={review}
                        // setReview={setReview}
                        reviews={reviews}
                        setReviews={setReviews}
                      />
                    }
                  />
                  <Route path="/graph" exact element={<Graph />} />
                  {/* 404 페이지 */}

                  <Route path="*" element={<PageNotFound />} />
                </Routes>
                <ResponseIndicator
                  modalOptions={modalOptions}
                  setModalOptions={setModalOptions}
                />
                {!is404Page && <Footer />}
              </Interceptor>
            </DispatchContext.Provider>
          </ModalOptionContext.Provider>
        </ModalVisibleContext.Provider>
      </HandlerEnabledContext.Provider>
    </UserStateContext.Provider>
  );
}

const AppWithRoute = () => (
  <Router>
    <App />
  </Router>
);
export default AppWithRoute;
