import { Router } from 'express';
import ResourceController from "./resource.controller";

import resourceCompetency from './competencies/resource.competency.route';

const resource: Router = Router();
const resourceController = new ResourceController();

resource.get('/', resourceController.getAll);

resource.post('/add', resourceController.addResource);

resource.get('/:resource_id', resourceController.getResourceById);

resource.use('/:resource_id/competencies', resourceCompetency);

export default resource;
