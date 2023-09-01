import React from "react";
import { Image, Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DEFAULT_AVATAR } from "../../constants";
import { serverUrl } from "../../Api";

const Avatar = React.forwardRef(
  ({ width, user, avatarUrl, setAvatarUrl }, ref) => {
    const navigate = useNavigate();

    return (
      <Nav.Link onClick={() => navigate(`/users/${user._id}`)} ref={ref}>
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip id="profile">프로필</Tooltip>}
        >
          <Image
            src={serverUrl + avatarUrl}
            width={width}
            height={width}
            roundedCircle={true}
            alt="avatar"
            // enError={(e) => (e.currentTarget.src = DEFAULT_AVATAR)}
          />
        </OverlayTrigger>
      </Nav.Link>
    );
  }
);

export default Avatar;
