import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ handleLogin, useHistory }) => {
  const [Id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    // e.preventDefault();

    handleLogin(Id);
  }
    // const history = useHistory();
  
    // const goToAnotherPage = () => {
    //   // 다른 페이지로 이동
    //   history.push('/another-page');
    // }
    const navigate = useNavigate();

  const goToAnotherPage = () => {
    // 다른 페이지로 이동
    navigate('/SignUp');
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
    height: "300px",
    marginTop: "100px", 
    boxShadow: "0px 4px 12px #00000026" 
  }}>
  <div className="container">
    <h2 style={{ margin: "50px" }}>로그인</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label style={{ fontSize: "18px" }}>ID</label>
        <input
          type="text"
          className="form-control"
          placeholder="아이디를 입력하세요."
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
      <button type="submit" className="btn btn-primary">로그인</button>
      <button type="button" className="btn btn-link" onClick={()=> goToAnotherPage()}>회원가입</button>
    </form>
  </div>
  </div>
  </div>
);

};



export default Login;