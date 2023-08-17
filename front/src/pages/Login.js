import React, {useState, useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

import * as Api from "../Api";
import { DispatchContext } from "../App";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);

  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        // 이메일 주소의 유효성 검사하는 정규 표현식
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  // 이메일과 비밀번호 조건이 동시에 만족되는지 확인함.
  const isFormValid = isEmailValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Api.post("auth/login", {
        email,
        password
      });
      const user = res.data;
      const jwtToken = user.token;
      sessionStorage.setItem("userToken", jwtToken);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });
      navigate("/", { replace: true });
    } catch (err) {
      console.log("로그인에 실패하셨습니다.\n", err);
    }
  };

return (
  <div
     style={{
      paddingTop: "134px",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
     }}
  >
  <div style={{ 
    width: "300px",
    boxShadow: "0px 4px 12px #00000026" 
  }}>
  <div className="container" style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    gap: "16px",
    padding: "16px"
  }}>
    <h2 style={{ textAlign: "center" }}>로그인</h2>
    <form onSubmit={handleSubmit} style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      gap: "16px"
    }}>
      <div className="form-group">
        <label style={{ fontSize: "18px" }}>Email</label>
        <input
          type="text"
          className="form-control"
          placeholder="이메일을 입력하세요."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!isEmailValid && (
              <div className="text-danger">
                이메일 형식이 올바르지 않습니다.
              </div>
            )}
      </div>
      <div className="form-group">
        <label style={{ fontSize: "18px" }}>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="비밀번호를 입력하세요."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {!isPasswordValid && (
              <div className="text-danger" style={{ color: "#FF6347" }}>
                비밀번호는 4글자 이상입니다.
              </div>
            )}

      </div>
      <button type="submit" className="btn btn-primary" disabled={!isFormValid}>로그인</button>
      <button type="button" className="btn btn-link" onClick={()=> navigate("/SignUp")}>회원가입</button>
    </form>
  </div>
  </div>
  </div>
  );
};

export default Login;