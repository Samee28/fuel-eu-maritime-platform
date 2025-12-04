import { Request, Response } from "express";
import { PoolingService } from "../../../core/application/poolingService";

const poolingService = new PoolingService();

export const createPool = async (req: Request, res: Response) => {
  try {
    const { year, members } = req.body;

    const result = await poolingService.createPool(year, members);

    res.json(result);
  } catch (error: any) {
    console.error("Pooling error:", error);
    res.status(500).json({ error: error.message });
  }
};
