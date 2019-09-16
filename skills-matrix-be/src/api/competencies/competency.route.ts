import { Router } from 'express';
import CompetencyController from './competency.controller';


const competency: Router = Router();
const competencyController = new CompetencyController();

competency.get('/', competencyController.getAll);
competency.delete('/', competencyController.removeAll);

competency.post('/add', competencyController.addCompetency);

competency.get('/:competency_id', competencyController.getCompetencyById);
competency.delete('/:competency_id', competencyController.removeCompetency);

export default competency;
