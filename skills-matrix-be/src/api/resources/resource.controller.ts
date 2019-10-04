import { Request, Response } from 'express';
import { db, pgp } from '../../db/db';

export default class ResourceController {

  public getResources = async (req: Request, res: Response): Promise<any> => {
    try {

      const validQueryParams = [ 'project_id' ];

      let resources: any;
      if(typeof req.query.project_id != 'undefined'){
        resources = await db.any('SELECT * FROM resources WHERE project_id = $1', [ req.query.project_id ]);
      }
      else {
        resources = await db.any('SELECT * FROM resources', []);
      }

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

  public getResource = async (req: Request, res: Response): Promise<any> => {
    try {

      const infos = await db.one('SELECT * FROM resources WHERE id = $1', [req.params.resource_id]);
      const competencies = await db.any('SELECT c.id "competency_id", c.skill_id, s.display_name, c.level FROM competencies c, skills s WHERE s.id = c.skill_id AND c.id IN (SELECT competency_id FROM resource_competencies WHERE resource_id = $1)', [req.params.resource_id]);
      const missions = await db.any('SELECT missions.id "mission_id", projects.name "project_name", positions.display_name "position_name", missions.is_active FROM missions INNER JOIN projects on projects.id = missions.project_id INNER JOIN positions on positions.id = missions.position_id WHERE missions.resource_id = $1', [req.params.resource_id]);

      if (Object.keys(infos).length == 0 ) {
        return res.status(404).send({
          success: false,
          message: 'Resource not found',
          data: null
        });
      }

      res.status(200).send({
        success: true,
        data: {
          infos,
          competencies,
          missions
        }
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });

    }
  };

  public createResources = async (req: Request, res: Response): Promise<any> => {
    try {

      const resourcesColumnSet = new pgp.helpers.ColumnSet(['first_name', 'last_name', 'employee_number', 'email'], {table: 'resources'});
      const resourcesValues = req.body;
      const resourcesQuery = pgp.helpers.insert(resourcesValues, resourcesColumnSet) + ' ON CONFLICT DO NOTHING RETURNING *';
      const resourcesResult = await db.any(resourcesQuery);

      res.status(201).send({
        success: true,
        message: "Resource(s) successfully created",
        data: resourcesResult
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });

    }
  };

  public getResourceCompetencies = async (req: Request, res: Response): Promise<any> => {
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

}
