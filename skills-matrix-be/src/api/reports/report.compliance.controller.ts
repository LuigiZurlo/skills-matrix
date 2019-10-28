import { Request, Response } from "express";
import { db } from "../../db/db";

export default class ReportComplianceController {

  public get = async (req: Request, res: Response): Promise<any> => {
    try {

      const params = req.query;
      console.log(params);

      res.status(200).send({
        data: params,
        message: "Report successfully created",
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
