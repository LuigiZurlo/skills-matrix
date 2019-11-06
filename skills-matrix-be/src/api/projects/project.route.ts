import { Router } from "express";
import ProjectController from "./project.controller";

const project: Router = Router();

const projectController = new ProjectController();
project.get("/", projectController.getProjects);
project.post("/", projectController.createProjects);

project.get("/:project_id", projectController.getProject);
project.get("/:project_id/teams", projectController.getProjectTeams);
project.get("/:project_id/positions", projectController.getProjectPositions);
project.post("/:project_id/teams", projectController.createProjectTeams);
project.put("/:project_id", projectController.updateProjects);
project.get("/:project_id/competencies", projectController.getProjectCompetencies);

export default project;
