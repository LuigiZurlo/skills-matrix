import { Router } from 'express';
import skills from './skills/skill.route';
import projects from './projects/project.route';
import competencies from './competencies/competency.route';
import resources from './resources/resource.route';
import missions from './missions/mission.route';
import positions from './positions/position.route';

const router: Router = Router();

router.use('/skills', skills);
router.use('/projects', projects);
router.use('/competencies', competencies);
router.use('/missions', missions);
router.use('/resources', resources);
router.use('/positions', positions);

export default router;
