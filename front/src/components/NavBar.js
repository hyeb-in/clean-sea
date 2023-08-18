import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { faCompass } from "@fortawesome/free-solid-svg-icons";
import Avatar from "./Avatar";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import AddReview from "./AddReview";

import React, { useState, useContext } from "react";
import { UserStateContext, DispatchContext } from "../App";

const NavBar = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);
  console.log(userState.user, "유저<<<<<<");
  // 로그인 했을 때 유저 토큰만 찍힘
  // 새로고침 누르면 false 찍힘
  const isLogin = !!userState.user;

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
            로고
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
            <Nav.Link onClick={() => navigate("/network")}>
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
                <Nav.Link onClick={() => setShowModal(!showModal)}>
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="upload">업로드</Tooltip>}
                    onClick={() => setShowModal(!showModal)}
                  >
                    <FontAwesomeIcon icon={faSquarePlus} />
                  </OverlayTrigger>
                  <AddReview
                    showModal={showModal}
                    setShowModal={setShowModal}
                  />
                </Nav.Link>
                <Nav.Item>
                  <Nav.Link onClick={logout}>로그아웃</Nav.Link>
                </Nav.Item>
                <Nav.Link>
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="my-profile">나의 프로필</Tooltip>}
                    // onClick={() => navigate(`users/${}`)}
                    // 유저 정보가 아직 userState에 저장되지 않고있음
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
