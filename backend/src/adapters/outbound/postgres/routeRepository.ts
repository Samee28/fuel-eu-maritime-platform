import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { Route } from '../../../core/domain/route';
import { RoutePort } from '../../../core/ports/routePort';

export class RouteRepository implements RoutePort {
  private prisma: PrismaClient;

  constructor() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    this.prisma = new PrismaClient({ adapter });
  }

  async findAll(): Promise<Route[]> {
    return this.prisma.route.findMany();
  }

  async findById(id: number): Promise<Route | null> {
    return this.prisma.route.findUnique({ where: { id } });
  }

  async create(route: Omit<Route, 'id'>): Promise<Route> {
    return this.prisma.route.create({ data: route });
  }

  async update(id: number, route: Partial<Route>): Promise<Route | null> {
    try {
      return await this.prisma.route.update({
        where: { id },
        data: route,
      });
    } catch {
      return null;
    }
  }

  async delete(id: number): Promise<boolean> {
    try {
      await this.prisma.route.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }
}
