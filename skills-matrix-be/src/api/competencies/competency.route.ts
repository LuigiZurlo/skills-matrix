import { Router } from 'express';
import CompetencyController from './competency.controller';

const competency: Router = Router();
const competencyController = new CompetencyController();

competency.get('/', competencyController.getAll);
competency.post('/add', competencyController.addCompetency);

competency.get('/:id', competencyController.getCompetencyById);
competency.delete('/:id', competencyController.removeCompetency);

export default competency;
