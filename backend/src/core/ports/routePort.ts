import { Route } from "../domain/route";

export interface RoutePort {
  getAllRoutes(): Promise<Route[]>;
  setBaseline(routeId: string): Promise<void>;
  getComparisonRoutes(): Promise<{ baseline: Route; others: Route[] }>;
}
