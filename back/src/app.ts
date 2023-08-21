import userRouter from "./routes/userRouter";
import reviewAuthRouter from "./routes/reviewRouter";
import travelAuthRouter from "./routes/travelRouter";
import beachRouter from "./routes/beachRouter";
import { errorMiddleware, httpLogger } from "./config/logger";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import passport from "passport";
import { jwtStrategy, localStrategy } from "./config/passport";
import authRouter from "./routes/authRouter";

const { swaggerUi, specs } = require("./swagger/swagger");

require("./db/index");

const app: Express = express();
app.use(
  cors({
    origin: "*", // cors origin 허용 * 일 경우 보안 문제 있을 수 있음
    methods: "GET", // 허용할 HTTP 메서드
  })
);
app.use(passport.initialize());
localStrategy();
jwtStrategy();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
console.log("[LOG] Swagger API DOCS - http://localhost:5001/api-docs");

app.get("/", (req: Request, res: Response) => {
  res.send("기본 페이지");
});

app.use(httpLogger);

app.use("/users", userRouter);
app.use("/reviews", reviewAuthRouter);
app.use("/travels", travelAuthRouter);
app.use("/beaches", beachRouter);
app.use("/auth", authRouter);

app.use(errorMiddleware);

export { app };
