import { Router } from "express";
import SkillController from "./skill.controller";

const skill: Router = Router();
const skillController = new SkillController();

skill.get("/", skillController.getSkills);
skill.delete("/", skillController.deleteSkills);

skill.post("/", skillController.createSkills);

skill.get("/:id", skillController.getSkill);
skill.put("/:id", skillController.updateSkills);
skill.delete("/:id", skillController.deleteSkill);

export default skill;
