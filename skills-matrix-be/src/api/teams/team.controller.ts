import {Request, Response} from "express";
import {ApiResponse} from "../../common/api.response.model";
import {ErrorHandler} from "../../common/Error";
import {db, pgp} from "../../db/db";

export default class TeamController {

  public getTeams = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const validQueryParams = ["project_id"];

      let teams: any;
      if (typeof req.query.project_id !== "undefined") {
        teams = await db.any("SELECT * FROM project_teams WHERE project_id = $1", [req.query.project_id]);
      } else {
        teams = await db.any("SELECT * FROM project_teams", []);
      }

      if (Object.keys(teams).length === 0) {
        throw new ErrorHandler(404, "Teams not found");
      }

      res.status(200).send(new ApiResponse(true, "Teams found", teams, 200));
      next();

    } catch (err) {
      next(err);
    }
  }

  public getTeam = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const teams = await db.any("SELECT * FROM project_teams where id = $1", [req.params.team_id]);

      if (teams.length === 0) {
        throw new ErrorHandler(404, "Team not found");

      }

      res.status(200).send(new ApiResponse(true, "Team found", teams, 200));
      next();

    } catch (err) {
      next(err);
    }
  }

  public createTeams = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      // Create Teams
      const teamsColumnSet = new pgp.helpers.ColumnSet(["project_id", "name"], {table: "project_teams"});
      const teamsValues = req.body;
      const teamsQuery = pgp.helpers.insert(teamsValues, teamsColumnSet) + " ON CONFLICT DO NOTHING RETURNING *";
      const teamsResult = await db.any(teamsQuery);

      res.status(201).send(new ApiResponse(true, "Team(s) successfully created", teamsResult, 201));
      next();

    } catch (err) {
      next(err);
    }
  }

  public deleteTeam = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const rows = await db.any("DELETE FROM project_teams WHERE id = $1 RETURNING *", [req.params.team_id]);

      res.status(200).send(new ApiResponse(true, "Team successfully deleted", rows, 200));
      next();

    } catch (err) {
      next(err);
    }
  }

  public getTeamResources = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const teamResources = await db.any("" +
        "SELECT * FROM resources r WHERE r.id " +
        "IN (SELECT tm.resource_id FROM team_memberships tm WHERE tm.team_id = $1)", [req.params.team_id]);

      if (teamResources.length === 0) {
        throw new ErrorHandler(404, "TeamResources not found");
      }

      res.status(200).send(new ApiResponse(true, "TeamResources found", teamResources, 200));
      next();

    } catch (err) {
      next(err);
    }
  }

  public addTeamResources = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const teamsResourcesColumnSet = new pgp.helpers.ColumnSet(
        ["team_id", "resource_id"], {table: "team_memberships"});
      const teamResourcesValues = req.body;
      /*for (const resource of req.body) {
        teamResourcesValues.push({team_id: req.params.team_id, resource_id: resource.id});
      }*/

      const teamResourcesQuery = pgp.helpers.insert(teamResourcesValues, teamsResourcesColumnSet) + " ON CONFLICT DO NOTHING RETURNING *";
      const teamResourcesResult = await db.any(teamResourcesQuery);

      res.status(201).send(new ApiResponse(true, "Resources successfully added to team", teamResourcesResult, 200));
      next();

    } catch (err) {
      next(err);
    }
  }

  public updateTeam = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const teamsColumnSet = new pgp.helpers.ColumnSet(["project_id", "name"], {table: "project_teams"});
      const teamsValues = req.body;
      const teamsQuery = pgp.helpers.update(teamsValues, teamsColumnSet) + " WHERE id = $1";
      const teamsResult = await db.result(teamsQuery, req.params.team_id);

      if (teamsResult.rowCount === 1) {
        res.status(200).send(new ApiResponse(true, "Team updated successfully", [], 200));
      } else {
        throw new ErrorHandler(400, "Bad request");
      }
      next();
    } catch (err) {
      next(err);
    }
  }

}
