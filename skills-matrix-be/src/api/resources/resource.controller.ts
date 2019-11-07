import {Request, Response} from "express";
import {ApiResponse} from "../../common/api.response.model";
import {ErrorHandler} from "../../common/Error";
import {db, pgp} from "../../db/db";

export default class ResourceController {

  public getResources = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const validQueryParams = ["resource_id"];

      let resources: any;
      if (typeof req.query.project_id !== "undefined") {
        resources = await db.any("SELECT * FROM resources WHERE id = $1", [req.query.resource_id]);
      } else {
        resources = await db.any("SELECT * FROM resources", []);
      }

      if (Object.keys(resources).length === 0) {
        throw new ErrorHandler(404, "Resources not found");
      }

      res.status(200).send(new ApiResponse(true, "Resources found", resources, 200));
      next();

    } catch (err) {
      next(err);
    }
  }

  public getResource = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const infos = await db.any("SELECT * FROM resources WHERE id = $1", [req.params.resource_id]);
      const competencies = await db.any('SELECT c.id "competency_id", c.skill_id, s.name, c.level FROM competencies c, skills s WHERE s.id = c.skill_id AND c.id IN (SELECT competency_id FROM resource_competencies WHERE resource_id = $1)', [req.params.resource_id]);
      const missions = await db.any('SELECT missions.id "mission_id", projects.name "project_name", positions.name "position_name", missions.is_active FROM missions INNER JOIN projects on projects.id = missions.project_id INNER JOIN positions on positions.id = missions.position_id WHERE missions.resource_id = $1', [req.params.resource_id]);

      if (infos.length === 0) {
        throw new ErrorHandler(404, "Resource not found");
      }

      res.status(200).send(new ApiResponse(true, "Resource found", {competencies, infos, missions}, 200));
      next();

    } catch (err) {
      next(err);
    }
  }

  public createResources = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const resourcesColumnSet = new pgp.helpers.ColumnSet(
        ["first_name", "last_name", "employee_number", "email"],
        {table: "resources"});
      const resourcesValues = req.body;
      const resourcesQuery = pgp.helpers.insert(resourcesValues, resourcesColumnSet) + " ON CONFLICT DO NOTHING RETURNING *";
      const resourcesResult = await db.any(resourcesQuery);

      res.status(201).send(new ApiResponse(true, "Resource(s) successfully created", resourcesResult, 201));
      next();

    } catch (err) {
      next(err);
    }
  }

  public updateResource = async (req: Request, res: Response, next: any): Promise<any> => {
    try {
      const resourcesColumnSet = new pgp.helpers.ColumnSet(
        ["first_name", "last_name", "employee_number", "email"],
        {table: "resources"});
      const resourcetsValues = req.body;
      const projectsQuery = pgp.helpers.update(resourcetsValues, resourcesColumnSet) + " WHERE id = $1";
      const proJ = await db.result(projectsQuery, [req.params.resource_id]);
      if (proJ.rowCount === 1) {
        res.status(200).send(new ApiResponse(true, "Resource updated successfully", [], 200));
      } else {
        throw new ErrorHandler();
      }
      next();
    } catch (err) {
      next(err);
    }
  }

  public deleteResource = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const resource = await db.any("DELETE FROM resources " +
        "WHERE id = $1 " +
        "RETURNING *", [req.params.resource_id]);

      res.status(200).send(new ApiResponse(true, "Resource successfully deleted", resource, 200));
      next();

    } catch (err) {
      next(err);
    }
  }

  public getResourceCompetencies = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const resources = await db.any(
        'SELECT c.id "competency_id", c.skill_id, s.name, c.level ' +
        "FROM competencies c, skills s\n" +
        "WHERE s.id = c.skill_id AND c.id " +
        "IN ( SELECT competency_id FROM resource_competencies WHERE resource_id = $1)", [req.params.resource_id]);

      if (Object.keys(resources).length === 0) {
        throw new ErrorHandler(404, "ResourceCompetencies not found");
      }

      res.status(200).send(new ApiResponse(true, "ResourceCompetencies found", resources , 200));
      next();

    } catch (err) {
      next(err);
    }
  }

  public createResourceCompetencies = async (req: Request, res: Response, next: any): Promise<any> => {
    try {
      if (Number(req.params.resource_id) !== req.body.resource_id) {
        throw new ErrorHandler(409, "Conflict: resource_ids differ");
      }

      const resourceCompetenciesColumnSet = new pgp.helpers.ColumnSet(
        ["resource_id", "competency_id", "assessed_on", "validation_date", "validator_id", "is_validated", "is_pending_validation"],
        {table: "resource_competencies"});
      const resourcesValues = req.body;
      const projectsQuery = pgp.helpers.insert(resourcesValues, resourceCompetenciesColumnSet) + " RETURNING *";
      const proJ = await db.any(projectsQuery);

      res.status(201).send(new ApiResponse(true, "ResourceCompetencies successfully created",
        proJ, 201));
      next();

    } catch (err) {
      next(err);
    }
  }

  public deleteResourceCompetencies = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const position = await db.any("DELETE FROM resource_competencies " +
        "WHERE resource_id = $1 " +
        "RETURNING *", [req.params.resource_id]);

      res.status(200).send(new ApiResponse(true, "ResourceCompetencies successfully deleted", position, 200));
      next();

    } catch (err) {
      next(err);
    }
  }

  public getResourceMissions = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const resourceMissions = await db.any("SELECT * FROM missions WHERE resource_id = $1", [req.params.resource_id]);

      if (resourceMissions.length === 0) {
        throw new ErrorHandler(404, "ResourceMissions not found");
      }

      res.status(200).send(new ApiResponse(true, "ResourceMissions found", resourceMissions, 200));
      next();
    } catch (err) {
      next(err);
    }
  }

  public createResourceMissions = async (req: Request, res: Response, next: any): Promise<any> => {
    try {
      if (Number(req.params.resource_id) !== req.body.resource_id) {
        throw new ErrorHandler(409, "Conflict: resource_ids differ");
      }

      const resourceMissionsColumnSet = new pgp.helpers.ColumnSet(
        ["resource_id", "project_id", "position_id", "start_date", "end_date", "is_active"],
        {table: "missions"});
      const resourcesValues = req.body;
      const projectsQuery = pgp.helpers.insert(resourcesValues, resourceMissionsColumnSet) + " RETURNING *";
      const proJ = await db.any(projectsQuery);

      res.status(201).send(new ApiResponse(true, "ResourceMissions successfully created",
        proJ, 201));
      next();

    } catch (err) {
      next(err);
    }
  }

}
