import axios from "axios";
import { useContext, useEffect } from "react";
import { UserStateContext } from "./App";

const Interceptor = ({ children }) => {
  const { user } = useContext(UserStateContext);

  useEffect(() => {
    const axiosInterceptor = axios.interceptors.request.use((config) => {
      //   // 요청을 가로채서 헤더의 정보를 붙이고 토큰 설정을 해서 내보낸다
      //   // -----------요청 -----------------------------
      //   if (config.Authorization !== false) {
      //     // 토큰이 필요한 요청에만 토큰을 보내준다
      //     const token = sessionStorage.getItem("userToken");
      //     if (token) {
      //       config.headers["Authorization"] = "Bearer " + token;
      //     } else {
      //       console.log("🎫 토큰 없음");
      //     }
      //   }
      //   config.headers["Content-Type"] = "application/json";
      config.headers["Access-Control-Allow-Origin"] = "*";

      return config;
    });

    // --------------- 응답 -----------------------------
    const responseInterceptor = axios.interceptors.response.use(
      (response) => {
        console.log("✅ 응답: ", response);
        if (user) {
          // 모든 응답의 data에 로그인 유저 정보를 포함시킨다
          response.data.loggedInUser = user;
        }
        if (response.status >= 200 && response.status < 400) {
          response.data.ok = true;
          response.data.error = null;
        }
        if (response.status >= 400) {
          response.data.ok = false;
          console.log(response.data.error);
        }
        return response;
      },
      (error) => {
        console.error(`❌ 오류: ${JSON.stringify(error?.response?.data)}`);
        if (error?.response?.status >= 400) {
          if (error?.data?.error) {
            console.error("Error:", error.data.error);
          }
        }
        return Promise.reject(error);
      }
    );
    // Clean up interceptors when the component unmounts
    return () => {
      axios.interceptors.request.eject(axiosInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [user]);
  return children;
};

export { Interceptor };
