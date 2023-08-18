import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
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
  const handleNavigate = (path) => navigate(path);

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

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
            onClick={() => handleNavigate("/")}
            style={{ cursor: "pointer" }}
          >
            로고
          </Navbar.Brand>
          <Nav className="align-items-center">
            <Nav.Link onClick={() => handleNavigate("/search")}>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="button-tooltip-2">검색</Tooltip>}
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </OverlayTrigger>
            </Nav.Link>
            <Nav.Link onClick={() => handleNavigate("/network")}>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="button-tooltip-2">둘러보기</Tooltip>}
              >
                <FontAwesomeIcon icon={faCompass} />
              </OverlayTrigger>
            </Nav.Link>
            {/* 로그인 한 유저에게만 보이기 */}
            <Nav.Link onClick={() => setShowModal(!showModal)}>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="button-tooltip-2">업로드</Tooltip>}
                onClick={() => setShowModal(!showModal)}
              >
                <FontAwesomeIcon icon={faSquarePlus} />
              </OverlayTrigger>
              {/* 클릭하면 오버레이 */}
              <AddReview showModal={showModal} setShowModal={setShowModal} />
            </Nav.Link>
            {isLogin && (
              <Nav.Item>
                <Nav.Link onClick={logout}>로그아웃</Nav.Link>
              </Nav.Item>
            )}
            {!isLogin && (
              <Nav.Item>
                <Nav.Link onClick={login}>로그인</Nav.Link>
              </Nav.Item>
            )}
            <Nav.Link onClick={() => handleNavigate("users/:id")}>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="button-tooltip-2">나의 프로필</Tooltip>}
              >
                <Avatar width="50" />
              </OverlayTrigger>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
