import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Col,
  FloatingLabel,
  Form,
  Image,
  InputGroup,
  Modal,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
import { faCompass } from "@fortawesome/free-solid-svg-icons";
import Avatar from "./Avatar";
import { faSquarePlus } from "@fortawesome/free-regular-svg-icons";
import React, { useState, useContext } from "react";
import { UserStateContext, DispatchContext } from "../App";

const NavBar = () => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleNavigate = (path) => navigate(path);
  const handleClose = () => setShowModal(false);

  const userState = useContext(UserStateContext);
  const dispatch = useContext(DispatchContext);

  const isLogin = !!userState.user;

  const logout = () => {
    sessionStorage.removeItem("userToken");
    dispatch({type: "LOGOUT"});
    navigate("/");
  };

  const login = () => {
    navigate("/login");
  }

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
              {/* 클릭하면 오버레이? */}
              <Modal
                centered
                show={showModal}
                onHide={handleClose}
                onClick={(e) => e.stopPropagation()}
                // 이벤트 전파 방지용 >> 없을 시 모달창 클릭할 때도 모달창이 사라지는 현상
              >
                <Modal.Header closeButton>
                  <Modal.Title>새 게시물 작성하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Row>
                    <Col xs={8}>
                      <Image
                        fluid
                        style={{ width: "100%" }}
                        src="https://health.chosun.com/site/data/img_dir/2023/05/31/2023053102582_0.jpg"
                      ></Image>
                    </Col>
                    <Col xs={4}>
                      <Row>
                        <Col xs="auto">
                          <Avatar width="30" />
                        </Col>
                        <Col className="px-0 d-flex align-items-center">
                          훈제오리
                        </Col>
                      </Row>
                      <InputGroup className="">
                        <FloatingLabel
                          controlId="floatingInput"
                          label="제목"
                          className="my-2"
                        >
                          <Form.Control
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                          />
                        </FloatingLabel>
                        <div>
                          {/* column 정렬을 위한 div입니다. FloatingLabel 때문에 css로 정렬하면 레이아웃 망가짐. */}
                          <Form.Control
                            value={content}
                            onChange={(e) => {
                              if (e.target.value.length <= 300) {
                                setContent(e.target.value);
                              }
                            }}
                            placeholder="내용"
                            as="textarea"
                            rows={3}
                            style={{ height: "100%" }}
                          />
                        </div>
                      </InputGroup>
                      <small className="text-muted">
                        {content ? content.length : "0"}/300
                      </small>
                    </Col>
                  </Row>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary">공유</Button>
                </Modal.Footer>
              </Modal>
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
