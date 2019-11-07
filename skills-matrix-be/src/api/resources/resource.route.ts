import { Router } from "express";
import ResourceController from "./resource.controller";

const resource: Router = Router();

const resourceController = new ResourceController();

resource.get("/", resourceController.getResources);
resource.post("/", resourceController.createResources);

resource.get("/:resource_id", resourceController.getResource);
resource.put("/:resource_id", resourceController.updateResource);
resource.delete("/:resource_id", resourceController.deleteResource);

resource.get("/:resource_id/competencies", resourceController.getResourceCompetencies);
resource.post("/:resource_id/competencies", resourceController.createResourceCompetencies);
resource.delete("/:resource_id/competencies", resourceController.deleteResourceCompetencies);
resource.get("/:resource_id/missions", resourceController.getResourceMissions);
resource.post("/:resource_id/missions", resourceController.createResourceMissions);


export default resource;
