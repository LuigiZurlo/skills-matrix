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
                                    message: 'Competencies not found',
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
          message: 'Skill not found',
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
        message: 'Competency successfully created',
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

}
