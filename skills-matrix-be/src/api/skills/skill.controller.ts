import {Request, Response} from "express";
import {ApiResponse} from "../../common/api.response.model";
import {ErrorHandler} from "../../common/Error";
import {db, pgp} from "../../db/db";

export default class SkillController {

  public getSkills = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const skills = await db.any("SELECT * FROM skills", []);

      if (Object.keys(skills).length === 0) {
        throw new ErrorHandler(404, "Skills not found");
      }

      res.status(200).send(new ApiResponse(true, "Skills found", skills, 200));
      next();

    } catch (err) {
      next(err);
    }
  }

  public getSkill = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const skills = await db.any("SELECT * FROM skills where id = $1", [req.params.id]);

      if (Object.keys(skills).length === 0) {
        throw new ErrorHandler(404, "Skill not found");
      }

      res.status(200).send(new ApiResponse(true, "Skill found", skills, 200));
      next();

    } catch (err) {
      next(err);
    }
  }

  public createSkills = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      // Create Skills
      const skillsColumnSet = new pgp.helpers.ColumnSet(["name"], {table: "skills"});
      const skillsValues = req.body;
      const skillsQuery = pgp.helpers.insert(skillsValues, skillsColumnSet) + " ON CONFLICT DO NOTHING RETURNING *";
      const skillsResult = await db.any(skillsQuery);

      // Create Competencies
      const competenciesColumnSet = new pgp.helpers.ColumnSet(["skill_id", "level"], {table: "competencies"});
      const competenciesValues = [];
      for (const skill of skillsResult) {
        for (let j = 0; j < 5; j++) {
          competenciesValues.push({skill_id: skill.id, level: j});
        }
      }
      const competenciesQuery = pgp.helpers.insert(competenciesValues, competenciesColumnSet);
      await db.none(competenciesQuery);

      res.status(201).send(new ApiResponse(true, "Skill(s) successfully created", skillsResult, 201));
      next();
    } catch (err) {
      next(err);
    }
  }

  public deleteSkill = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const rows = await db.any("DELETE FROM skills WHERE id = $1 RETURNING *", [req.params.id]);

      res.status(200).send(new ApiResponse(true, "Skill successfully deleted", rows, 200));
      next();

    } catch (err) {
      next(err);
    }
  }

  public deleteSkills = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const skills = await db.any("DELETE FROM skills RETURNING *", []);

      res.status(200).send(new ApiResponse(true, "Skills successfully deleted", skills, 200));
      next();

    } catch (err) {
      next(err);
    }

  }

  public updateSkills = async (req: Request, res: Response, next: any): Promise<any> => {
    try {
      const skillsColumnSet = new pgp.helpers.ColumnSet(
        ["name", "created_at", "updated_at"],
        {table: "skills"});
      const skillsValues = req.body;
      const skillsQuery = pgp.helpers.update(skillsValues, skillsColumnSet) + " WHERE id = $1";
      const posT = await db.result(skillsQuery, [req.params.id]);
      if (posT.rowCount === 1) {
        res.status(200).send(new ApiResponse(true, "Skill updated successfully", [], 200));
      } else {
        throw new ErrorHandler(400, "Bad request");
      }
      next();
    } catch (err) {
      next(err);
    }
  }

}
