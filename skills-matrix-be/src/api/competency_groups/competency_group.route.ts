import { Router } from "express";
import CompetencyGroupController from "./competency_group.controller";

const competencyGroups: Router = Router();

const competencyGroupController = new CompetencyGroupController();

competencyGroups.get("/:competency_group_id", competencyGroupController.getCompetencyGroups);

export default competencyGroups;
