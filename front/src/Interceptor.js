import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect } from "react";
import { DispatchContext, ModalOptionContext, UserStateContext } from "./App";

const Interceptor = ({ children }) => {
  const dispatch = useContext(DispatchContext);
  const { user } = useContext(UserStateContext);
  const { modalOptions, setModalOptions } = useContext(ModalOptionContext);

  const navigate = useNavigate();

  useEffect(() => {
    // 모든 요청을 가로채서 do something
    const axiosInterceptor = axios.interceptors.request.use((config) => {
      // 요청에 isHandlerEnabled이 있다면 (App.js에서 넣어주고있음)
      if (config.isHandlerEnabled) {
        // 모달 창 옵션을 설정한다
        console.log(config);
        modalOptions({
          state: true,
          description: `Request done successfully: ${config.url}`,
          title: "SUCCESS",
        });
      }
      return config;
    });

    // to do: token 만료되면 튕길 것(레이아웃에 반영하기)
    // --------------- 응답 -----------------------------
    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        console.log("✅ 응답: ", response);
        // 403 : 인증 에러 권한 없음
        // 400 : 클라이언트가 잘못된 값 전달
        // 500 : 서버 에러
        return response;
      },
      (error) => {
        const errorMessage = error.response.data.error;
        const status = error.response.status;

        console.log(errorMessage, status);
        if (errorMessage === "토큰 만료" || status === 401) {
          console.log(error.response);
          sessionStorage.removeItem("userToken");
          dispatch({ type: "LOGOUT" });
          navigate("/login");
          // 모달창 띄워서 알려주기
          return;
        }
        // status 401인데 로그아웃 안됨
        return Promise.reject(error);
      }
    );
    // Clean up interceptors when the component unmounts
    return () => {
      axios.interceptors.request.eject(axiosInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [user, modalOptions, setModalOptions, dispatch, navigate]);
  return children;
};

export { Interceptor };
