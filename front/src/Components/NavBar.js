import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const handleNavigate = (path) => navigate(path);
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container className="d-flex justify-content-between">
          <Navbar.Brand
            onClick={() => handleNavigate("/")}
            style={{ cursor: "pointer" }}
          >
            로고
          </Navbar.Brand>
          <Nav className="align-items-center">
            <Nav.Link onClick={() => handleNavigate("/search")}>
              검색??
            </Nav.Link>
            {/* TO DO: 로그인 했다면 '로그아웃'으로 변경 */}
            <Nav.Link onClick={() => handleNavigate("/login")}>로그인</Nav.Link>
            {/* TO DO: 로그인 했다면 보여주기 & 로그인한 유저의 아이디로 변경 */}
            <Nav.Link onClick={() => handleNavigate("users/:id")}>
              <img
                className="rounded-circle"
                src="https://blog.getbootstrap.com/assets/brand/bootstrap-logo-shadow@2x.png"
                width="50"
                alt="test"
              />
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
