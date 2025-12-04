export interface ComparisonResult {
  routeId: string;
  baselineIntensity: number;
  comparisonIntensity: number;
  percentDiff: number;
  compliant: boolean;
}

export class CompareUseCase {
  private TARGET = 89.3368;

  execute(baseline: any, others: any[]): ComparisonResult[] {
    return others.map(route => {
      const percentDiff =
        ((route.ghgIntensity / baseline.ghgIntensity) - 1) * 100;

      const compliant = route.ghgIntensity <= this.TARGET;

      return {
        routeId: route.routeId,
        baselineIntensity: baseline.ghgIntensity,
        comparisonIntensity: route.ghgIntensity,
        percentDiff,
        compliant,
      };
    });
  }
}
