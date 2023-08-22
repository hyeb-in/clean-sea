import axios from "axios";
import { useContext, useEffect } from "react";
import { ModalOptionContext, UserStateContext } from "./App";

const Interceptor = ({ children }) => {
  const { user } = useContext(UserStateContext);
  const { modalOptions, setModalOptions } = useContext(ModalOptionContext);

  useEffect(() => {
    // 모든 응답에 대한 인터셉터 설정  request interceptors
    const axiosInterceptor = axios.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      // 요청 성공시 보여줄 modal
      if (config.isHandlerEnabled) {
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
        return Promise.reject(error);
      }
    );
    // Clean up interceptors when the component unmounts
    return () => {
      axios.interceptors.request.eject(axiosInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [user, modalOptions, setModalOptions]);
  return children;
};

export { Interceptor };
