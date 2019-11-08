import { Router } from "express";
import CompetencyController from "./competency.controller";

const competency: Router = Router();
const competencyController = new CompetencyController();

competency.get("/", competencyController.getCompetencies);
competency.delete("/", competencyController.deleteCompetencies);

competency.post("/", competencyController.createCompetencies);

competency.get("/:competency_id", competencyController.getCompetency);
competency.put("/:competency_id", competencyController.updateCompetency);
competency.delete("/:competency_id", competencyController.deleteCompetency);

export default competency;
