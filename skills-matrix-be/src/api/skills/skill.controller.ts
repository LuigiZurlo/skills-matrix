import { Request, Response } from 'express';
import Skill from './skill.model';

export default class SkillController {

  public getAll = async (req: Request, res: Response): Promise<any> => {
    try {

      const skills = await Skill.find();

      if (!skills) {
        return res.status(404).send({
          success: false,
          message: 'Skills not found',
          data: null
        });
      }

      res.status(200).send({
        success: true,
        data: skills
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });

    }
  };

  public getSkillById = async (req: Request, res: Response): Promise<any> => {
    try {

      const skill = await Skill.findById(req.params.id);

      if (!skill) {
        return res.status(404).send({
          success: false,
          message: 'Skill not found',
          data: null
        });
      }

      res.status(200).send({
        success: true,
        data: skill
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });

    }
  };

  public addSkill = async (req: Request, res: Response): Promise<any> => {
    try {

      const skill = new Skill({
        name: req.body.name,
        display_name: req.body.name,
        scope: req.body.scope,
        category: req.body.category
      });

      const newSkill = await skill.save();

      res.status(201).send({
        success: true,
        message: 'Skill successfully created',
        data: newSkill
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });

    }
  };

  public updateSkill = async (req: Request, res: Response): Promise<any> => {
    try {

      const skillUpdated = await Skill.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            name: req.body.name.toLowerCase(),
            display_name: req.body.name,
            scope: req.body.scope,
            category: req.body.category
          }
        },
        { new: true }
      );

      if (!skillUpdated) {
        return res.status(404).send({
          success: false,
          message: 'Skill to update not found!',
          data: null
        });
      }

      res.status(200).send({
        success: true,
        message: 'Skill successfully updated.',
        data: skillUpdated
      });

    } catch(err) {

      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });

    }
  };

  public removeSkill = async (req: Request, res: Response): Promise<any> => {
    try {

      const skill = await Skill.findByIdAndRemove(req.params.id);

      if (!skill) {
        return res.status(404).send({
          success: false,
          message: 'Skill not found',
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

  public removeAll = async (req: Request, res: Response): Promise<any> => {
    try {

      const skills = await Skill.deleteMany({});

      if (!skills) {
        return res.status(404).send({
          success: false,
          message: 'Skills not found',
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

  public importSkills = async (req: Request, res: Response): Promise<any> => {
    try {

      const newSkills = await Skill.insertMany(req.body);

      res.status(201).send({
        success: true,
        message: 'Skills successfully created',
        data: newSkills
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
