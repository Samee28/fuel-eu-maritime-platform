import { useState } from "react";
import { api } from "../infrastructure/apiClient";

type AdjustedCB = {
  shipId: string;
  cb: number;
};

type PoolResult = {
  pool: {
    shipId: string;
    cb_before: number;
    cb_after: number;
  }[];
  poolSum: number;
};

export default function PoolingPage() {
  const [year, setYear] = useState("2024");
  const [selectedShips, setSelectedShips] = useState<string[]>([]);
  const [cbData, setCbData] = useState<AdjustedCB[]>([]);
  const [result, setResult] = useState<PoolResult | null>(null);
  const [error, setError] = useState("");

  const ships = ["R001", "R002", "R003", "R004", "R005"];

  const toggleShip = (shipId: string) => {
    setSelectedShips((prev) =>
      prev.includes(shipId)
        ? prev.filter((s) => s !== shipId)
        : [...prev, shipId]
    );
  };

  const loadCB = async () => {
    try {
      const output: AdjustedCB[] = [];
      for (const ship of selectedShips) {
        const res = await api.get(
          `/compliance/adjusted-cb?shipId=${ship}&year=${year}`
        );
        output.push(res.data);
      }
      setCbData(output);
      setError("");
    } catch (e: any) {
      setError("Error loading adjusted CB data");
    }
  };

  const createPool = async () => {
    try {
      if (cbData.length === 0) {
        setError("Please load CB data first");
        return;
      }
      
      const res = await api.post("/pools", {
        members: cbData, // Send cbData which has { shipId, cb } structure
        year: Number(year),
      });
      setResult(res.data);
      setError("");
    } catch (e: any) {
      setError(e.response?.data?.error || "Pool creation failed");
    }
  };

  const poolSum = cbData.reduce((sum, s) => sum + s.cb, 0);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Pooling</h2>

      {/* Select year */}
      <div className="flex gap-4 mb-4">
        <select
          className="border p-2"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>

        <button onClick={loadCB} className="btn">
          Load CB
        </button>
      </div>

      {/* Select ships */}
      <div className="mb-4">
        <h3 className="font-bold mb-2">Select Ships</h3>

        <div className="flex gap-4 flex-wrap">
          {ships.map((ship) => (
            <label key={ship} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedShips.includes(ship)}
                onChange={() => toggleShip(ship)}
              />
              {ship}
            </label>
          ))}
        </div>
      </div>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      {/* CB Table */}
      {cbData.length > 0 && (
        <table className="w-full border mb-6">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Ship</th>
              <th className="p-2 border">Adjusted CB</th>
            </tr>
          </thead>
          <tbody>
            {cbData.map((row) => (
              <tr key={row.shipId}>
                <td className="border p-2 text-center">{row.shipId}</td>
                <td
                  className={`border p-2 text-center ${
                    row.cb >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {row.cb}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pool sum */}
      {cbData.length > 0 && (
        <p className="font-bold mb-4">
          Pool Sum:{" "}
          <span className={poolSum >= 0 ? "text-green-600" : "text-red-600"}>
            {poolSum}
          </span>
        </p>
      )}

      {/* Create pool */}
      <button
        className="btn"
        disabled={poolSum < 0 || cbData.length === 0}
        onClick={createPool}
      >
        Create Pool
      </button>

      {/* Result */}
      {result && (
        <div className="mt-6 p-4 border bg-gray-100">
          <h3 className="font-bold mb-2">Pool Created</h3>

          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Ship</th>
                <th className="border p-2">Before</th>
                <th className="border p-2">After</th>
              </tr>
            </thead>
            <tbody>
              {result.pool.map((row) => (
                <tr key={row.shipId}>
                  <td className="border p-2 text-center">{row.shipId}</td>
                  <td className="border p-2 text-center">{row.cb_before}</td>
                  <td className="border p-2 text-center">{row.cb_after}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="mt-3 font-bold">
            Final Pool Sum:{" "}
            <span
              className={
                result.poolSum >= 0 ? "text-green-600" : "text-red-600"
              }
            >
              {result.poolSum}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

