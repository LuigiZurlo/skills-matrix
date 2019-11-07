import {Request, Response} from "express";
import {ApiResponse} from "../../common/api.response.model";
import {ErrorHandler} from "../../common/Error";
import {db, pgp} from "../../db/db";

export default class CompetencyController {

  public getCompetencies = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const competencies = await db.any("SELECT * FROM competencies", []);

      if (Object.keys(competencies).length === 0) {
        throw new ErrorHandler(404, "Competencies not found");
      }

      res.status(200).send(new ApiResponse(true, "Competencies found", competencies, 200));
      next();

    } catch (err) {
      next(err);
    }
  }

  public getCompetency = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const competencies = await db.any("SELECT * FROM competencies where id = $1", [req.params.competency_id]);

      if (Object.keys(competencies).length === 0) {
        throw new ErrorHandler(404, "Competency not found");
      }

      res.status(200).send(new ApiResponse(true, "Competency found", competencies, 200));
      next();

    } catch (err) {
      next(err);
    }
  }

  public createCompetencies = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const competencies = await db.one("INSERT INTO competencies (skill_id, level) " +
        "VALUES ($1, $2) " +
        "RETURNING *", [req.body.skill_id, req.body.level]);

      res.status(201).send(new ApiResponse(true, "Competency successfully created", competencies, 201));
      next();

    } catch (err) {
      next(err);
    }
  }

  public deleteCompetency = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const competencies = await db.any("DELETE FROM competencies " +
        "WHERE id = $1 " +
        "RETURNING *", [req.params.competency_id]);

      res.status(200).send(new ApiResponse(true, "Competency successfully deleted", competencies, 200));
      next();

    } catch (err) {
      next(err);
    }
  }

  public deleteCompetencies = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const competencies = await db.any("DELETE FROM competencies RETURNING *", []);

      res.status(200).send(new ApiResponse(true, "Competencies successfully deleted", competencies, 200));
      next();

    } catch (err) {
      next(err);
    }
  }

  public updateCompetency = async (req: Request, res: Response, next: any): Promise<any> => {
    try {
      const positionsColumnSet = new pgp.helpers.ColumnSet(
        ["skill_id", "level"],
        {table: "competencies"});
      const competenciesValues = req.body;
      const competenciesQuery = pgp.helpers.update(competenciesValues, positionsColumnSet) + " WHERE id = $1 RETURNING *";
      const posT = await db.result(competenciesQuery, [req.params.competency_id]);
      console.log(posT.rowCount);
      if (posT.rowCount === 1) {
        res.status(200).send(new ApiResponse(true, "Competency updated successfully", [], 200));
      } else {
        throw new ErrorHandler(400, "Bad request");
      }
      next();
    } catch (err) {
      next(err);
    }
  }

}
