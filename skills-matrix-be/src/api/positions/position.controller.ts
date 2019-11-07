import {Request, Response} from "express";
import {ApiResponse} from "../../common/api.response.model";
import {ErrorHandler} from "../../common/Error";
import {db, pgp} from "../../db/db";

export default class PositionController {

  public getPositions = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const validQueryParams = ["project_id"];

      let positions: any;
      if (typeof req.query.project_id !== "undefined") {
        positions = await db.any("SELECT * FROM positions WHERE project_id = $1", [req.query.project_id]);
      } else {
        positions = await db.any('SELECT positions.id, positions.project_id, p.name "project_name", positions.name "position_name", positions.description FROM positions JOIN projects p on positions.project_id = p.id;', []);
      }

      if (Object.keys(positions).length === 0) {
        throw new ErrorHandler(404, "Positions not found");
      }

      res.status(200).send(new ApiResponse(true, "Positions found", positions, 200));
      next();

    } catch (err) {
      next(err);
    }
  }

  public getPosition = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const position = await db.one(
        "SELECT * FROM positions WHERE id = $1",
        [req.params.position_id]);

      if (Object.keys(position).length === 0) {
        throw new ErrorHandler(404, "Position not found");
      }

      res.status(200).send(new ApiResponse(true, "Position found", position, 200));
      next();

    } catch (err) {
      next(err);
    }
  }

  public createPositions = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      // Create Positions
      const positionsColumnSet = new pgp.helpers.ColumnSet(["project_id", "name", "description"], {table: "positions"});
      const positionsValues = req.body;
      const positionsQuery = pgp.helpers.insert(positionsValues, positionsColumnSet) + " ON CONFLICT DO NOTHING RETURNING *";
      const positionsResult = await db.any(positionsQuery);

      res.status(201).send(new ApiResponse(true, "Position successfully created", positionsResult, 201));
      next();

    } catch (err) {
      next(err);
    }
  }

  public getPositionRequirements = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const positionRequirements = await db.any(
        "SELECT * FROM position_requirements WHERE position_id = $1",
        [req.params.position_id]);

      if (Object.keys(positionRequirements).length === 0) {
        throw new ErrorHandler(404, "PositionRequirement not found");
      }

      res.status(200).send(new ApiResponse(true, "PositionRequirement found", positionRequirements, 200));
      next();

    } catch (err) {
      next(err);
    }
  }

  public createPositionRequirement = async (req: Request, res: Response, next: any): Promise<any> => {
    try {
      if (Number(req.params.position_id) !== req.body.position_id) {
        throw new ErrorHandler(409, "Conflict: position_ids differ");
      }
      const positionRequirement = await db.one("INSERT INTO position_requirements (position_id, competency_id) " +
        "VALUES ($1, $2) " +
        "RETURNING *", [req.body.position_id, req.body.competency_id]);

      res.status(201).send(new ApiResponse(true, "PositionRequirement successfully created",
        positionRequirement, 201));
      next();

    } catch (err) {
      next(err);
    }
  }

  public deletePositionRequirement = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const posReq = await db.any("DELETE FROM position_requirements" +
        " WHERE position_id = $1" +
        " RETURNING *", [req.params.position_id]);

      res.status(200).send(new ApiResponse(true, "PositionRequirement successfully deleted", posReq, 200));
      next();

    } catch (err) {
      next(err);
    }
  }

  public getPositionCompetencyGroups = async (req: Request, res: Response, next: any): Promise<any> => {
    try {
      const positionCompetencyGroups = await db.any("SELECT * FROM competency_groups WHERE position_id = $1",
        [req.params.position_id]);

      if (Object.keys(positionCompetencyGroups).length === 0) {
        throw new ErrorHandler(404, "Position competency group not found");
      }

      res.status(200).send(new ApiResponse(true, "Position competency group found", positionCompetencyGroups, 200));
      next();

    } catch (err) {
      next(err);
    }
  }

  public updatePositions = async (req: Request, res: Response, next: any): Promise<any> => {
    try {
      const positionsColumnSet = new pgp.helpers.ColumnSet(
        ["project_id", "name", "description"],
        {table: "positions"});
      const positionsValues = req.body;
      const positionsQuery = pgp.helpers.update(positionsValues, positionsColumnSet) + " WHERE id = $1";
      const posT = await db.result(positionsQuery, [req.params.position_id]);

      if (posT.rowCount === 1) {
        res.status(200).send(new ApiResponse(true, "Position updated successfully", [], 200));
      } else {
        throw new ErrorHandler(400, "Bad request");
      }
      next();

    } catch (err) {
      next(err);
    }
  }
}
