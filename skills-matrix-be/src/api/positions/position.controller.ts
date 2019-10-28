import { Request, Response } from "express";
import {db, pgp} from "../../db/db";

export default class PositionController {

  public getPositions = async (req: Request, res: Response): Promise<any> => {
    try {

      const validQueryParams = [ "project_id" ];

      let positions: any;
      if (typeof req.query.project_id !== "undefined") {
        positions = await db.any("SELECT * FROM positions WHERE project_id = $1", [ req.query.project_id ]);
      } else {
        positions = await db.any('SELECT positions.id, positions.project_id, p.name "project_name", positions.name "position_name", positions.description FROM positions JOIN projects p on positions.project_id = p.id;', []);
      }

      if (Object.keys(positions).length === 0) {
        return res.status(404).send({
          data: null,
          message: "Positions not found",
          success: false,
        });
      }

      res.status(200).send({
        data: positions,
        data_length: positions.length,
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

  public getPosition = async (req: Request, res: Response): Promise<any> => {
    try {

      const position = await db.one(
        "SELECT * FROM positions WHERE id = $1",
        [req.params.position_id]);

      if (Object.keys(position).length === 0 ) {
        return res.status(404).send({
          data: null,
          message: "Position not found",
          success: false,
        });
      }

      res.status(200).send({
        data: position,
        success: true,
      });

    } catch (err) {

      res.status(500).send({
        data: null,
        message: err,
        success: false,
      });

    }
  }

  public createPositions = async (req: Request, res: Response): Promise<any> => {
    try {

      // Create Positions
      const positionsColumnSet = new pgp.helpers.ColumnSet(["project_id", "name", "description"], {table: "positions"});
      const positionsValues = req.body;
      const positionsQuery = pgp.helpers.insert(positionsValues, positionsColumnSet) + " ON CONFLICT DO NOTHING RETURNING *";
      const positionsResult = await db.any(positionsQuery);

      res.status(201).send({
        data: positionsResult,
        message: "Position(s) successfully created",
        success: true,
      });

    } catch (err) {

      res.status(500).send({
        data: null,
        message: err,
        success: false,
      });

    }
  }

  public getPositionRequirements = async (req: Request, res: Response): Promise<any> => {
    try {

      const positionRequirements = await db.any(
        "SELECT * FROM position_requirements WHERE position_id = $1",
        [req.params.position_id]);

      if (Object.keys(positionRequirements).length === 0 ) {
        return res.status(404).send({
          data: null,
          message: "PositionRequirement not found",
          success: false,
        });
      }

      res.status(200).send({
        data: positionRequirements,
        success: true,
      });

    } catch (err) {

      res.status(500).send({
        data: null,
        message: err,
        success: false,
      });

    }
  }

}
