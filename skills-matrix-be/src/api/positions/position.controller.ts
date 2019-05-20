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

}
