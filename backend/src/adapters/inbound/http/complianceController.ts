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

export const getAdjustedCB = async (req: Request, res: Response) => {
  try {
    const shipId = req.query.shipId as string;
    const year = parseInt(req.query.year as string);

    if (!shipId || !year) {
      return res.status(400).json({ error: "shipId and year are required" });
    }

    const result = await complianceService.getAdjustedCB(shipId, year);
    res.json(result);
  } catch (error: any) {
    console.error("Adjusted CB error:", error);
    res.status(500).json({ error: error.message });
  }
};
