import passport from "passport";

export const jwtAuthentication = async (req, res, next) => {
  try {
    passport.authenticate("jwt", { session: false }, (error, user, info) => {
      if (error) throw error;
      if (info) {
        if (info.message === "jwt expired")
          return res.status(401).json("토큰 만료");

        if (info.message === "No auth token")
          return res.status(401).json("토큰 없음");

        if (info.message === "user not exist")
          return res.status(404).json("User Not Found!");
      }
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(400).json("error");
  }
};
