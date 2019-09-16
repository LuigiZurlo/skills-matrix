import { Request, Response } from 'express';
import { db } from '../../db/db';

export default class ProjectController {

  public getAll = async (req: Request, res: Response): Promise<any> => {
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

  public getProjectById = async (req: Request, res: Response): Promise<any> => {
    try {

      const project = await db.any('SELECT * FROM projects WHERE id = $1', [req.params.id]);

      if (Object.keys(project).length == 0 ) {
        return res.status(404).send({
          success: false,
          message: 'Project not found',
          data: null
        });
      }

      res.status(200).send({
        success: true,
        data: project
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err,
        data: null
      });

    }
  };

  public addProject = async (req: Request, res: Response): Promise<any> => {
    try {

      const project = await db.one('INSERT INTO projects (name, project_otp_code, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING *', [req.body.name, req.body.project_otp_code, req.body.start_date, req.body.end_date]);

      res.status(201).send({
        success: true,
        message: "Project successfully created",
        data: project
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err,
        data: null
      });

    }
  };

}
