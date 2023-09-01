import React from "react";
import { Image, Nav, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Avatar = ({ width, user }) => {
  const navigate = useNavigate();

  return (
    <Nav.Link onClick={() => navigate(`/users/${user._id}`)}>
      <OverlayTrigger
        placement="bottom"
        overlay={<Tooltip id="profile">프로필</Tooltip>}
      >
        <Image
          src={
            user?.uploadFile[0]
              ? `http://34.64.87.254:5001/${user.uploadFile[0]}`
              : "https://blog.getbootstrap.com/assets/brand/bootstrap-logo-shadow@2x.png"
          }
          width={width}
          height={width}
          roundedCircle={true}
          alt="avatar"
          onError={(e) =>
            (e.currentTarget.src =
              "https://blog.getbootstrap.com/assets/brand/bootstrap-logo-shadow@2x.png")
          }
        />
      </OverlayTrigger>
    </Nav.Link>
  );
};

export default Avatar;
