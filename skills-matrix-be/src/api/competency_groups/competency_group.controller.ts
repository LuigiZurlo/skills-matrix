import {Request, Response} from "express";
import {ApiResponse} from "../../common/api.response.model";
import {ErrorHandler} from "../../common/Error";
import {db, pgp} from "../../db/db";

export default class CompetencyGroupController {

  public getCompetencyGroups = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const competencyGroups = await db.any("SELECT * FROM competency_groups");

      if (Object.keys(competencyGroups).length === 0) {
        throw new ErrorHandler(404, "CompetencyGroups not found");
      }

      res.status(200).send(new ApiResponse(true, "CompetencyGroups found", competencyGroups, 200));
      next();

    } catch (err) {
      next(err);
    }
  }

  public getCompetencyGroup = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const competencyGroups = await db.any("SELECT * FROM competency_groups WHERE id = $1",
        [req.params.competency_group_id]);

      if (Object.keys(competencyGroups).length === 0) {
        throw new ErrorHandler(404, "CompetencyGroup not found");
      }

      res.status(200).send(new ApiResponse(true, "CompetencyGroup found", competencyGroups, 200));
      next();

    } catch (err) {
      next(err);
    }
  }

  public createCompetencyGroups = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const competencyGroups = await db.one("INSERT INTO competency_groups (position_id, name) " +
        "VALUES ($1, $2) " +
        "RETURNING *", [req.body.position_id, req.body.name]);

      res.status(201).send(new ApiResponse(true, "CompetencyGroup successfully created", competencyGroups, 201));
      next();

    } catch (err) {
      next(err);
    }
  }

  public updateCompetencyGroups = async (req: Request, res: Response, next: any): Promise<any> => {
    try {
      const competencyGroupColumnSet = new pgp.helpers.ColumnSet(
        ["position_id", "name"],
        {table: "competency_groups"});
      const compValues = req.body;
      const compQuery = pgp.helpers.update(compValues, competencyGroupColumnSet) + " WHERE id = $1";
      const posT = await db.result(compQuery, [req.params.competency_group_id]);
      if (posT.rowCount === 1) {
        res.status(200).send(new ApiResponse(true, "CompetencyGroup updated successfully", [], 200));
      } else {
        throw new ErrorHandler(400, "Bad request");
      }
      next();
    } catch (err) {
      next(err);
    }
  }

  public deleteCompetencyGroup = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const competencies = await db.any("DELETE FROM competency_groups " +
        "WHERE id = $1 " +
        "RETURNING *", [req.params.competency_group_id]);

      res.status(200).send(new ApiResponse(true, "CompetencyGroup successfully deleted", competencies, 200));
      next();

    } catch (err) {
      next(err);
    }
  }

  public deleteCompetencyGroups = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const competencies = await db.any("DELETE FROM competencies RETURNING *", []);

      res.status(200).send(new ApiResponse(true, "CompetencyGroups successfully deleted", competencies, 200));
      next();

    } catch (err) {
      next(err);
    }
  }


}
