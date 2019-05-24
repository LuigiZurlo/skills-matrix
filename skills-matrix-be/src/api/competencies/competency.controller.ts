import { Request, Response } from 'express';
import Competency from './competency.model';
import Skill from '../skills/skill.model';

export default class CompetencyController {

  public getAll = async (req: Request, res: Response): Promise<any> => {
    try {

      const competencies = await Competency.find().populate('skill');

      if (!competencies) {
        return res.status(404).send({
          success: false,
          message: "Competencies not found",
          data: null
        });
      }

      res.status(200).send({
        success: true,
        data: competencies
      });

    } catch (err) {
    
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    
    }
  };

  public addCompetency = async (req: Request, res: Response): Promise<any> => {
    try {

      const skill = await Skill.findById(req.body.skill);

      if (!skill) {
        return res.status(500).send({
          success: false,
          message: "Skill with id:" + req.body.skill + " not found; Couldn't add Competency.",
          data: null
        })
      }

      const competency = new Competency({
        skill: skill._id,
        level: req.body.level
      });

      const newCompetency = await competency.save();

      res.status(201).send({
        success: true,
        message: "Competency successfully created",
        data: newCompetency
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });

    }
  };

  public removeCompetency = async (req: Request, res: Response): Promise<any> => {
    try {

      const competency = await Competency.findByIdAndRemove(req.params.id);

      if (!competency) {
        return res.status(404).send({
          success: false,
          message: 'Competency not found',
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

  public getCompetencyById = async (req: Request, res: Response): Promise<any> => {
    try {

      const competency = await Competency.findById(req.params.id);

      if (!competency) {
        return res.status(404).send({
          success: false,
          message: 'Competency not found',
          data: null
        });
      }

      res.status(200).send({
        success: true,
        data: competency
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });

    }
  };

  public updateCompetency = async (req: Request, res: Response): Promise<any> => {
    try {

      const competencyUpdated = await Competency.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            name: req.body.name.toLowerCase(),
            display_name: req.body.name
          }
        },
        { new: true }
      );

      if (!competencyUpdated) {
        return res.status(404).send({
          success: false,
          message: 'Competency to update not found!',
          data: null
        });
      }

      res.status(200).send({
        success: true,
        message: 'Competency successfully updated.',
        data: competencyUpdated
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
