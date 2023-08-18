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
import MyProfile from "./pages/MyProfile";
import Search from "./pages/Search";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Network from "./pages/Network";
import * as Api from "./Api";
import { loginReducer } from "./Reducer";
import "./Main.css";
import Graph from "./pages/Graph";

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);
const targetPath = ["/login", "/signup"];

function App() {
  // useReducer 훅을 통해 userState 상태와 dispatch함수를 생성함.
  const [userState, dispatch] = useReducer(loginReducer, {
    user: null,
  });
  const location = useLocation();
  console.log(userState.user, "<<<<<<<");
  // 아래의 fetchCurrentUser 함수가 실행된 다음에 컴포넌트가 구현되도록 함.
  // 아래 코드를 보면 isFetchCompleted 가 true여야 컴포넌트가 구현됨.
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const fetchCurrentUser = async () => {
    try {
      // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
      const res = await Api.get("users/current");
      const currentUser = res.data;
      console.log(currentUser);
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
    console.log("fetch");
  }, []);

  if (!isFetchCompleted) {
    return "loading...";
  }

  return (
    <DispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={userState}>
        {!targetPath?.includes(location.pathname) && (
          <>
            <NavBar />
          </>
        )}
        <Routes>
          <Route path="/" exact element={<Main />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<SignUp />} />
          <Route path="/users/:id" exact element={<MyProfile />} />
          <Route path="/search" exact element={<Search />} />
          <Route path="/network" exact element={<Network />} />
          <Route path="/graph" exact element={<Graph />} />
        </Routes>
        {!targetPath?.includes(location.pathname) && (
          <>
            <Footer />
          </>
        )}
      </UserStateContext.Provider>
    </DispatchContext.Provider>
  );
}

const AppWithRoute = () => (
  <Router>
    <App />
  </Router>
);
export default AppWithRoute;
