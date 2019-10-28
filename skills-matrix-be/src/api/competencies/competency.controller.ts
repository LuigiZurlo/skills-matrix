import {Request, Response} from "express";
import {db} from "../../db/db";

export default class CompetencyController {

  public getCompetencies = async (req: Request, res: Response): Promise<any> => {
    try {

      const competencies = await db.any("SELECT * FROM competencies", []);

      if (Object.keys(competencies).length === 0) {
        return res.status(404).send({
          data: competencies,
          message: "Competencies not found",
          success: false,
        });
      }

      res.status(200).send({
        data: competencies,
        data_length: competencies.length,
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

  public getCompetency = async (req: Request, res: Response): Promise<any> => {
    try {

      const competencies = await db.any("SELECT * FROM competencies where id = $1", [req.params.competency_id]);

      if (Object.keys(competencies).length === 0) {
        return res.status(404).send({
          data: competencies,
          message: "Competency not found",
          success: false,
        });
      }

      res.status(200).send({
        data: competencies,
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

  public createCompetencies = async (req: Request, res: Response): Promise<any> => {
    try {

      const competencies = await db.one("INSERT INTO competencies (skill_id, level) " +
        "VALUES ($1, $2) " +
        "RETURNING *", [req.body.skill_id, req.body.level]);

      res.status(201).send({
        data: competencies,
        message: "Competency successfully created",
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

  public deleteCompetency = async (req: Request, res: Response): Promise<any> => {
    try {

      const competencies = await db.any("DELETE FROM competencies " +
        "WHERE id = $1 " +
        "RETURNING *", [req.params.competency_id]);

      res.status(200).send({
        data: competencies,
        message: "Competency successfully deleted",
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

  public deleteCompetencies = async (req: Request, res: Response): Promise<any> => {
    try {

      const competencies = await db.any("DELETE FROM competencies RETURNING *", []);

      res.status(200).send({
        data: competencies,
        message: "Competencies successfully deleted",
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
