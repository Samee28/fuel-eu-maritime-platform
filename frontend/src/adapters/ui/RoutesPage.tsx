export default function RoutesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Routes Management</h2>
          <p className="text-slate-500 mt-1">View and manage vessel routes with compliance data</p>
        </div>
        <button className="btn">
          <span className="mr-2">+</span>
          Add Route
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div>
          <label className="label">Vessel Type</label>
          <select className="input">
            <option>All Types</option>
            <option>Container</option>
            <option>Tanker</option>
            <option>BulkCarrier</option>
          </select>
        </div>
        <div>
          <label className="label">Fuel Type</label>
          <select className="input">
            <option>All Fuels</option>
            <option>HFO</option>
            <option>LNG</option>
            <option>MGO</option>
          </select>
        </div>
        <div>
          <label className="label">Year</label>
          <select className="input">
            <option>All Years</option>
            <option>2024</option>
            <option>2025</option>
          </select>
        </div>
        <div className="flex items-end">
          <button className="btn-secondary w-full">Apply Filters</button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Route ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Vessel Type</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Fuel Type</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Year</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">GHG Intensity</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Distance (km)</th>
              <th className="px-4 py-3 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-3 text-sm font-medium text-slate-900">R001</td>
              <td className="px-4 py-3 text-sm text-slate-600">Container</td>
              <td className="px-4 py-3 text-sm text-slate-600">HFO</td>
              <td className="px-4 py-3 text-sm text-slate-600">2024</td>
              <td className="px-4 py-3 text-sm text-right font-medium text-slate-900">91.0 gCO₂e/MJ</td>
              <td className="px-4 py-3 text-sm text-right text-slate-600">12,000</td>
              <td className="px-4 py-3 text-sm text-center">
                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">Set Baseline</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
        <p>Showing 1 of 5 routes</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50">Previous</button>
          <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50">Next</button>
        </div>
      </div>
    </div>
  );
}
