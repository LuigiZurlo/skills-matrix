import { Request, Response } from 'express';
import { db } from '../../db/db';

export default class CompetencyController {

  public getAll = async (req: Request, res: Response): Promise<any> => {
    try {

      const competencies = await db.any('SELECT * FROM competencies', []);

      if (Object.keys(competencies).length == 0) {
        return res.status(404).send({
          success: false,
          message: 'Competencies not found',
          data: competencies
        });
      }

      res.status(200).send({
        success: true,
        data_length: competencies.length,
        data: competencies
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err,
        data: null
      });

    }
  };

  public getCompetencyById = async (req: Request, res: Response): Promise<any> => {
    try {

      const competencies = await db.any('SELECT * FROM competencies where id = $1', [req.params.competency_id]);

      if (Object.keys(competencies).length == 0) {
        return res.status(404).send({
          success: false,
          message: 'Competency not found',
          data: competencies
        });
      }

      res.status(200).send({
        success: true,
        data: competencies
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err,
        data: null
      });

    }
  };

  public addCompetency = async (req: Request, res: Response): Promise<any> => {
    try {

      const competencies = await db.one('INSERT INTO competencies (skill_id, level) VALUES ($1, $2) RETURNING *', [req.body.skill_id, req.body.level]);

      res.status(201).send({
        success: true,
        message: 'Competency successfully created',
        data: competencies
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err,
        data: null
      });

    }
  };

  public removeCompetency = async (req: Request, res: Response): Promise<any> => {
    try {

      const competencies = await db.any('DELETE FROM competencies WHERE id = $1 RETURNING *', [req.params.competency_id]);

      res.status(200).send({
        success: true,
        message: "Competency successfully deleted",
        data: competencies
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err,
        data: null
      });

    }
  };

  public removeAll = async (req: Request, res: Response): Promise<any> => {
    try {

      const competencies = await db.any('DELETE FROM competencies RETURNING *', []);

      res.status(200).send({
        success: true,
        message: "Competencies successfully deleted",
        data: competencies
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
