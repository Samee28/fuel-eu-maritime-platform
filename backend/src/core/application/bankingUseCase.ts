export class BankingUseCase {
  validateBank(cb: number) {
    if (cb <= 0) throw new Error("Cannot bank negative or zero CB");
  }

  validateApply(applyAmount: number, bankedAvailable: number) {
    if (applyAmount > bankedAvailable) {
      throw new Error("Insufficient banked CB");
    }
  }
}
