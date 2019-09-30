import { Request, Response } from 'express';
import { db, pgp } from '../../db/db';

export default class ProjectController {

  public getProjects = async (req: Request, res: Response): Promise<any> => {
    try {

      const projects = await db.any('SELECT * FROM projects', []);

      if (Object.keys(projects).length == 0) {
        return res.status(404).send({
          success: false,
          message: "Projects not found",
          data: null
        });
      }

      res.status(200).send({
        success: true,
        data_length: projects.length,
        data: projects
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });

    }
  };

  public getProject = async (req: Request, res: Response): Promise<any> => {
    try {

      const infos = await db.one('SELECT * FROM projects WHERE id = $1', [req.params.project_id]);
      /*const resources = await db.any('SELECT r.id, r.first_name, r.last_name, r.employee_number, p.id "position_id", p.display_name "position", m.is_active FROM resources r, positions p, missions m\n' +
        'WHERE\n' +
        '    m.project_id = $1\n' +
        '    AND m.position_id = p.id\n' +
        '    AND m.resource_id = r.id', [req.params.project_id]);*/
      //const project_teams = await db.any('SELECT id "team_id", name FROM project_teams WHERE project_id = $1', [req.params.project_id]);

      if (Object.keys(infos).length == 0 ) {
        return res.status(404).send({
          success: false,
          message: 'Project not found',
          data: null
        });
      }

      res.status(200).send({
        success: true,
        data:
          infos
          //positions,
          //resources,
          //project_teams
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });

    }
  };

  public createProjects = async (req: Request, res: Response): Promise<any> => {
    try {

      const projectsColumnSet = new pgp.helpers.ColumnSet(['name', 'project_otp_code', 'start_date', 'end_date'], {table: 'projects'});
      const projectsValues = req.body;
      const projectsQuery = pgp.helpers.insert(projectsValues, projectsColumnSet) + ' ON CONFLICT DO NOTHING RETURNING *';
      const projectsResult = await db.any(projectsQuery);

      res.status(201).send({
        success: true,
        message: "Project(s) successfully created",
        data: projectsResult
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });

    }
  };

  public getProjectTeams = async (req: Request, res: Response): Promise<any> => {
    try {

      const project_teams = await db.any('SELECT * FROM project_teams WHERE project_id = $1', [req.params.project_id]);

      if (Object.keys(project_teams).length == 0) {
        return res.status(404).send({
          success: false,
          message: "Projects Teams not found",
          data: null
        });
      }

      res.status(200).send({
        success: true,
        data_length: project_teams.length,
        data: project_teams
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
