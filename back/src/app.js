import { logger } from "./config/logger";
import userRouter from "./routes/user.routes";
import reviewRouter from "./routes/review.routes";

const cors = require("cors");
const express = require("express");
const { swaggerUi, specs } = require("./swagger/swagger");

require("./db/index");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(userRouter);
app.get("/", (req, res) => {
  res.send("기본 페이지");
});

logger.error("app.js test error message");
logger.info("app.js test info message");
app.use("/users", userRouter);
app.use("/review", reviewRouter);
export { app };
