import React, { forwardRef, useContext } from "react";
import {
  UserStateContext,
  DispatchContext,
  UploadFormContext,
} from "../../App";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faMagnifyingGlass,
  faCompass,
} from "@fortawesome/free-solid-svg-icons";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Avatar from "./Avatar";

const NavBar = () => {
  const navigate = useNavigate();
  const { user: loggedInUser } = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);
  const { setIsUploadFormVisible } = useContext(UploadFormContext);
  const isLogin = !!loggedInUser;

  const logout = () => {
    sessionStorage.removeItem("userToken");
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const login = () => {
    navigate("/login");
  };

  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container className="d-flex justify-content-between">
          <Navbar.Brand
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            해조
          </Navbar.Brand>
          <Nav className="align-items-center">
            <Nav.Link onClick={() => navigate("/search")}>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="search">검색</Tooltip>}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </OverlayTrigger>
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/reviews")}>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="browse">둘러보기</Tooltip>}
              >
                <FontAwesomeIcon icon={faCompass} />
              </OverlayTrigger>
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/graph")}>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="graph">그래프</Tooltip>}
              >
                <FontAwesomeIcon icon={faChartLine} />
              </OverlayTrigger>
            </Nav.Link>
            {/* 로그인 한 유저에게만 보이기 */}

            {isLogin ? (
              <>
                <Nav.Link onClick={() => setIsUploadFormVisible(true)}>
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="upload">업로드</Tooltip>}
                  >
                    <FontAwesomeIcon icon={faSquarePlus} />
                  </OverlayTrigger>
                </Nav.Link>
                <Nav.Item>
                  <Nav.Link onClick={logout}>로그아웃</Nav.Link>
                </Nav.Item>
                <Nav.Link
                  onClick={() => navigate(`/users/${loggedInUser._id}`)}
                >
                  {/* to do: 툴팁 안뜸 */}
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="profile">프로필</Tooltip>}
                  >
                    <Avatar width="50" />
                  </OverlayTrigger>
                </Nav.Link>
              </>
            ) : (
              <Nav.Item>
                <Nav.Link onClick={login}>로그인</Nav.Link>
              </Nav.Item>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
