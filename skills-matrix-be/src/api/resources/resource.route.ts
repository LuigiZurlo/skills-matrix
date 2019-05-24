import { Router } from 'express';
import ResourceController from './resource.controller';

const resource: Router = Router();
const resourceController = new ResourceController();

resource.get('/', resourceController.getAll);

resource.post('/add', resourceController.addResource);

resource.get('/:id', resourceController.getResourceById);
resource.put('/:id', resourceController.updateResource);
resource.delete('/:id', resourceController.removeResource);

export default resource;
