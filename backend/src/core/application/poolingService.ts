import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PoolingUseCase } from "./poolingUseCase";

export class PoolingService {
  private prisma: PrismaClient | null = null;
  private useCase = new PoolingUseCase();

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

  async createPool(year: number, members: { shipId: string; cb: number }[]) {
    const result = this.useCase.createPool(members);

    const pool = await this.getPrisma().pool.create({
      data: {
        year,
        members: {
          create: result.map(m => ({
            shipId: m.shipId,
            cb_before: m.cb_before,
            cb_after: m.cb_after,
          })),
        },
      },
      include: { members: true },
    });

    return pool;
  }
}
