import userRouter from "./routes/userRouter";
import reviewAuthRouter from "./routes/reviewRouter";
import travelAuthRouter from "./routes/travelRouter";
import beachRouter from "./routes/beachRouter";
import commentAuthRouter from "./routes/commentRouter";
import likeAuthRouter from "./routes/likeRouter";
import { errorMiddleware, httpLogger } from "./config/logger";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import passport from "passport";
import { jwtStrategy, localStrategy } from "./config/passport";
import authRouter from "./routes/authRouter";
import { swaggerUi, specs } from "./swagger/swagger";

import "./db";

const app: Express = express();
app.use(cors());

app.use("/uploads", express.static("imageUpload"));

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
app.use("/comments", commentAuthRouter);

app.use("/api", likeAuthRouter);

app.use(errorMiddleware);

export { app };
