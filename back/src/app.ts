// import userRouter from "./routes/userRouter";
import reviewAuthRouter from "./routes/reviewRouter";
// import { errorMiddleware, httpLogger } from "./config/logger";
import express, { Express, Request, Response } from "express";
import cors from "cors";
// import { jwtStrategy, localStrategy } from "./config/passport";

const { swaggerUi, specs } = require("./swagger/swagger");

require("./db/index");

const app : Express = express();
app.use(cors());
// localStrategy();
//jwtStrategy();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", (req : Request, res : Response) => {
  res.send("기본 페이지");
});

// app.use(httpLogger);

// app.use("/users", userRouter);
app.use("/reviews", reviewAuthRouter);

// app.use(errorMiddleware);


export { app };
