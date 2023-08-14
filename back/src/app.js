import { logger } from "./config/logger";
<<<<<<< HEAD
import userRouter from "./routes/userRouter";
=======
import userRouter from "./routes/user.routes";
import reviewAuthRouter from './routes/review.routes';
>>>>>>> e992be69c81df7900840aedc41c30f5723c80eba

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

app.use("/users", userRouter);
app.use("/review",reviewAuthRouter);


export { app };
