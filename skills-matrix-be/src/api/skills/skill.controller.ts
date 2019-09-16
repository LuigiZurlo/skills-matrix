import { Request, Response } from 'express';
import { db } from '../../db/db';

export default class SkillController {

  public getAll = async (req: Request, res: Response): Promise<any> => {
    try {

      const skills = await db.any('SELECT * FROM skills', []);

      if (Object.keys(skills).length == 0) {
        return res.status(404).send({
          success: false,
          message: 'Skills not found',
          data: skills
        });
      }

      res.status(200).send({
        success: true,
        data_length: skills.length,
        data: skills
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err,
        data: null
      });

    }
  };

  public getSkillById = async (req: Request, res: Response): Promise<any> => {
    try {

      const skills = await db.any('SELECT * FROM skills where id = $1', [req.params.id]);

      if (Object.keys(skills).length == 0) {
        return res.status(404).send({
          success: false,
          message: 'Skill not found',
          data: skills
        });
      }

      res.status(200).send({
        success: true,
        data: skills
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err,
        data: null
      });

    }
  };

  public addSkill = async (req: Request, res: Response): Promise<any> => {
    try {

      const skills = await db.one('INSERT INTO skills (name, display_name) VALUES ($1, $2) RETURNING *', [req.body.name.toLowerCase().replace(/ /gi,'-'), req.body.name]);

      await res.status(201).send({
        success: true,
        message: 'Skill successfully created',
        data: {
          skills: skills
        }
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err,
        data: null
      });

    }
  };

  public removeSkill = async (req: Request, res: Response): Promise<any> => {
    try {

      const rows = await db.any('DELETE FROM skills WHERE id = $1 RETURNING *', [req.params.id]);

      res.status(200).send({
        success: true,
        message: "Skill successfully deleted",
        data: rows
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err,
        data: null
      });

    }
  };

  public removeAll = async (req: Request, res: Response): Promise<any> => {
    try {

      const skills = await db.any('DELETE FROM skills RETURNING *', []);

      res.status(200).send({
        success: true,
        message: "Skills successfully deleted",
        data: skills
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
