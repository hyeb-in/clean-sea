import { Router } from 'express';
import { toggleLike } from '../controllers/likeController';
import { jwtAuthentication } from "../middlewares/authenticateJwt";

const likeAuthRouter = Router();

likeAuthRouter.post('/like', jwtAuthentication, toggleLike);

export default likeAuthRouter;