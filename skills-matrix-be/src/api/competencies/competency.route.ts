import { Router } from 'express';
import CompetencyController from './competency.controller';

const competency: Router = Router();
const competencyController = new CompetencyController();

competency.get('/', competencyController.getAll);
competency.delete('/', competencyController.removeAll);

competency.post('/add', competencyController.addCompetency);
competency.post('/import', competencyController.importCompetencies);

competency.get('/:id', competencyController.getCompetencyById);
competency.delete('/:id', competencyController.removeCompetency);
competency.put('/:id', competencyController.updateCompetency);

export default competency;
