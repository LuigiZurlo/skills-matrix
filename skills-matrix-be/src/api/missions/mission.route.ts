import { Router } from 'express';
import MissionController from './mission.controller';

const mission: Router = Router();
const missionController = new MissionController();

mission.get('/', missionController.getAll);
mission.delete('/', missionController.removeAll);

mission.post('/add', missionController.addMission);

mission.get('/:mission_id', missionController.getMissionById);
mission.delete('/:mission_id', missionController.removeMission);

export default mission;
