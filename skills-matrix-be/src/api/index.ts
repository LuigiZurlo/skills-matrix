import { Router } from 'express';
import skills from './skills/skill.route';

const router: Router = Router();

router.use('/skills', skills);

export default router;
