import { Request, Response } from 'express';
import { db } from '../../db/db';

export default class ResourceController {

  public getAll = async (req: Request, res: Response): Promise<any> => {
    try {

      const resources = await db.any('SELECT * FROM resources', []);

      if (Object.keys(resources).length == 0) {
        return res.status(404).send({
          success: false,
          message: "Resources not found",
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

  public getResourceById = async (req: Request, res: Response): Promise<any> => {
    try {

      const resource = await db.one('SELECT * FROM resources WHERE id = $1', [req.params.resource_id]);
      const competencies = await db.any('SELECT c.id "competency_id", c.skill_id, s.display_name, c.level FROM competencies c, skills s WHERE s.id = c.skill_id AND c.id IN ( SELECT competency_id FROM resource_competencies WHERE resource_id = $1)', [req.params.resource_id]);
      const missions = await db.any('SELECT missions.id "mission_id", projects.name "project_name", positions.display_name "position_name", missions.is_active\n' +
        'FROM missions\n' +
        'INNER JOIN projects on projects.id = missions.project_id\n' +
        'INNER JOIN positions on positions.id = missions.position_id\n' +
        'WHERE missions.resource_id = $1', [req.params.resource_id]);

      if (Object.keys(resource).length == 0 ) {
        return res.status(404).send({
          success: false,
          message: 'Resource not found',
          data: null
        });
      }

      res.status(200).send({
        success: true,
        data: {
          resource,
          competencies,
          missions
        }
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err,
        data: null
      });

    }
  };

  public addResource = async (req: Request, res: Response): Promise<any> => {
    try {

      const resource = await db.one('INSERT INTO resources (first_name, last_name, employee_number) VALUES ($1, $2, $3) RETURNING *', [req.body.first_name, req.body.last_name, req.body.employee_number]);

      res.status(201).send({
        success: true,
        message: "Resource successfully created",
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
