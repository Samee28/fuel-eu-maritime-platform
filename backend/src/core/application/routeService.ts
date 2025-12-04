import { Route } from '../domain/route';
import { RoutePort } from '../ports/routePort';

export class RouteService {
  constructor(private routeRepository: RoutePort) {}

  async getAllRoutes(): Promise<Route[]> {
    return this.routeRepository.findAll();
  }

  async getRouteById(id: number): Promise<Route | null> {
    return this.routeRepository.findById(id);
  }

  async createRoute(route: Omit<Route, 'id'>): Promise<Route> {
    return this.routeRepository.create(route);
  }

  async updateRoute(id: number, route: Partial<Route>): Promise<Route | null> {
    return this.routeRepository.update(id, route);
  }

  async deleteRoute(id: number): Promise<boolean> {
    return this.routeRepository.delete(id);
  }
}
