import { Router } from "express";
import PositionController from './position.controller';

const position: Router = Router();
const positionController = new PositionController();

position.get('/', positionController.getAll);
position.post('/add', positionController.addPosition);

export default position;
