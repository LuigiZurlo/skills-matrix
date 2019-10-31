import {Request, Response} from "express";

import {NotFound} from "../../common/api.response.notfound";
import {ErrorHandler, handleError} from "../../common/Error";
import {db, pgp} from "../../db/db";
import {ProjectApiResponse} from "./project.api.response";

export default class ProjectController {

  public getProjects = async (req: Request, res: Response): Promise<any> => {

    try {

      const projects = await db.any("SELECT * FROM projects", []);

      if (Object.keys(projects).length === 0) {
        return res.status(404).send({
          data: null,
          message: "Projects not found",
          success: false,
        });
      }
      const projectResponse = new ProjectApiResponse("getProject API", true, "Project(s) found", projects, 200);
      res.status(200).send(projectResponse,
        /*{
        data: projects,
        data_length: projects.length,
        success: true,
      }*/);
    } catch (err) {

      res.status(500).send({
        data: null,
        message: err.toString(),
        success: false,
      });

    }
  }

  public getProject = async (req: Request, res: Response, next: any): Promise<any> => {
    try {
      const infos = await db.any("SELECT * FROM projects WHERE id = $1", [req.params.project_id]);
      /*const resources = await db.any(
        'SELECT
          r.id, r.first_name, r.last_name, r.employee_number,
          p.id "position_id", p.display_name "position",
          m.is_active
        FROM resources r, positions p, missions m\n' +
        'WHERE\n' +
        '    m.project_id = $1\n' +
        '    AND m.position_id = p.id\n' +
        '    AND m.resource_id = r.id', [req.params.project_id]);*/
      // const project_teams = await db.any(
      //  'SELECT
      //    id "team_id", name
      //   FROM project_teams
      //    WHERE project_id = $1', [req.params.project_id]);

      if (Object.keys(infos).length === 0) {
        throw new ErrorHandler(404, "Project not found");
        /*return res.status(404).send(new NotFound(), {
          data: null,
          message: "Project not found",
          success: false,
        });*/
      }

      res.status(200).send({
        data:
        infos,
        // project_teams
        // resources,
        // positions,
        success: true,
      });
      next();
    } catch (err) {
      next(err);
      /*res.status(500).send({
        data: null,
        message: err.toString(),
        success: false,
      });*/
    }
  }

  public createProjects = async (req: Request, res: Response): Promise<any> => {
    try {

      const projectsColumnSet = new pgp.helpers.ColumnSet(
        ["name", "project_otp_code", "start_date", "end_date"],
        {table: "projects"});
      const projectsValues = req.body;
      const projectsQuery = pgp.helpers.insert(projectsValues, projectsColumnSet) + " ON CONFLICT DO NOTHING RETURNING *";
      const projectsResult = await db.any(projectsQuery);

      res.status(201).send({
        data: projectsResult,
        message: "Project(s) successfully created",
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

  public getProjectTeams = async (req: Request, res: Response): Promise<any> => {
    try {

      const projectTeams = await db.any("SELECT * FROM project_teams WHERE project_id = $1", [req.params.project_id]);

      if (Object.keys(projectTeams).length === 0) {
        return res.status(404).send({
          data: null,
          message: "Projects Teams not found",
          success: false,
        });
      }

      res.status(200).send({
        data: projectTeams,
        data_length: projectTeams.length,
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
