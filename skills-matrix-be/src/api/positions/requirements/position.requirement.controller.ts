import { Request, Response } from 'express';
import { db } from '../../../db/db';

export default class PositionRequirementController {

  public getPositionRequirementByPositionId = async (req: Request, res: Response): Promise<any> => {
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

  public addPositionRequirement = async (req: Request, res: Response): Promise<any> => {
    try {

      const position_requirements = await db.one('INSERT INTO position_requirements (position_id, competency_id) VALUES ($1, $2) RETURNING *', [req.body.position_id, req.body.competency_id]);

      res.status(201).send({
        success: true,
        message: "PositionRequirement successfully created",
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
