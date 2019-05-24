import {Request, Response} from "express";
import Mission from "./mission.model";

export default class MissionController {

  public getAll = async (req: Request, res: Response): Promise<any> => {
    try {

      const missions = await Mission.find();

      if (!missions) {
        return res.status(404).send({
          success: false,
          message: "Missions not found",
          data: null
        });
      }

      res.status(200).send({
        success: true,
        data: missions
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });

    }
  };

  public addMission = async (req: Request, res: Response): Promise<any> => {
    try {

      const mission = new Mission({
        project: req.body.project,
        resource: req.body.resource,
        position: req.body.position,
        start_date: req.body.start_date,
        end_date: req.body.end_date
      });

      const newMission = await mission.save();

      res.status(201).send({
        success: true,
        message: "Mission successfully created",
        data: newMission
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
