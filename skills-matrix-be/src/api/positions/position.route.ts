import { Router } from "express";
import PositionController from "./position.controller";

const position: Router = Router();
const positionController = new PositionController();

position.get("/", positionController.getPositions);

position.post("/", positionController.createPositions);

position.get("/:position_id", positionController.getPosition);

position.get("/:position_id/requirements/", positionController.getPositionRequirements);
position.get("/:position_id/competency_groups/", positionController.getPositionCompetencyGroups);

export default position;
