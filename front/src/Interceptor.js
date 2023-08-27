import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { DispatchContext, ModalOptionContext, UserStateContext } from "./App";

const Interceptor = ({ children }) => {
  const dispatch = useContext(DispatchContext);
  const { user } = useContext(UserStateContext);
  const { modalOptions, setModalOptions } = useContext(ModalOptionContext);
  const [isGetRequest, setIsGetRequest] = useState(false);
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
      // 여기에 명시 없을 시, 업로드 할 때 formData형식으로 보낸 후 계속 formData 형식으로 남아있는 듯(??)
      if (config.url.includes("/reviews/register")) {
        // Form Data 형식으로 데이터 보내기
        config.headers["Content-Type"] = "multipart/form-data";
      } else {
        // 다른 요청에는 JSON 형식으로 데이터 보내기
        config.headers["Content-Type"] = "application/json";
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
        if (response.data) {
          response.ok = true;
        }

        const requestMethod = response.config.method;
        if (requestMethod === "get") {
          // GET 요청 처리를 위한 스테이트
          setIsGetRequest(true);
        }
        // 403 : 인증 에러 권한 없음
        // 400 : 클라이언트가 잘못된 값 전달
        // 500 : 서버 에러
        return response;
      },
      (error) => {
        const errorMessage = error.response.data;
        const status = error.response.status;
        console.log(error.response.status, "from interceptor");
        console.log(error.response.data, "from interceptor");
        // ???: 아직 백엔드 에러처리 작업이 끝나지 않아서 어떤 에러 형태이냐에따라서 에러 메세지가 찍히고 안찍히는 경우가 있는 것 같음

        const isTokenExpired = errorMessage === "토큰 만료" || status === 401;

        if (!isGetRequest && isTokenExpired) {
          // 될 떄가 있고 안될 때가 있는데 백엔드 코드 아직 통일 안되서 그런 건가...?
          // post reviews에서는 /login까지 수행 Ok
          console.log(error.response);
          sessionStorage.removeItem("userToken");
          dispatch({ type: "LOGOUT" });
          navigate("/login");
          // 로그인 필요한 요청에 대해서만 로그아웃으로 튕기게해주면 됨
          // post, put, del 요청만 막기
          // 모달창 띄워서 알려주기:: ex) 토큰이 만료되어 로그아웃되었습니다 팝업
          alert("토큰이 만료되었습니다. post, put, del 하려면 다시 로그인.");
        }
        return Promise.reject(error);
      }
    );
    // Clean up interceptors when the component unmounts
    return () => {
      axios.interceptors.request.eject(axiosInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [user, modalOptions, setModalOptions, dispatch, navigate, isGetRequest]);
  return children;
};

export { Interceptor };
