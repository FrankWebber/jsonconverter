import express from 'express';
import { processTxtToJsonHandler } from './txtToJsonController.js';

const txtToJsonRouter = express.Router();
txtToJsonRouter.post('/', processTxtToJsonHandler);

export default txtToJsonRouter;
