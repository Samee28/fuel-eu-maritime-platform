import "dotenv/config";
import { ComputeCBUseCase } from "./computeCBUseCase";
import { RoutePort } from "../ports/routePort";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

export class ComplianceService {
  private cbUseCase = new ComputeCBUseCase();
  private prisma: PrismaClient | null = null;

  constructor(private routePort: RoutePort) {}

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

  async computeCB(routeId: string) {
    const routes = await this.routePort.getAllRoutes();
    const route = routes.find(r => r.routeId === routeId);

    if (!route) throw new Error("Route not found");

    const result = this.cbUseCase.compute(route);

    // Save to DB (upsert to handle existing records)
    await this.getPrisma().shipCompliance.upsert({
      where: {
        shipId_year: {
          shipId: routeId,
          year: result.year,
        }
      },
      update: {
        cbValue: result.cb,
      },
      create: {
        shipId: routeId,
        year: result.year,
        cbValue: result.cb,
      }
    });

    return result;
  }
}
