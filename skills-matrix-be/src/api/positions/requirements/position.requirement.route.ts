import { Router } from 'express';
import PositionRequirementController from "./position.requirement.controller";


const positionRequirement: Router = Router();
const positionRequirementController = new PositionRequirementController();

positionRequirement.get('/', positionRequirementController.getPositionRequirementByPositionId);

positionRequirement.post('/add', positionRequirementController.addPositionRequirement);

export default positionRequirement;
