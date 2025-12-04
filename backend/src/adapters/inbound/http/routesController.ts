import { Request, Response } from "express";
import { RouteService } from "../../../core/application/routeService";
import { RouteRepository } from "../../outbound/postgres/routeRepository";

const service = new RouteService(new RouteRepository());

export const getRoutes = async (_req: Request, res: Response) => {
  const data = await service.listRoutes();
  res.json(data);
};

export const setBaseline = async (req: Request, res: Response) => {
  await service.setBaselineRoute(req.params.id);
  res.json({ message: "Baseline route updated successfully" });
};

export const getComparison = async (_req: Request, res: Response) => {
  const data = await service.getComparison();
  res.json(data);
};
