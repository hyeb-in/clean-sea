import React from "react";
import { Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DEFAULT_AVATAR } from "../../constants";
import { serverUrl } from "../../Api";

const Avatar = React.forwardRef(({ width, user }, ref) => {
  const navigate = useNavigate();
  const hasAvatarUrl = user?.uploadFile && !!user?.uploadFile[0];

  const avatarUrl = hasAvatarUrl
    ? `${serverUrl}${user.uploadFile[0]}`
    : DEFAULT_AVATAR;

  return (
    <Nav.Link onClick={() => navigate(`/users/${user._id}`)} ref={ref}>
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="profile">프로필</Tooltip>}
      >
        <img
          className="rounded-circle"
          src={avatarUrl}
          width={width}
          alt="avatar"
          onerror="/image/dolphin.png"
        />
      </OverlayTrigger>
    </Nav.Link>
  );
});

export default Avatar;
