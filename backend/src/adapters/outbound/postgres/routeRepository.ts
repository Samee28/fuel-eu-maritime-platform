import { PrismaClient } from "@prisma/client";
import { RoutePort } from "../../../core/ports/routePort";

export class RouteRepository implements RoutePort {
  private prisma = new PrismaClient();

  async getAllRoutes() {
    return this.prisma.route.findMany();
  }

  async setBaseline(routeId: string) {
    await this.prisma.route.updateMany({
      data: { isBaseline: false },
    });

    await this.prisma.route.updateMany({
      where: { routeId },
      data: { isBaseline: true },
    });
  }

  async getComparisonRoutes() {
    const baseline = await this.prisma.route.findFirst({
      where: { isBaseline: true },
    });

    if (!baseline) throw new Error("No baseline route set.");

    const others = await this.prisma.route.findMany({
      where: { isBaseline: false },
    });

    return { baseline, others };
  }
}
