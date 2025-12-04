import { useEffect, useState } from "react";
import { api } from "../infrastructure/apiClient";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

type CompareResult = {
  baseline: {
    routeId: string;
    ghgIntensity: number;
  };
  comparison: {
    routeId: string;
    baselineIntensity: number;
    comparisonIntensity: number;
    percentDiff: number;
    compliant: boolean;
  }[];
};

export default function ComparePage() {
  const [data, setData] = useState<CompareResult | null>(null);

  const loadComparison = async () => {
    const res = await api.get("/routes/comparison");
    setData(res.data);
  };

  useEffect(() => {
    loadComparison();
  }, []);

  if (!data) return <p>Loading...</p>;

  const labels = data.comparison.map((c) => c.routeId);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Baseline GHG Intensity",
        data: data.comparison.map(() => data.baseline.ghgIntensity),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Comparison GHG Intensity",
        data: data.comparison.map((c) => c.comparisonIntensity),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Compare Routes</h2>

      {/* Chart */}
      <div className="w-[700px] mb-8">
        <Bar data={chartData} />
      </div>

      {/* Table */}
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Route ID</th>
            <th className="p-2 border">Baseline Intensity</th>
            <th className="p-2 border">Current Intensity</th>
            <th className="p-2 border">% Difference</th>
            <th className="p-2 border">Compliant</th>
          </tr>
        </thead>

        <tbody>
          {data.comparison.map((c) => (
            <tr key={c.routeId} className="text-center">
              <td className="border p-2">{c.routeId}</td>
              <td className="border p-2">{c.baselineIntensity}</td>
              <td className="border p-2">{c.comparisonIntensity}</td>
              <td
                className={`border p-2 ${
                  c.percentDiff < 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {c.percentDiff.toFixed(2)}%
              </td>
              <td className="border p-2">
                {c.compliant ? (
                  <span className="text-green-600 font-bold">✔</span>
                ) : (
                  <span className="text-red-600 font-bold">✘</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
