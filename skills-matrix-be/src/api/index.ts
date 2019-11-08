import { Router } from "express";
import competencies from "./competencies/competency.route";
import competencyGroups from "./competency_groups/competency_group.route";
import missions from "./missions/mission.route";
import positions from "./positions/position.route";
import projects from "./projects/project.route";
import reports from "./reports/report.route";
import resources from "./resources/resource.route";
import skills from "./skills/skill.route";
import teams from "./teams/team.route";

const router: Router = Router();

router.use("/skills", skills);
router.use("/projects", projects);
router.use("/competencies", competencies);
router.use("/missions", missions);
router.use("/resources", resources);
router.use("/positions", positions);
router.use("/reports", reports);
router.use("/teams", teams);
router.use("/competency_groups", competencyGroups);

export default router;
