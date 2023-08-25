import React from "react";
import { Col } from "react-bootstrap";

const Avatar = ({ width }) => {
  // url 링크를 여기에 포함시키는 게 어떨까?!?
  // 오버레이 -> 유저 프로필 보여주는 화면도 구현
  return (
    <Col sm="auto">
      <img
        className="rounded-circle"
        src="https://blog.getbootstrap.com/assets/brand/bootstrap-logo-shadow@2x.png"
        width={width}
        alt="avatar"
      />
    </Col>
  );
};

export default Avatar;
