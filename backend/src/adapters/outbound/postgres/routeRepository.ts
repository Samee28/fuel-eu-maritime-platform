import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { RoutePort } from "../../../core/ports/routePort";

export class RouteRepository implements RoutePort {
  private prisma: PrismaClient | null = null;

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

  async getAllRoutes() {
    return this.getPrisma().route.findMany();
  }

  async setBaseline(routeId: string) {
    await this.getPrisma().route.updateMany({
      data: { isBaseline: false },
    });

    await this.getPrisma().route.updateMany({
      where: { routeId },
      data: { isBaseline: true },
    });
  }

  async getComparisonRoutes() {
    const baseline = await this.getPrisma().route.findFirst({
      where: { isBaseline: true },
    });

    if (!baseline) throw new Error("No baseline route set.");

    const others = await this.getPrisma().route.findMany({
      where: { isBaseline: false },
    });

    return { baseline, others };
  }
}
