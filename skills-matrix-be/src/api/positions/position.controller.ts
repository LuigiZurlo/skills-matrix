import { Request, Response } from "express";
import Competency from '../competencies/competency.model';
import Project from '../projects/project.model';
import Position from './position.model';
import Skill from '../skills/skill.model';

export default class PositionController {

  public getAll = async (req: Request, res: Response): Promise<any> => {
    try {

      const positions = await Position.find().populate({
        path: 'project',
        model: Project
      }).populate({
        path: 'competencies',
        model: Competency,
        populate: {
          path: 'skill',
          model: Skill
        }
      });

      if (!positions) {
        return res.status(404).send({
          success: false,
          message: "Positions not found",
          data: null
        });
      }

      res.status(200).send({
        success: true,
        data: positions
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });

    }
  };

  public addPosition = async (req: Request, res: Response): Promise<any> => {
    try {

      // ToDo: Validate competencies
      const position = new Position({
        name: req.body.name,
        display_name: req.body.name,
        team: req.body.team,
        project: req.body.project,
        competencies: req.body.competencies
      });

      const newPosition = await position.save();

      res.status(201).send({
        success: true,
        message: "Position successfully created",
        data: newPosition
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });

    }
  };

  public removePosition = async (req: Request, res: Response): Promise<any> => {
    try {

      const position = await Position.findByIdAndRemove(req.params.id);

      if (!position) {
        return res.status(404).send({
          success: false,
          message: 'Position not found',
          data: null
        });
      }

      res.status(204).send();

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });

    }
  };

  public getPositionById = async (req: Request, res: Response): Promise<any> => {
    try {

      const position = await Position.findById(req.params.id);

      if (!position) {
        return res.status(404).send({
          success: false,
          message: 'Position not found',
          data: null
        });
      }

      res.status(200).send({
        success: true,
        data: position
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });

    }
  };

  public updatePosition = async (req: Request, res: Response): Promise<any> => {
    try {

      const positionUpdated = await Position.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            name: req.body.name,
            project: req.body.project,
            team: req.body.team,
            competencies: req.body.competencies
          }
        },
        { new: true }
      );

      if (!positionUpdated) {
        return res.status(404).send({
          success: false,
          message: 'Position to update not found!',
          data: null
        });
      }

      res.status(200).send({
        success: true,
        message: 'Position successfully updated.',
        data: positionUpdated
      });

    } catch(err) {

      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });

    }
  };

}
