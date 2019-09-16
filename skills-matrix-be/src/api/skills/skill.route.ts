import { Router } from 'express';
import SkillController from './skill.controller';

const skill: Router = Router();
const skillController = new SkillController();

skill.get('/', skillController.getAll);
skill.delete('/', skillController.removeAll);

skill.post('/add', skillController.addSkill);

skill.get('/:id', skillController.getSkillById);
skill.delete('/:id', skillController.removeSkill);

export default skill;
