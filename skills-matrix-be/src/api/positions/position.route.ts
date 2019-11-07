import { Router } from "express";
import PositionController from "./position.controller";

const position: Router = Router();
const positionController = new PositionController();

position.get("/", positionController.getPositions);

position.post("/", positionController.createPositions);

position.get("/:position_id", positionController.getPosition);
position.put("/:position_id", positionController.updatePositions);
position.delete("/:position_id", positionController.deletePosition);

position.get("/:position_id/requirements/", positionController.getPositionRequirements);
position.post("/:position_id/requirements/", positionController.createPositionRequirement);
position.delete("/:position_id/requirements/", positionController.deletePositionRequirement);
position.get("/:position_id/competency_groups/", positionController.getPositionCompetencyGroups);
position.post("/:position_id/competency_groups/", positionController.createPositionCompetencyGroup);

export default position;
