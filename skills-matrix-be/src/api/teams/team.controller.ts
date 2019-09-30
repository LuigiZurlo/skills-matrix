import { Request, Response } from 'express';
import { db, pgp } from '../../db/db';

export default class TeamController {

  public getTeams = async (req: Request, res: Response): Promise<any> => {
    try {

      const validQueryParams = [ 'project_id' ];

      let teams: any;
      if(typeof req.query.project_id != 'undefined'){
        teams = await db.any('SELECT * FROM project_teams WHERE project_id = $1', [ req.query.project_id ]);
      }
      else {
        teams = await db.any('SELECT * FROM project_teams', []);
      }

      if (Object.keys(teams).length == 0) {
        return res.status(404).send({
          success: false,
          message: 'Teams not found',
          data: teams
        });
      }

      res.status(200).send({
        success: true,
        data_length: teams.length,
        data: teams
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });

    }
  };

  public getTeam = async (req: Request, res: Response): Promise<any> => {
    try {

      const teams = await db.any('SELECT * FROM project_teams where id = $1', [req.params.team_id]);

      if (Object.keys(teams).length == 0) {
        return res.status(404).send({
          success: false,
          message: 'Team not found',
          data: null
        });
      }

      res.status(200).send({
        success: true,
        data: teams
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });

    }
  };

  public createTeams = async (req: Request, res: Response): Promise<any> => {
    try {

      // Create Teams
      const teamsColumnSet = new pgp.helpers.ColumnSet(['project_id', 'name'], {table: 'project_teams'});
      const teamsValues = req.body;
      const teamsQuery = pgp.helpers.insert(teamsValues, teamsColumnSet) + ' ON CONFLICT DO NOTHING RETURNING *';
      const teamsResult = await db.any(teamsQuery);

      res.status(201).send({
        success: true,
        message: 'Team(s) successfully created',
        data: teamsResult
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });

    }
  };

  public deleteTeam = async (req: Request, res: Response): Promise<any> => {
    try {

      const rows = await db.any('DELETE FROM project_teams WHERE id = $1 RETURNING *', [req.params.team_id]);

      res.status(200).send({
        success: true,
        message: "Team successfully deleted",
        data: rows
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });

    }
  };

  public getTeamResources = async (req: Request, res: Response): Promise<any> => {
    try {

      const teamResources = await db.any('SELECT * FROM resources r WHERE r.id IN (' +
        'SELECT tm.resource_id FROM team_memberships tm WHERE tm.team_id = $1)', [req.params.team_id]);

      res.status(200).send({
        success: true,
        data_length: teamResources.length,
        data: teamResources
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });

    }
  };

  public addTeamResources = async (req: Request, res: Response): Promise<any> => {
    try {

      const teamsResourcesColumnSet = new pgp.helpers.ColumnSet(['team_id', 'resource_id'], {table: 'team_memberships'});
      let teamResourcesValues = [];
      for (let i=0; i< req.body.length; i++) {
        teamResourcesValues.push ( {team_id: req.params.team_id, resource_id: req.body[i].id} );
      }
      const teamResourcesQuery = pgp.helpers.insert(teamResourcesValues, teamsResourcesColumnSet) + ' ON CONFLICT DO NOTHING RETURNING *';
      const teamResourcesResult = await db.any(teamResourcesQuery);

      res.status(201).send({
        success: true,
        message: 'Resources successfully added to team',
        data: teamResourcesResult
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });

    }
  };

}
