import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { BankingUseCase } from "./bankingUseCase";

export class BankingService {
  private prisma: PrismaClient | null = null;
  private useCase = new BankingUseCase();

  private getPrisma(): PrismaClient {
    if (!this.prisma) {
      const databaseUrl = process.env.DATABASE_URL;
      if (!databaseUrl) {
        throw new Error("DATABASE_URL environment variable is not set");
      }
      const pool = new Pool({ connectionString: databaseUrl });
      const adapter = new PrismaPg(pool);
      this.prisma = new PrismaClient({ adapter });
    }
    return this.prisma;
  }

  async getRecords(shipId: string) {
    return this.getPrisma().bankEntry.findMany({
      where: { shipId },
      orderBy: { createdAt: "desc" },
    });
  }

  async bankSurplus(shipId: string, year: number, cb: number) {
    this.useCase.validateBank(cb);

    return this.getPrisma().bankEntry.create({
      data: { shipId, year, amount: cb },
    });
  }

  async applyBank(shipId: string, year: number, applyAmount: number) {
    const records = await this.getRecords(shipId);
    const bankedAvailable = records.reduce((sum, r) => sum + r.amount, 0);

    this.useCase.validateApply(applyAmount, bankedAvailable);

    return {
      cb_before: bankedAvailable,
      applied: applyAmount,
      cb_after: bankedAvailable - applyAmount,
    };
  }
}
