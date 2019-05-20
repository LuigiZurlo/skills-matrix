import { Router } from 'express';
import skills from './skills/skill.route';
import competencies from './competencies/competency.route';
import resources from './resources/resource.route';
import projects from './projects/project.route';
import positions from './positions/position.route';

const router: Router = Router();

router.use('/skills', skills);
router.use('/competencies', competencies);
router.use('/resources', resources);
router.use('/projects', projects);
router.use('/positions', positions);

export default router;
