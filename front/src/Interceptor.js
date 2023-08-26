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
      const token = sessionStorage.getItem("userToken");
      // token이 있는지 확인 한 후에보내줘야함!! 없는 토큰을 넣어버리면 로그인 안됨 주의
      // app.js에 로그인 부분이 있는 건 아는데, 테스트용!!
      if (token) {
        config.headers = {
          Authorization: `Bearer ${token}`,
        };
      }
      // 요청에 isHandlerEnabled이 있다면 (App.js에서 넣어주고있음)
      // if (config.isHandlerEnabled) {
      //   // 모달 창 옵션을 설정한다
      //   console.log(config);
      //   modalOptions({
      //     state: true,
      //     description: `Request done successfully: ${config.url}`,
      //     title: "SUCCESS",
      //   });
      // }
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
        const errorMessage = error.response.data;
        const status = error.response.status;
        console.log(error.response.status);
        console.log(error.response.data);
        // ???: 아직 백엔드 에러처리 작업이 끝나지 않아서 어떤 에러 형태이냐에따라서 에러 메세지가 찍히고 안찍히는 경우가 있는 것 같음

        // 될 떄가 있고 안될 때가 있는데 백엔드 코드 아직 통일 안되서 그런 건가...?
        if (errorMessage === "토큰 만료" || status === 401) {
          // post reviews에서는 /login까지 수행 Ok
          console.log("토큰만료");
          console.log(error.response);
          sessionStorage.removeItem("userToken");
          dispatch({ type: "LOGOUT" });
          navigate("/login");
          // 모달창 띄워서 알려주기:: ex) 토큰이 만료되어 로그아웃되었습니다 팝업
        }
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
