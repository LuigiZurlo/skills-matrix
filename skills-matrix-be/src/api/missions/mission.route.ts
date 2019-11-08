import { Router } from "express";
import MissionController from "./mission.controller";

const mission: Router = Router();
const missionController = new MissionController();

mission.get("/", missionController.getMissions);
mission.delete("/", missionController.deleteMissions);
mission.post("/", missionController.createMissions);

mission.get("/:mission_id", missionController.getMission);
mission.put("/:mission_id", missionController.updateMissions);
mission.delete("/:mission_id", missionController.deleteMission);

export default mission;
