export class ComputeCBUseCase {
  private TARGET = 89.3368; // gCO₂e/MJ
  private ENERGY_FACTOR = 41000; // MJ per ton

  compute(route: any) {
    const energy = route.fuelConsumption * this.ENERGY_FACTOR;

    const cb = (this.TARGET - route.ghgIntensity) * energy;

    return {
      routeId: route.routeId,
      year: route.year,
      energy,
      cb,
      status: cb > 0 ? "surplus" : cb < 0 ? "deficit" : "neutral"
    };
  }
}
