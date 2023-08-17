import { Router } from 'express';
import {
    createTravel,
    getMyTravel,
    getUserTravel,
    updateTravel,
    deleteTravel,
  } from "../controllers/travelController";

const travelAuthRouter = Router();

travelAuthRouter
    .post('/register',createTravel)
    .get('/travelList', getMyTravel);

travelAuthRouter.get('/:userId',getUserTravel);

travelAuthRouter
    .route('/:travelId')
    .put(updateTravel)
    .delete(deleteTravel);

  export default travelAuthRouter;