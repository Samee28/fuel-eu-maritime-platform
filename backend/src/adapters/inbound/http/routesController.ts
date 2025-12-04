import { Request, Response } from 'express';
import { RouteService } from '../../../core/application/routeService';

export class RoutesController {
  constructor(private routeService: RouteService) {}

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const routes = await this.routeService.getAllRoutes();
      res.json(routes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch routes' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const route = await this.routeService.getRouteById(id);
      
      if (!route) {
        res.status(404).json({ error: 'Route not found' });
        return;
      }
      
      res.json(route);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch route' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const route = await this.routeService.createRoute(req.body);
      res.status(201).json(route);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create route' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const route = await this.routeService.updateRoute(id, req.body);
      
      if (!route) {
        res.status(404).json({ error: 'Route not found' });
        return;
      }
      
      res.json(route);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update route' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const success = await this.routeService.deleteRoute(id);
      
      if (!success) {
        res.status(404).json({ error: 'Route not found' });
        return;
      }
      
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete route' });
    }
  }
}
