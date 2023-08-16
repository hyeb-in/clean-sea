import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SignUp = ({ handleSignup }) => {
  const [Id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // 여기에서 실제 회원가입 로직을 구현하고 서버와 통신하면 됩니다.
    // handleSignup(Id);
  };

  // const History = useHistory();
  // react-router-dom v6에서는 메서드의 변경으로 useHistory가 아닌 useNavigate를 사용
  const navigate = useNavigate();

  const goToAnotherPage = () => {
    // 다른 페이지로 이동
    navigate('/login');
  };

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
    width: "300px",
    height: "300px",
    marginTop: "100px", 
    boxShadow: "0px 4px 12px #00000026" 
    }}>
    <div className="container">
      <h2 style={{ textAlign: "center" }}>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label style={{ fontSize: "18px" }}>ID</label>
          <input
            type="text"
            className="form-control"
            placeholder="생성할 아이디를 입력하세요."
            value={Id}
            onChange={(e) => setId(e.target.value)}
          />
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
        </div>
        <button type="submit" className="btn btn-primary" onClick={()=> goToAnotherPage()}>회원가입</button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default SignUp;