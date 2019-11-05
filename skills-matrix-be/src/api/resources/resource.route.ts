import { Router } from "express";
import ResourceController from "./resource.controller";

const resource: Router = Router();

const resourceController = new ResourceController();

resource.get("/", resourceController.getResources);
resource.post("/", resourceController.createResources);

resource.get("/:resource_id", resourceController.getResource);

resource.get("/:resource_id/competencies", resourceController.getResourceCompetencies);
resource.get("/:resource_id/missions", resourceController.getResourceMissions);

export default resource;
