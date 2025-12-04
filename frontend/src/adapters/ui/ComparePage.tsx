export default function ComparePage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Route Comparison</h2>
        <p className="text-slate-500 mt-1">Compare GHG intensity against baseline and target</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="card">
          <div className="text-sm text-slate-500 mb-1">Target Intensity (2025)</div>
          <div className="text-2xl font-bold text-blue-600">89.34 gCO₂e/MJ</div>
          <div className="text-xs text-slate-400 mt-1">2% reduction from 91.16</div>
        </div>
        <div className="card">
          <div className="text-sm text-slate-500 mb-1">Baseline Route</div>
          <div className="text-2xl font-bold text-slate-900">R001</div>
          <div className="text-xs text-slate-400 mt-1">91.0 gCO₂e/MJ</div>
        </div>
        <div className="card">
          <div className="text-sm text-slate-500 mb-1">Compliant Routes</div>
          <div className="text-2xl font-bold text-green-600">3 of 5</div>
          <div className="text-xs text-slate-400 mt-1">60% compliance rate</div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="card mb-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">GHG Intensity Comparison</h3>
        <div className="h-64 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center">
          <div className="text-center text-slate-400">
            <div className="text-4xl mb-2">📊</div>
            <p>Chart visualization will be displayed here</p>
            <p className="text-sm mt-1">Install recharts library to enable</p>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="card">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Detailed Comparison</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Route ID</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">GHG Intensity</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">vs Baseline</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">vs Target</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm font-medium text-slate-900">R001 (Baseline)</td>
                <td className="px-4 py-3 text-sm text-right font-medium">91.0</td>
                <td className="px-4 py-3 text-sm text-right">-</td>
                <td className="px-4 py-3 text-sm text-right text-red-600">+1.9%</td>
                <td className="px-4 py-3 text-center">
                  <span className="badge-danger">❌ Non-compliant</span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm font-medium text-slate-900">R002</td>
                <td className="px-4 py-3 text-sm text-right font-medium">88.0</td>
                <td className="px-4 py-3 text-sm text-right text-green-600">-3.3%</td>
                <td className="px-4 py-3 text-sm text-right text-green-600">-1.5%</td>
                <td className="px-4 py-3 text-center">
                  <span className="badge-success">✅ Compliant</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
