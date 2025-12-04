export default function PoolingPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Compliance Pooling</h2>
        <p className="text-slate-500 mt-1">Create pools to redistribute CB between vessels</p>
      </div>

      {/* Pool Validation */}
      <div className="card bg-blue-50 border-blue-200 mb-6">
        <div className="flex items-start gap-3">
          <div className="text-2xl">ℹ️</div>
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Pool Creation Rules</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Total adjusted CB must be ≥ 0</li>
              <li>• Deficit ships cannot exit worse than before</li>
              <li>• Surplus ships cannot exit with negative CB</li>
              <li>• Greedy allocation: Surplus → Deficit (descending order)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Create Pool */}
      <div className="card mb-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Create New Pool</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="label">Pool Year</label>
            <select className="input">
              <option>2024</option>
              <option>2025</option>
            </select>
          </div>
          <div>
            <label className="label">Pool Name (Optional)</label>
            <input type="text" className="input" placeholder="e.g., Fleet Alpha Pool" />
          </div>
        </div>

        {/* Members Selection */}
        <div className="mb-4">
          <label className="label">Select Pool Members</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="border border-slate-200 rounded-lg p-3 hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm font-medium text-slate-900">R001</span>
              </div>
              <div className="text-xs text-red-600 font-medium">CB: -50,000 gCO₂e</div>
              <div className="text-xs text-slate-500">Container • HFO</div>
            </div>
            <div className="border border-slate-200 rounded-lg p-3 hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm font-medium text-slate-900">R002</span>
              </div>
              <div className="text-xs text-green-600 font-medium">CB: +120,000 gCO₂e</div>
              <div className="text-xs text-slate-500">BulkCarrier • LNG</div>
            </div>
            <div className="border border-slate-200 rounded-lg p-3 hover:bg-slate-50 cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm font-medium text-slate-900">R003</span>
              </div>
              <div className="text-xs text-red-600 font-medium">CB: -20,000 gCO₂e</div>
              <div className="text-xs text-slate-500">Tanker • MGO</div>
            </div>
          </div>
        </div>

        {/* Pool Summary */}
        <div className="bg-slate-50 rounded-lg p-4 mb-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xs text-slate-500 mb-1">Total Members</div>
              <div className="text-xl font-bold text-slate-900">0</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Total CB</div>
              <div className="text-xl font-bold text-green-600">+0</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">Pool Valid</div>
              <div className="text-xl">⚪</div>
            </div>
          </div>
        </div>

        <button className="btn w-full" disabled>
          Create Pool (Select members first)
        </button>
      </div>

      {/* Existing Pools */}
      <div className="card">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Pools</h3>
        <div className="space-y-4">
          <div className="border border-slate-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-semibold text-slate-900">Pool #2</h4>
                <p className="text-xs text-slate-500">Created: 2024-12-04</p>
              </div>
              <span className="badge-success">Valid</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-sm mb-3">
              <div className="bg-slate-50 rounded p-2">
                <div className="text-xs text-slate-500">R002</div>
                <div className="font-medium text-green-600">+120k → +50k</div>
              </div>
              <div className="bg-slate-50 rounded p-2">
                <div className="text-xs text-slate-500">R003</div>
                <div className="font-medium text-slate-900">-20k → 0</div>
              </div>
              <div className="bg-slate-50 rounded p-2">
                <div className="text-xs text-slate-500">R001</div>
                <div className="font-medium text-slate-900">-50k → 0</div>
              </div>
            </div>
            <div className="text-xs text-slate-500">
              Total Pool CB: +50,000 gCO₂e
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
