import { Router } from 'express';
import PositionController from "./position.controller";

import positionRequirement from './requirements/position.requirement.route';

const position: Router = Router();
const positionController = new PositionController();

position.get('/', positionController.getAll);

position.post('/add', positionController.addPosition);

position.get('/:position_id', positionController.getPositionById);

position.use('/:position_id/requirements', positionRequirement);

export default position;
