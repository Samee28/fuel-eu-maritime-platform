import { Request, Response } from "express";
import { BankingService } from "../../../core/application/bankingService";

const service = new BankingService();

export const getBankRecords = async (req: Request, res: Response) => {
  const shipId = req.query.shipId as string;
  const records = await service.getRecords(shipId);
  res.json(records);
};

export const bankCB = async (req: Request, res: Response) => {
  const { shipId, year, cb } = req.body;

  const result = await service.bankSurplus(shipId, year, cb);
  res.json({ message: "CB banked", result });
};

export const applyBankedCB = async (req: Request, res: Response) => {
  const { shipId, year, amount } = req.body;

  const result = await service.applyBank(shipId, year, amount);
  res.json(result);
};
