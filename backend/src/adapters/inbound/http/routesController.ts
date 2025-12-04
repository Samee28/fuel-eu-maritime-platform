import { Request, Response } from "express";
import { RouteRepository } from "../../outbound/postgres/routeRepository";
import { CompareUseCase } from "../../../core/application/compareUseCase";

const repo = new RouteRepository();
const compareUseCase = new CompareUseCase();

export const getRoutes = async (_req: Request, res: Response) => {
  const routes = await repo.getAllRoutes();
  res.json(routes);
};

export const setBaseline = async (req: Request, res: Response) => {
  try {
    const routeId = req.params.id;
    await repo.setBaseline(routeId);
    res.json({ message: "Baseline set" });
  } catch (error) {
    res.status(500).json({ error: "Failed to set baseline route" });
  }
};

export const getComparison = async (_req: Request, res: Response) => {
  try {
    const { baseline, others } = await repo.getComparisonRoutes();
    const comparison = compareUseCase.execute(baseline, others);
    res.json({ baseline, comparison });
  } catch (error) {
    res.status(500).json({ error: "Failed to get comparison" });
  }
};
