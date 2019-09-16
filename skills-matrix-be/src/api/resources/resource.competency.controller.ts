import { Request, Response } from 'express';
import { db } from '../../db/db';

export default class ResourceCompetencyController {

  public getAllByResourceId = async (req: Request, res: Response): Promise<any> => {
    try {

      const resources = await db.any('SELECT c.id "competency_id", c.skill_id, s.display_name, c.level FROM competencies c, skills s\n' +
        'WHERE s.id = c.skill_id AND c.id IN ( SELECT competency_id FROM resource_competencies WHERE resource_id = $1)', [req.params.resource_id]);

      if (Object.keys(resources).length == 0) {
        return res.status(404).send({
          success: false,
          message: "ResourceCompetencies not found",
          data: null
        });
      }

      res.status(200).send({
        success: true,
        data_length: resources.length,
        data: resources
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });

    }
  };

  public addResourceCompetency = async (req: Request, res: Response): Promise<any> => {
    try {

      const resource = await db.one('INSERT INTO resource_competencies (resource_id, competency_id) VALUES ($1, $2) RETURNING *', [req.body.resource_id, req.body.competency_id]);

      res.status(201).send({
        success: true,
        message: "ResourceCompetency successfully created",
        data: resource
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
