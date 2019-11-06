import { Router } from "express";
import CompetencyGroupController from "./competency_group.controller";

const competencyGroups: Router = Router();

const competencyGroupController = new CompetencyGroupController();

competencyGroups.get("/:competency_group_id", competencyGroupController.getCompetencyGroups);
competencyGroups.put("/:competency_group_id", competencyGroupController.updateCompetencyGroups);

export default competencyGroups;
