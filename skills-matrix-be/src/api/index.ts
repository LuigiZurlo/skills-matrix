import { Router } from 'express';
import skills from './skills/skill.route';
import competencies from './competencies/competency.route';
import resources from './resources/resource.route';

const router: Router = Router();

router.use('/skills', skills);
router.use('/competencies', competencies);
router.use('/resources', resources);

export default router;
