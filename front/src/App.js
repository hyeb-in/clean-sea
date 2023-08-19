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

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);
export const UploadFormContext = createContext(false);
export const EditFormContext = createContext(false);
export const EditingDataContext = createContext(null);

const targetPath = ["/login", "/signup"];

function App() {
  // useReducer 훅을 통해 userState 상태와 dispatch함수를 생성함.
  const [userState, dispatch] = useReducer(loginReducer, {
    user: null,
  });
  // isUploadFormVisible, setIsUploadFormVisible
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);
  const [isUploadFormVisible, setIsUploadFormVisible] = useState(false);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [editingData, setEditingData] = useState(null);

  const location = useLocation();
  // 아래의 fetchCurrentUser 함수가 실행된 다음에 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면 isFetchCompleted 가 true여야 컴포넌트가 구현됨.
  const [reviews, setReviews] = useState(null);
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
    <UploadFormContext.Provider
      value={{ isUploadFormVisible, setIsUploadFormVisible }}
    >
      <EditFormContext.Provider
        value={{ isEditFormVisible, setIsEditFormVisible }}
      >
        <EditingDataContext.Provider value={{ editingData, setEditingData }}>
          <DispatchContext.Provider value={dispatch}>
            <UserStateContext.Provider value={userState}>
              <Interceptor>
                {!targetPath?.includes(location.pathname) && (
                  <>
                    <NavBar />
                  </>
                )}
                {(isUploadFormVisible || isEditFormVisible) && (
                  <ReviewForm
                    headerTitle={
                      isUploadFormVisible
                        ? "새 게시물 작성하기"
                        : "게시물 수정하기"
                    }
                    // reviews={reviews}
                    setReviews={setReviews}
                  />
                )}
                <Routes>
                  {/* to do: 404 페이지 만들기 */}
                  <Route path="/" exact element={<Main />} />
                  <Route path="/login" exact element={<Login />} />
                  <Route path="/signup" exact element={<SignUp />} />
                  <Route path="/users/:id" exact element={<MyProfile />} />
                  <Route path="/search" exact element={<Search />} />
                  <Route
                    path="/reviews"
                    exact
                    element={
                      <Reviews reviews={reviews} setReviews={setReviews} />
                    }
                  />
                  <Route path="/graph" exact element={<Graph />} />
                </Routes>
                {!targetPath?.includes(location.pathname) && (
                  <>
                    <Footer />
                  </>
                )}
              </Interceptor>
            </UserStateContext.Provider>
          </DispatchContext.Provider>
        </EditingDataContext.Provider>
      </EditFormContext.Provider>
    </UploadFormContext.Provider>
  );
}

const AppWithRoute = () => (
  <Router>
    <App />
  </Router>
);
export default AppWithRoute;
