import { Router } from 'express';
import {
    createTravel,
    getMyTravel,
    getUserTravel,
    updateTravel,
    deleteTravel,
  } from "../controllers/travelController";
  import { jwtAuthentication } from "../middlewares/authenticateJwt";

const travelAuthRouter = Router();

travelAuthRouter
    .post('/register', jwtAuthentication, createTravel)
    .get('/travelList', jwtAuthentication, getMyTravel);

travelAuthRouter.get('/:userId', jwtAuthentication, getUserTravel);

travelAuthRouter
    .route('/:travelId')
    .put(jwtAuthentication, updateTravel)
    .delete(jwtAuthentication, deleteTravel);

  export default travelAuthRouter;