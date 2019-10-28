import { Request, Response } from "express";
import { db, pgp } from "../../db/db";

export default class TeamController {

  public getTeams = async (req: Request, res: Response): Promise<any> => {
    try {

      const validQueryParams = [ "project_id" ];

      let teams: any;
      if (typeof req.query.project_id !== "undefined") {
        teams = await db.any("SELECT * FROM project_teams WHERE project_id = $1", [ req.query.project_id ]);
      } else {
        teams = await db.any("SELECT * FROM project_teams", []);
      }

      if (Object.keys(teams).length === 0) {
        return res.status(404).send({
          data: teams,
          message: "Teams not found",
          success: false,
        });
      }

      res.status(200).send({
        data: teams,
        data_length: teams.length,
        success: true,
      });

    } catch (err) {

      res.status(500).send({
        data: null,
        message: err.toString(),
        success: false,
      });

    }
  }

  public getTeam = async (req: Request, res: Response): Promise<any> => {
    try {

      const teams = await db.one("SELECT * FROM project_teams where id = $1", [req.params.team_id]);

      if (Object.keys(teams).length === 0) {
        return res.status(404).send({
          data: null,
          message: "Team not found",
          success: false,
        });
      }

      res.status(200).send({
        data: teams,
        success: true,
      });

    } catch (err) {

      res.status(500).send({
        data: null,
        message: err.toString(),
        success: false,
      });

    }
  }

  public createTeams = async (req: Request, res: Response): Promise<any> => {
    try {

      // Create Teams
      const teamsColumnSet = new pgp.helpers.ColumnSet(["project_id", "name"], {table: "project_teams"});
      const teamsValues = req.body;
      const teamsQuery = pgp.helpers.insert(teamsValues, teamsColumnSet) + " ON CONFLICT DO NOTHING RETURNING *";
      const teamsResult = await db.any(teamsQuery);

      res.status(201).send({
        data: teamsResult,
        message: "Team(s) successfully created",
        success: true,
      });

    } catch (err) {

      res.status(500).send({
        data: null,
        message: err.toString(),
        success: false,
      });

    }
  }

  public deleteTeam = async (req: Request, res: Response): Promise<any> => {
    try {

      const rows = await db.any("DELETE FROM project_teams WHERE id = $1 RETURNING *", [req.params.team_id]);

      res.status(200).send({
        data: rows,
        message: "Team successfully deleted",
        success: true,
      });

    } catch (err) {

      res.status(500).send({
        data: null,
        message: err.toString(),
        success: false,
      });

    }
  }

  public getTeamResources = async (req: Request, res: Response): Promise<any> => {
    try {

      const teamResources = await db.any("" +
        "SELECT * FROM resources r WHERE r.id " +
        "IN (SELECT tm.resource_id FROM team_memberships tm WHERE tm.team_id = $1)", [req.params.team_id]);

      res.status(200).send({
        data: teamResources,
        data_length: teamResources.length,
        success: true,
      });

    } catch (err) {

      res.status(500).send({
        data: null,
        message: err.toString(),
        success: false,
      });

    }
  }

  public addTeamResources = async (req: Request, res: Response): Promise<any> => {
    try {

      const teamsResourcesColumnSet = new pgp.helpers.ColumnSet(
        ["team_id", "resource_id"], {table: "team_memberships"});
      const teamResourcesValues = [];
      for (const resource of req.body) {
        teamResourcesValues.push ( { team_id: req.params.team_id, resource_id: resource.id } );
      }
      const teamResourcesQuery = pgp.helpers.insert(teamResourcesValues, teamsResourcesColumnSet) + " ON CONFLICT DO NOTHING RETURNING *";
      const teamResourcesResult = await db.any(teamResourcesQuery);

      res.status(201).send({
        data: teamResourcesResult,
        message: "Resources successfully added to team",
        success: true,
      });

    } catch (err) {

      res.status(500).send({
        data: null,
        message: err.toString(),
        success: false,
      });

    }
  }

}
