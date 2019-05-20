import { Request, Response } from 'express';
import Resource from './resource.model';

export default class ResourceController {

  public getAll = async (req: Request, res: Response): Promise<any> => {
    try {

      const resources = await Resource.find().populate({
        path: 'competencies',
        populate: {
          path: 'skill',
          model: 'Skill'
        }
      });

      if (!resources) {
        return res.status(404).send({
          success: false,
          message: 'Resources not found',
          data: null
        });
      }

      res.status(200).send({
        success: true,
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

  public addResource = async (req: Request, res: Response): Promise<any> => {
    try {

      const resource = new Resource({
        name: req.body.name,
        employee_id: req.body.employee_id,
        competencies: req.body.competencies
      });

      const newResource = await resource.save();

      res.status(201).send({
        success: true,
        message: 'Resource successfully created',
        data: newResource
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });

    }
  };

  public updateResource = async (req: Request, res: Response): Promise<any> => {
    try {

      let resourceUpdated = await Resource.findByIdAndUpdate(req.params.id,
        {
          $set: {
            name: req.body.name,
            employee_id: req.body.employee_id
          },
          $addToSet: {
            competencies: {
              $each: req.body.competencies
            }
          }
        },
        {new: true}
      );

      if (!resourceUpdated) {
        return res.status(404).send({
          success: false,
          message: 'Resource to update not found!',
          data: null
        });
      }

      res.status(200).send({
        success: true,
        message: 'Resource successfully updated.',
        data: resourceUpdated
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
