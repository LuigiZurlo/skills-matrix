import { Request, Response } from "express";
import { db } from '../../db/db';

export default class ReportComplianceController {

  public get = async (req: Request, res: Response): Promise<any> => {
    try {

      const params = req.query;
      console.log(params);

      res.status(200).send({
        success: true,
        message: "Report successfully created",
        data: params
      });

    } catch (err) {

      res.status(500).send({
        success: false,
        message: err,
        data: null
      });

    }
  }
}
