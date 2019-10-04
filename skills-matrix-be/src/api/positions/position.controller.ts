import { Request, Response } from 'express';
import {db, pgp} from '../../db/db';

export default class PositionController {

  public getPositions = async (req: Request, res: Response): Promise<any> => {
    try {

      const validQueryParams = [ 'project_id' ];

      let positions: any;
      if(typeof req.query.project_id != 'undefined'){
        positions = await db.any('SELECT * FROM positions WHERE project_id = $1', [ req.query.project_id ]);
      }
      else {
        positions = await db.any('SELECT * FROM positions', []);
      }

      if (Object.keys(positions).length == 0) {
        return res.status(404).send({
          success: false,
          message: "Positions not found",
          data: null
        });
      }

      res.status(200).send({
        success: true,
        data_length: positions.length,
        data: positions
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });

    }
  };

  public getPosition = async (req: Request, res: Response): Promise<any> => {
    try {

      const position = await db.one('SELECT * FROM positions WHERE id = $1', [req.params.position_id]);

      if (Object.keys(position).length == 0 ) {
        return res.status(404).send({
          success: false,
          message: 'Position not found',
          data: null
        });
      }

      res.status(200).send({
        success: true,
        data: position
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err,
        data: null
      });

    }
  };

  public createPositions = async (req: Request, res: Response): Promise<any> => {
    try {

      // Create Positions
      const positionsColumnSet = new pgp.helpers.ColumnSet(['project_id', 'name', 'description'], {table: 'positions'});
      const positionsValues = req.body;
      const positionsQuery = pgp.helpers.insert(positionsValues, positionsColumnSet) + ' ON CONFLICT DO NOTHING RETURNING *';
      const positionsResult = await db.any(positionsQuery);

      res.status(201).send({
        success: true,
        message: "Position(s) successfully created",
        data: positionsResult
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err,
        data: null
      });

    }
  };

  public getPositionRequirements = async (req: Request, res: Response): Promise<any> => {
    try {

      const position_requirements = await db.any('SELECT * FROM position_requirements WHERE position_id = $1', [req.params.position_id]);

      if (Object.keys(position_requirements).length == 0 ) {
        return res.status(404).send({
          success: false,
          message: 'PositionRequirement not found',
          data: null
        });
      }

      res.status(200).send({
        success: true,
        data: position_requirements
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err,
        data: null
      });

    }
  };

}
