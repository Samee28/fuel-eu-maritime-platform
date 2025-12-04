import { Route } from '../domain/route';

export interface RoutePort {
  findAll(): Promise<Route[]>;
  findById(id: number): Promise<Route | null>;
  create(route: Omit<Route, 'id'>): Promise<Route>;
  update(id: number, route: Partial<Route>): Promise<Route | null>;
  delete(id: number): Promise<boolean>;
}
