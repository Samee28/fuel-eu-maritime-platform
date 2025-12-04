import { RoutePort } from "../ports/routePort";

export class RouteService {
  constructor(private routePort: RoutePort) {}

  async listRoutes() {
    return this.routePort.getAllRoutes();
  }

  async setBaselineRoute(routeId: string) {
    return this.routePort.setBaseline(routeId);
  }

  async getComparison() {
    return this.routePort.getComparisonRoutes();
  }
}
