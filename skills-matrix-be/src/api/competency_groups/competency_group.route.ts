import { Router } from "express";
import CompetencyGroupController from "./competency_group.controller";

const competencyGroups: Router = Router();

const competencyGroupController = new CompetencyGroupController();

competencyGroups.get("/", competencyGroupController.getCompetencyGroups);
competencyGroups.post("/", competencyGroupController.createCompetencyGroups);
competencyGroups.delete("/", competencyGroupController.deleteCompetencyGroups);

competencyGroups.get("/:competency_group_id", competencyGroupController.getCompetencyGroup);
competencyGroups.put("/:competency_group_id", competencyGroupController.updateCompetencyGroups);
competencyGroups.delete("/:competency_group_id", competencyGroupController.deleteCompetencyGroup);


export default competencyGroups;
