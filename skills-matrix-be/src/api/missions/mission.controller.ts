import { Request, Response } from 'express';
import { db } from '../../db/db';

export default class MissionController {

  public getMissions = async (req: Request, res: Response): Promise<any> => {
    try {

      const missions = await db.any('SELECT * FROM missions', []);

      if (Object.keys(missions).length == 0) {
        return res.status(404).send({
          success: false,
          message: 'Missions not found',
          data: missions
        });
      }

      res.status(200).send({
        success: true,
        data_length: missions.length,
        data: missions
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err,
        data: null
      });

    }
  };

  public getMission = async (req: Request, res: Response): Promise<any> => {
    try {

      const missions = await db.any('SELECT * FROM missions where id = $1', [req.params.mission_id]);

      if (Object.keys(missions).length == 0) {
        return res.status(404).send({
          success: false,
          message: 'Mission not found',
          data: missions
        });
      }

      res.status(200).send({
        success: true,
        data: missions
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err,
        data: null
      });

    }
  };

  public createMissions = async (req: Request, res: Response): Promise<any> => {
    try {

      const missions = await db.one('INSERT INTO missions (resource_id, project_id, position_id, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING *', [req.body.resource_id, req.body.project_id, req.body.position_id, req.body.start_date, req.body.end_date]);

      res.status(201).send({
        success: true,
        message: 'Mission successfully created',
        data: missions
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err,
        data: null
      });

    }
  };

  public deleteMission = async (req: Request, res: Response): Promise<any> => {
    try {

      const missions = await db.any('DELETE FROM missions WHERE id = $1 RETURNING *', [req.params.mission_id]);

      res.status(200).send({
        success: true,
        message: "Mission successfully deleted",
        data: missions
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err,
        data: null
      });

    }
  };

  public deleteMissions = async (req: Request, res: Response): Promise<any> => {
    try {

      const missions = await db.any('DELETE FROM missions RETURNING *', []);

      res.status(200).send({
        success: true,
        message: "Missions successfully deleted",
        data: missions
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
