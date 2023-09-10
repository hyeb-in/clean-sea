import { Router } from 'express';
import {
    createTravel,
    getMyTravel,
    getUserTravel,
    updateTravel,
    deleteTravel,
  } from "../controllers/travelController";
  import { jwtAuthentication } from "../middlewares/authenticateJwt";
  import { postTravelValidator, putTravelValidator } from '../utils/validators/travelValidator';

const travelAuthRouter = Router();

travelAuthRouter
    .post('/register', jwtAuthentication, postTravelValidator, createTravel)
    .get('/travelList', jwtAuthentication, getMyTravel);

travelAuthRouter.get('/users/:userId', getUserTravel);

travelAuthRouter
    .route('/:travelId')
    .put(jwtAuthentication, putTravelValidator, updateTravel)
    .delete(jwtAuthentication, deleteTravel);

  export default travelAuthRouter;
