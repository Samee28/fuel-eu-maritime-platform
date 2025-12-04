import { Request, Response } from "express";
import { RouteService } from "../../../core/application/routeService";
import { RouteRepository } from "../../outbound/postgres/routeRepository";

const service = new RouteService(new RouteRepository());

export const getRoutes = async (_req: Request, res: Response) => {
  const data = await service.listRoutes();
  res.json(data);
};

export const setBaseline = async (req: Request, res: Response) => {
  try {
    const routeId = req.params.id;
    await service.setBaselineRoute(routeId);
    res.json({ message: "Baseline route updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to set baseline route" });
  }
};

export const getComparison = async (_req: Request, res: Response) => {
  const data = await service.getComparison();
  res.json(data);
};
