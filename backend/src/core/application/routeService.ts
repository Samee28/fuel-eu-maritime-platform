import { RoutePort } from "../ports/routePort";
import { CompareUseCase } from "./compareUseCase";

export class RouteService {
  private compareUseCase = new CompareUseCase();

  constructor(private routePort: RoutePort) {}

  async listRoutes() {
    return this.routePort.getAllRoutes();
  }

  async setBaselineRoute(routeId: string) {
    return this.routePort.setBaseline(routeId);
  }

  async getComparison() {
    const { baseline, others } = await this.routePort.getComparisonRoutes();
    return this.compareUseCase.execute(baseline, others);
  }
}
