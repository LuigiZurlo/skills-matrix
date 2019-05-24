import { Router } from "express";
import PositionController from './position.controller';

const position: Router = Router();
const positionController = new PositionController();

position.get('/', positionController.getAll);
position.post('/add', positionController.addPosition);

position.get('/:id', positionController.getPositionById);
position.delete('/:id', positionController.removePosition);
position.put('/:id', positionController.updatePosition);

export default position;
