import { Request, Response } from "express";
import { ComplianceService } from "../../../core/application/complianceService";
import { RouteRepository } from "../../outbound/postgres/routeRepository";

const complianceService = new ComplianceService(new RouteRepository());

export const getCB = async (req: Request, res: Response) => {
  const routeId = req.query.routeId as string;

  if (!routeId) {
    return res.status(400).json({ error: "routeId is required" });
  }

  const result = await complianceService.computeCB(routeId);
  res.json(result);
};
