import { Request, Response } from 'express';
import Project from './project.model';

export default class ProjectController {

  public getAll = async (req: Request, res: Response): Promise<any> => {
    try {

      const projects = await Project.find();

      if (!projects) {
        return res.status(404).send({
          success: false,
          message: "Projects not found",
          data: null
        });
      }

      res.status(200).send({
        success: true,
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

      const project = await Project.findById(req.params.id);

      if (!project) {
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
        message: err.toString(),
        data: null
      });

    }
  };

  public addProject = async (req: Request, res: Response): Promise<any> => {
    try {

      const project = new Project({
        name: req.body.name
      });

      const newProject = await project.save();

      res.status(201).send({
        success: true,
        message: "Project successfully created",
        data: newProject
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
