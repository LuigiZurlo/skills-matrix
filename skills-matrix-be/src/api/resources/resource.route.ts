import { Router } from 'express';
import ResourceController from "./resource.controller";
import CompetencyController from "../competencies/competency.controller";
import ResourceCompetencyController from "./resource.competency.controller";

const resource: Router = Router();

const resourceController = new ResourceController();
const resourceCompetencyController = new ResourceCompetencyController();
const competencyController = new CompetencyController();

resource.get('/', resourceController.getAll);

resource.post('/add', resourceController.addResource);

resource.get('/:resource_id', resourceController.getResourceById);

resource.get('/:resource_id/competencies', resourceCompetencyController.getAllByResourceId);

resource.post('/:resource_id/competencies/add', resourceCompetencyController.addResourceCompetency);

resource.get('/:resource_id/competencies/:competency_id', competencyController.getCompetencyById);

export default resource;
