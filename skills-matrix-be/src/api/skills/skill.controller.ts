import { Request, Response } from 'express';
import { db, pgp } from '../../db/db';

export default class SkillController {

  public getSkills = async (req: Request, res: Response): Promise<any> => {
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
        message: err.toString(),
        data: null
      });

    }
  };

  public getSkill = async (req: Request, res: Response): Promise<any> => {
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
        message: err.toString(),
        data: null
      });

    }
  };

  public createSkills = async (req: Request, res: Response): Promise<any> => {
    try {

      // Create Skills
      const skillsColumnSet = new pgp.helpers.ColumnSet(['name'], {table: 'skills'});
      const skillsValues = req.body;
      const skillsQuery = pgp.helpers.insert(skillsValues, skillsColumnSet) + ' ON CONFLICT DO NOTHING RETURNING *';
      const skillsResult = await db.any(skillsQuery);

      // Create Competencies
      const competenciesColumnSet = new pgp.helpers.ColumnSet(['skill_id', 'level'], {table: 'competencies'});
      let competenciesValues = [];
      for (let i = 0; i < skillsResult.length; i++) {
        for (let j = 0; j < 5; j++) {
          competenciesValues.push( { skill_id: skillsResult[i].id, level: j });
        }
      }
      const competenciesQuery = pgp.helpers.insert(competenciesValues, competenciesColumnSet);
      await db.none(competenciesQuery);

      res.status(201).send({
        success: true,
        message: 'Skill(s) successfully created',
        data: skillsResult
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });

    }
  };

  public deleteSkill = async (req: Request, res: Response): Promise<any> => {
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
        message: err.toString(),
        data: null
      });

    }
  };

  public deleteSkills = async (req: Request, res: Response): Promise<any> => {
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
        message: err.toString(),
        data: null
      });

    }
  };

}
