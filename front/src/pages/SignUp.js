import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

const SignUp = ({ handleSignup }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  //이메일이 abc@example.com 형태인지 regex를 이용해 확인함.
  const validateEmail = (email) => {
    return email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  //위 validateEmail 함수를 통해 이메일 형태 적합 여부를 확인함.
  const isEmailValid = validateEmail(email);
  // 비밀번호가 4글자 이상인지 여부를 확인함.
  const isPasswordValid = password.length >= 4;
  // 비밀번호와 확인용 비밀번호가 일치하는지 여부를 확인함.
  const isPasswordSame = password === confirmPassword;
  // 이름이 2글자 이상인지 여부를 확인함.
  const isNameValid = name.length >= 2;

  // 위 4개 조건이 모두 동시에 만족되는지 여부를 확인함.
  const isFormValid =
    isEmailValid && isPasswordValid && isPasswordSame && isNameValid;

  const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // 여기에서 실제 회원가입 로직을 구현하고 서버와 통신하면 됩니다.
    handleSignup(email);
  };

  // const History = useHistory();
  // react-router-dom v6에서는 메서드의 변경으로 useHistory가 아닌 useNavigate를 사용
  // const navigate = useNavigate();

  // const goToAnotherPage = () => {
  //   // 다른 페이지로 이동
  //   navigate('/login');
  // };

  // id 조건 : 영어+숫자, 4글자 이상
  // pw 조건 : 4글자 이상



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
    width: "350px",
    // height: "400px",
    // marginTop: "100px", 
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
      <h2 style={{ textAlign: "center" }}>회원가입</h2>
      <form onSubmit={handleSubmit} style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        width: "100%",
        gap: "16px"
      }}>
         <div className="form-group">
          <label style={{ fontSize: "18px" }}>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="이름을 입력하세요."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {!isNameValid && (
              <div className="text-danger">
                이름은 2글자 이상으로 설정해 주세요.
              </div>
            )}
        </div>
        <div className="form-group">
          <label style={{ fontSize: "18px" }}>Email</label>
          <input
            type="text"
            className="form-control"
            placeholder="생성할 이메일을 입력하세요."
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
              <div className="text-danger">
                비밀번호는 4글자 이상으로 설정해 주세요.
              </div>
            )}
        </div>
        <div className="form-group">
          <label style={{ fontSize: "18px" }}>Confirm Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="비밀번호 확인."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {!isPasswordValid && (
              <div className="text-danger">
                비밀번호가 일치한지 확인해 주세요.
              </div>
            )}
        </div>
        <button type="submit" className="btn btn-primary" disabled={!isFormValid}>회원가입</button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default SignUp;