import { Router } from "express";
import ProjectController from "./project.controller";

const project: Router = Router();

const projectController = new ProjectController();
project.get("/", projectController.getProjects);
project.post("/", projectController.createProjects);

project.get("/:project_id", projectController.getProject);
project.put("/:project_id", projectController.updateProjects);
project.delete("/:project_id", projectController.deleteProject);

project.get("/:project_id/teams", projectController.getProjectTeams);
project.post("/:project_id/teams", projectController.createProjectTeams);
project.delete("/:project_id/teams", projectController.deleteProjectTeams);
project.get("/:project_id/positions", projectController.getProjectPositions);
project.post("/:project_id/positions", projectController.createProjectPositions);
project.delete("/:project_id/positions", projectController.deleteProjectPositions);
project.get("/:project_id/competencies", projectController.getProjectCompetencies);

export default project;
