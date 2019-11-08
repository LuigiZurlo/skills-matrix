import { Router } from "express";
import TeamController from "./team.controller";

const team: Router = Router();
const teamController = new TeamController();

team.get("/", teamController.getTeams);
team.post("/", teamController.createTeams);

team.get("/:team_id", teamController.getTeam);
team.put("/:team_id", teamController.updateTeam)
team.delete("/:team_id", teamController.deleteTeam);

team.get("/:team_id/resources", teamController.getTeamResources);
team.post("/:team_id/resources", teamController.addTeamResources);

export default team;
