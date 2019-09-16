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

      const resource = await db.any('SELECT * FROM resources WHERE id = $1', [req.params.resource_id]);

      if (Object.keys(resource).length == 0 ) {
        return res.status(404).send({
          success: false,
          message: 'Resource not found',
          data: null
        });
      }

      res.status(200).send({
        success: true,
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
