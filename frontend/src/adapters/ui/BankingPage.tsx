import { useState } from "react";
import { api } from "../infrastructure/apiClient";

type BankRecord = {
  id: number;
  shipId: string;
  year: number;
  amount: number;
  createdAt: string;
};

export default function BankingPage() {
  const [shipId, setShipId] = useState("R001");
  const [year, setYear] = useState("2024");

  const [records, setRecords] = useState<BankRecord[]>([]);
  const [bankAmount, setBankAmount] = useState("");
  const [applyAmount, setApplyAmount] = useState("");

  const [applyResult, setApplyResult] = useState<any>(null);
  const [error, setError] = useState("");

  const loadRecords = async () => {
    try {
      const res = await api.get(`/banking/records?shipId=${shipId}`);
      setRecords(res.data);
      setError("");
    } catch (e: any) {
      setError(e.response?.data?.error || "Error fetching records");
    }
  };

  const handleBank = async () => {
    try {
      const res = await api.post("/banking/bank", {
        shipId,
        year: Number(year),
        cb: Number(bankAmount),
      });
      setBankAmount("");
      loadRecords();
      setError("");
    } catch (e: any) {
      setError(e.response?.data?.error || "Banking failed");
    }
  };

  const handleApply = async () => {
    try {
      const res = await api.post("/banking/apply", {
        shipId,
        year: Number(year),
        amount: Number(applyAmount),
      });
      setApplyResult(res.data);
      setApplyAmount("");
      loadRecords();
      setError("");
    } catch (e: any) {
      setError(e.response?.data?.error || "Apply failed");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Banking</h2>
      {/* Select Ship + Year */}
      <div className="flex gap-4 mb-4">
        <select
          className="border p-2"
          value={shipId}
          onChange={(e) => setShipId(e.target.value)}
        >
          <option value="R001">R001</option>
          <option value="R002">R002</option>
          <option value="R003">R003</option>
          <option value="R004">R004</option>
          <option value="R005">R005</option>
        </select>

        <select
          className="border p-2"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>

        <button onClick={loadRecords} className="btn">
          Load Records
        </button>
      </div>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      {/* Bank Records Table */}
      <table className="w-full border mb-6">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Year</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id}>
              <td className="border p-2 text-center">{r.id}</td>
              <td className="border p-2 text-center">{r.amount}</td>
              <td className="border p-2 text-center">{r.year}</td>
              <td className="border p-2 text-center">
                {new Date(r.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Bank CB */}
      <div className="mb-6">
        <h3 className="font-bold mb-2">Bank CB</h3>
        <input
          type="number"
          className="border p-2 mr-2"
          value={bankAmount}
          onChange={(e) => setBankAmount(e.target.value)}
          placeholder="Amount"
        />
        <button className="btn" onClick={handleBank}>
          Bank
        </button>
      </div>

      {/* Apply CB */}
      <div className="mb-6">
        <h3 className="font-bold mb-2">Apply Banked CB</h3>
        <input
          type="number"
          className="border p-2 mr-2"
          value={applyAmount}
          onChange={(e) => setApplyAmount(e.target.value)}
          placeholder="Amount"
        />
        <button className="btn" onClick={handleApply}>
          Apply
        </button>

        {applyResult && (
          <div className="mt-4 p-3 border bg-gray-100">
            <p>
              <b>Before:</b> {applyResult.cb_before}
            </p>
            <p>
              <b>Applied:</b> {applyResult.applied}
            </p>
            <p>
              <b>After:</b> {applyResult.cb_after}
            </p>
          </div>
        )}
      </div>

      {/* Current Balance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="text-sm text-green-700 mb-1">Current CB Balance</div>
          <div className="text-3xl font-bold text-green-800">+120,000</div>
          <div className="text-xs text-green-600 mt-1">gCO₂e Surplus</div>
        </div>
        <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="text-sm text-blue-700 mb-1">Banked Balance</div>
          <div className="text-3xl font-bold text-blue-800">200,000</div>
          <div className="text-xs text-blue-600 mt-1">gCO₂e Available</div>
        </div>
        <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="text-sm text-purple-700 mb-1">Total Applied</div>
          <div className="text-3xl font-bold text-purple-800">50,000</div>
          <div className="text-xs text-purple-600 mt-1">gCO₂e Used</div>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Bank Surplus</h3>
          <p className="text-sm text-slate-600 mb-4">Store positive CB for future use</p>
          <div className="mb-4">
            <label className="label">Ship ID</label>
            <input type="text" className="input" placeholder="e.g., R002" />
          </div>
          <div className="mb-4">
            <label className="label">Amount (gCO₂e)</label>
            <input type="number" className="input" placeholder="Enter amount" />
          </div>
          <button className="btn-success w-full">Bank CB</button>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Apply Banked CB</h3>
          <p className="text-sm text-slate-600 mb-4">Use banked surplus to cover deficit</p>
          <div className="mb-4">
            <label className="label">Ship ID</label>
            <input type="text" className="input" placeholder="e.g., R001" />
          </div>
          <div className="mb-4">
            <label className="label">Amount to Apply (gCO₂e)</label>
            <input type="number" className="input" placeholder="Max: 200,000" />
          </div>
          <button className="btn w-full">Apply CB</button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="card">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Banking History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Ship ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Type</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Amount</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 uppercase">Balance After</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm text-slate-600">2024-12-04</td>
                <td className="px-4 py-3 text-sm font-medium text-slate-900">R002</td>
                <td className="px-4 py-3 text-sm">
                  <span className="badge-success">Banked</span>
                </td>
                <td className="px-4 py-3 text-sm text-right text-green-600 font-medium">+100,000</td>
                <td className="px-4 py-3 text-sm text-right font-medium">200,000</td>
              </tr>
              <tr className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm text-slate-600">2024-12-04</td>
                <td className="px-4 py-3 text-sm font-medium text-slate-900">R001</td>
                <td className="px-4 py-3 text-sm">
                  <span className="badge-info">Applied</span>
                </td>
                <td className="px-4 py-3 text-sm text-right text-blue-600 font-medium">-50,000</td>
                <td className="px-4 py-3 text-sm text-right font-medium">150,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
