export class PoolingUseCase {
  createPool(members: { shipId: string; cb: number }[]) {
    // Total CB must be >= 0
    const total = members.reduce((s, m) => s + m.cb, 0);
    if (total < 0) throw new Error("Pool total cannot be negative");

    // Sort by CB descending (surplus first)
    const sorted = [...members].sort((a, b) => b.cb - a.cb);

    const result = sorted.map(m => ({
      shipId: m.shipId,
      cb_before: m.cb,
      cb_after: m.cb,
    }));

    // Greedy allocation
    for (let i = 0; i < result.length; i++) {
      for (let j = result.length - 1; j > i; j--) {
        // Ship i gives to ship j if i has surplus and j has deficit
        const donor = result[i];
        const receiver = result[j];

        if (donor.cb_after <= 0) break;
        if (receiver.cb_after >= 0) continue;

        const needed = Math.abs(receiver.cb_after);
        const give = Math.min(donor.cb_after, needed);

        donor.cb_after -= give;
        receiver.cb_after += give;
      }
    }

    return result;
  }
}
