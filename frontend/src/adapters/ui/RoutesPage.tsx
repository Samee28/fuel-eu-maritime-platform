
import { useEffect, useState } from "react";
import { api } from "../infrastructure/apiClient";

type Route = {
  routeId: string;
  vesselType: string;
  fuelType: string;
  year: number;
  ghgIntensity: number;
  fuelConsumption: number;
  distance: number;
  totalEmissions: number;
  isBaseline: boolean;
};

export default function RoutesPage() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [filters, setFilters] = useState({
    vesselType: "",
    fuelType: "",
    year: "",
  });

  const fetchRoutes = async () => {
    const res = await api.get("/routes");
    setRoutes(res.data);
  };

  const setBaseline = async (routeId: string) => {
    await api.post(`/routes/${routeId}/baseline`);
    await fetchRoutes(); // refresh UI
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  // Filtered routes
  const filteredRoutes = routes.filter((r) => {
    return (
      (!filters.vesselType || r.vesselType === filters.vesselType) &&
      (!filters.fuelType || r.fuelType === filters.fuelType) &&
      (!filters.year || r.year.toString() === filters.year)
    );
  });

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
          <select className="input" onChange={(e) => setFilters({ ...filters, vesselType: e.target.value })}>
            <option value="">All Types</option>
            {[...new Set(routes.map((r) => r.vesselType))].map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Fuel Type</label>
          <select className="input" onChange={(e) => setFilters({ ...filters, fuelType: e.target.value })}>
            <option value="">All Fuels</option>
            {[...new Set(routes.map((r) => r.fuelType))].map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">Year</label>
          <select className="input" onChange={(e) => setFilters({ ...filters, year: e.target.value })}>
            <option value="">All Years</option>
            {[...new Set(routes.map((r) => r.year.toString()))].map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
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
            {filteredRoutes.map((r) => (
              <tr key={r.routeId} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-slate-900">{r.routeId}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{r.vesselType}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{r.fuelType}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{r.year}</td>
                <td className="px-4 py-3 text-sm text-right font-medium text-slate-900">{r.ghgIntensity}</td>
                <td className="px-4 py-3 text-sm text-right text-slate-600">{r.distance}</td>
                <td className="px-4 py-3 text-sm text-center">
                  {r.isBaseline ? (
                    <span className="text-green-600 font-bold">Baseline</span>
                  ) : (
                    <button
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                      onClick={() => setBaseline(r.routeId)}
                    >
                      Set Baseline
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
        <p>Showing {filteredRoutes.length} of {routes.length} routes</p>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50">Previous</button>
          <button className="px-3 py-1 border border-slate-300 rounded hover:bg-slate-50">Next</button>
        </div>
      </div>
    </div>
  );
}
