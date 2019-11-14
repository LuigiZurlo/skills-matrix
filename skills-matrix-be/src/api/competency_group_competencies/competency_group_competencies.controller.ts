import {Request, Response} from "express";
import {ApiResponse} from "../../common/api.response.model";
import {ErrorHandler} from "../../common/Error";
import {db} from "../../db/db";

export default class CompetencyGroupCompetenciesController {

  public getCompetencyGroupCompetencies = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const competencyGroups = await db.any("SELECT * FROM competency_group_competencies");

      if (Object.keys(competencyGroups).length === 0) {
        throw new ErrorHandler(404, "CompetencyGroupCompetencies not found");
      }

      res.status(200).send(new ApiResponse(true, "CompetencyGroupCompetencies found", competencyGroups, 200));
      next();

    } catch (err) {
      next(err);
    }
  }

  public getCGCbyid = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const competencyGroups = await db.any("SELECT * FROM competency_group_competencies WHERE competency_group_id = $1",
        [req.params.competency_group_id]);

      if (Object.keys(competencyGroups).length === 0) {
        throw new ErrorHandler(404, "CompetencyGroupCompetencies not found");
      }

      res.status(200).send(new ApiResponse(true, "CompetencyGroupCompetencies found", competencyGroups, 200));
      next();

    } catch (err) {
      next(err);
    }
  }

  public createCompetencyGroupCompetencies = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const competencyGroups = await db.one("INSERT INTO competency_group_competencies (competency_id, competency_group_id) " +
        "VALUES ($1, $2) " +
        "RETURNING *", [req.body.competency_id, req.body.competency_group_id]);

      res.status(201).send(new ApiResponse(true,
        "CompetencyGroupCompetency successfully created", competencyGroups, 201));
      next();

    } catch (err) {
      next(err);
    }
  }


}
