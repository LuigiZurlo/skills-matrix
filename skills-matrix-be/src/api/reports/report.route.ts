import { Router } from "express";
import ReportComplianceController from "./report.compliance.controller";

const report: Router = Router();

const reportComplianceController = new ReportComplianceController();
report.get("/compliance", reportComplianceController.get);

export default report;
