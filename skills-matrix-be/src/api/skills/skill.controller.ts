import { Request, Response } from "express";
import { db, pgp } from "../../db/db";

export default class SkillController {

  public getSkills = async (req: Request, res: Response): Promise<any> => {
    try {

      const skills = await db.any("SELECT * FROM skills", []);

      if (Object.keys(skills).length === 0) {
        return res.status(404).send({
          data: skills,
          message: "Skills not found",
          success: false,
        });
      }

      res.status(200).send({
        data: skills,
        data_length: skills.length,
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

  public getSkill = async (req: Request, res: Response): Promise<any> => {
    try {

      const skills = await db.any("SELECT * FROM skills where id = $1", [req.params.id]);

      if (Object.keys(skills).length === 0) {
        return res.status(404).send({
          data: skills,
          message: "Skill not found",
          success: false,
        });
      }

      res.status(200).send({
        data: skills,
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

  public createSkills = async (req: Request, res: Response): Promise<any> => {
    try {

      // Create Skills
      const skillsColumnSet = new pgp.helpers.ColumnSet(["name"], {table: "skills"});
      const skillsValues = req.body;
      const skillsQuery = pgp.helpers.insert(skillsValues, skillsColumnSet) + " ON CONFLICT DO NOTHING RETURNING *";
      const skillsResult = await db.any(skillsQuery);

      // Create Competencies
      const competenciesColumnSet = new pgp.helpers.ColumnSet(["skill_id", "level"], {table: "competencies"});
      const competenciesValues = [];
      for ( const skill of skillsResult ) {
        for (let j = 0; j < 5; j++) {
          competenciesValues.push( { skill_id: skill.id, level: j });
        }
      }
      const competenciesQuery = pgp.helpers.insert(competenciesValues, competenciesColumnSet);
      await db.none(competenciesQuery);

      res.status(201).send({
        data: skillsResult,
        message: "Skill(s) successfully created",
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

  public deleteSkill = async (req: Request, res: Response): Promise<any> => {
    try {

      const rows = await db.any("DELETE FROM skills WHERE id = $1 RETURNING *", [req.params.id]);

      res.status(200).send({
        data: rows,
        message: "Skill successfully deleted",
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

  public deleteSkills = async (req: Request, res: Response): Promise<any> => {
    try {

      const skills = await db.any("DELETE FROM skills RETURNING *", []);

      res.status(200).send({
        data: skills,
        message: "Skills successfully deleted",
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
