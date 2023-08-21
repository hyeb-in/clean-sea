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

import React, { useState, useContext } from "react";
import { UserStateContext, DispatchContext } from "../App";
import ReviewForm from "./review/ReviewForm";

const NavBar = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const { user: loggedInUser } = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

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
                  <ReviewForm
                    showModal={showModal}
                    setShowModal={setShowModal}
                    headerTitle="새 게시물 작성하기"
                  />
                </Nav.Link>
                <Nav.Item>
                  <Nav.Link onClick={logout}>로그아웃</Nav.Link>
                </Nav.Item>
                <Nav.Link
                  onClick={() => navigate(`/users/${loggedInUser._id}`)}
                >
                  <OverlayTrigger
                    placement="bottom"
                    overlay={<Tooltip id="my-profile">나의 프로필</Tooltip>}
                    // '나의 프로필' 오버레이가 뜨지 않는 이유?_?
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
