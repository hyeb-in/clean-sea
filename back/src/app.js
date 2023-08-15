import userRouter from "./routes/userRouter";
import reviewAuthRouter from "./routes/review.routes";
import { logger } from "./config/logger";
import { jwtStrategy, localStrategy } from "./config/passport";

const cors = require("cors");
const express = require("express");
const { swaggerUi, specs } = require("./swagger/swagger");
const { errorMiddleware } = require("./middlewares/errorMiddleware");

require("./db/index");

const app = express();
app.use(cors());
localStrategy();
//jwtStrategy();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(userRouter);
app.get("/", (req, res) => {
  res.send("기본 페이지");
});

app.use("/users", userRouter);
app.use("/reviews", reviewAuthRouter);

app.use(errorMiddleware);

export { app };
