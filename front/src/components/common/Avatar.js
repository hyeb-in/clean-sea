import React from "react";
import { Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../Api";

const Avatar = React.forwardRef(({ width, user }, ref) => {
  const navigate = useNavigate();

  return (
    <Nav.Link onClick={() => navigate(`/users/${user._id}`)} ref={ref}>
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="profile">프로필</Tooltip>}
      >
        <img
          className="rounded-circle"
          src={serverUrl + user?.uploadFile || "/icon.png"}
          width={width}
          alt="avatar"
        />
      </OverlayTrigger>
    </Nav.Link>
  );
});

export default Avatar;
