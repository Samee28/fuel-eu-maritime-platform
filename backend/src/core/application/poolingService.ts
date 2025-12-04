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
    // Validate input
    if (!members || members.length === 0) {
      throw new Error("Pool must have at least one member");
    }

    // Validate each member has required fields
    for (const member of members) {
      if (!member.shipId || member.cb === undefined) {
        throw new Error(`Invalid member data: ${JSON.stringify(member)}`);
      }
    }

    const result = this.useCase.createPool(members);

    // Ensure result is valid before creating pool
    if (!result || result.length === 0) {
      throw new Error("Pool calculation returned no results");
    }

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

    // Calculate pool sum from cb_after values
    const poolSum = pool.members.reduce((sum, m) => sum + m.cb_after, 0);

    return {
      pool: pool.members.map(m => ({
        shipId: m.shipId,
        cb_before: m.cb_before,
        cb_after: m.cb_after,
      })),
      poolSum,
    };
  }
}
