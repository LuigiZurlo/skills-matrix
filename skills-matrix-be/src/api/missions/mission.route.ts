import {Router} from "express";
import MissionController from "./mission.controller";


const mission: Router = Router();
const missionController = new MissionController();

mission.get('/', missionController.getAll);

mission.post('/add', missionController.addMission);

export default mission;
