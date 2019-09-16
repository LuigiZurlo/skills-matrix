import { Request, Response } from 'express';
import { db } from '../../db/db';

export default class PositionController {

  public getAll = async (req: Request, res: Response): Promise<any> => {
    try {

      const positions = await db.any('SELECT * FROM positions', []);

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

  public getPositionById = async (req: Request, res: Response): Promise<any> => {
    try {

      const position = await db.any('SELECT * FROM positions WHERE id = $1', [req.params.position_id]);

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

  public addPosition = async (req: Request, res: Response): Promise<any> => {
    try {

      const position = await db.one('INSERT INTO positions (project_id, name, display_name, description) VALUES ($1, $2, $3, $4) RETURNING *', [req.body.project_id, req.body.name, req.body.display_name, req.body.description]);

      res.status(201).send({
        success: true,
        message: "Position successfully created",
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

}
