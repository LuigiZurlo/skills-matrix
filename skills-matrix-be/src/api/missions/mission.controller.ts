import {Request, Response} from "express";
import {ApiResponse} from "../../common/api.response.model";
import {ErrorHandler} from "../../common/Error";
import {db, pgp} from "../../db/db";

export default class MissionController {

  public getMissions = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const missions = await db.any("SELECT * FROM missions", []);

      if (Object.keys(missions).length === 0) {
        throw new ErrorHandler(404, "Missions not found");
      }

      res.status(200).send(new ApiResponse(true, "Missions found", missions, 200));
      next();

    } catch (err) {
      next(err);
    }
  }

  public getMission = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const missions = await db.any("SELECT * FROM missions where id = $1", [req.params.mission_id]);

      if (Object.keys(missions).length === 0) {
        throw new ErrorHandler(404, "Mission not found");
      }

      res.status(200).send(new ApiResponse(true, "Mission found", missions, 200));
      next();

    } catch (err) {
      next(err);
    }
  }

  public createMissions = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const missions = await db.one("INSERT INTO missions (resource_id, project_id, position_id, start_date, end_date) VALUES ($1, $2, $3, $4, $5) RETURNING *", [req.body.resource_id, req.body.project_id, req.body.position_id, req.body.start_date, req.body.end_date]);

      res.status(201).send(new ApiResponse(true, "Mission successfully created", missions, 201));
      next();

    } catch (err) {
      next(err);
    }
  }

  public deleteMission = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const missions = await db.any("DELETE FROM missions WHERE id = $1 RETURNING *", [req.params.mission_id]);

      res.status(200).send(new ApiResponse(true, "Mission successfully deleted", missions, 200));
      next();

    } catch (err) {
      next(err);
    }
  }

  public deleteMissions = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const missions = await db.any("DELETE FROM missions RETURNING *", []);

      res.status(200).send(new ApiResponse(true, "Missions successfully deleted", missions, 200));
      next();

    } catch (err) {
      next(err);
    }
  }

  public updateMissions = async (req: Request, res: Response, next: any): Promise<any> => {
    try {
      const missionsColumnSet = new pgp.helpers.ColumnSet(
        ["resource_id", "project_id", "position_id", "start_date", "end_date", "is_active"],
        {table: "missions"});
      const missionsValues = req.body;
      const missionsQuery = pgp.helpers.update(missionsValues, missionsColumnSet) + " WHERE id = $1";
      const posT = await db.result(missionsQuery, [req.params.mission_id]);
      if (posT.rowCount === 1) {
        res.status(200).send(new ApiResponse(true, "Mission updated successfully", [], 200));
      } else {
        throw new ErrorHandler(400, "Bad request");
      }
      next();

    } catch (err) {
      next(err);
    }
  }

}
