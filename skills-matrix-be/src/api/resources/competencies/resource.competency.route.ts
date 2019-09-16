import { Router } from 'express';
import ResourceCompetencyController from "./resource.competency.controller";
import CompetencyController from "../../competencies/competency.controller";


const resourceCompetency: Router = Router();
const resourceCompetencyController = new ResourceCompetencyController();
const competencyController = new CompetencyController();

resourceCompetency.get('/', resourceCompetencyController.getAllByResourceId);

resourceCompetency.post('/add', resourceCompetencyController.addResourceCompetency);

resourceCompetency.get('/:competency_id', competencyController.getCompetencyById);

export default resourceCompetency;
