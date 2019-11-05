import { Request, Response } from "express";
import {ApiResponse} from "../../common/api.response.model";
import {ErrorHandler} from "../../common/Error";
import { db, pgp } from "../../db/db";

export default class CompetencyGroupController {
  public getCompetencyGroups = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const competencyGroups = await db.any("SELECT * FROM competency_groups WHERE id = $1",
        [req.params.competency_group_id]);

      if (Object.keys(competencyGroups).length === 0) {
        throw new ErrorHandler(404, "Competency group not found");
      }
      res.status(200).send(new ApiResponse(true, "Competency group found", competencyGroups, 200));
      next();
    } catch (err) {
      next(err);
    }
  }
}
