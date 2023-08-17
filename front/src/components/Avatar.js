import React from "react";

const Avatar = ({ width }) => {
  return (
    <img
      className="rounded-circle"
      src="https://blog.getbootstrap.com/assets/brand/bootstrap-logo-shadow@2x.png"
      width={width}
      alt="avatar"
    />
  );
};

export default Avatar;
