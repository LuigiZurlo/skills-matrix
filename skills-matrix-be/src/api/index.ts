import { Router } from 'express';
import skills from './skills/skill.route';
import competencies from './competencies/competency.route';

const router: Router = Router();

router.use('/skills', skills);
router.use('/competencies', competencies);

export default router;
