import { useState } from "react";
import RoutesPage from "./adapters/ui/RoutesPage";
import ComparePage from "./adapters/ui/ComparePage";
import BankingPage from "./adapters/ui/BankingPage";
import PoolingPage from "./adapters/ui/PoolingPage";

function App() {
  const [tab, setTab] = useState("routes");

  const tabs = [
    { id: "routes", label: "Routes", icon: "🚢" },
    { id: "compare", label: "Compare", icon: "📊" },
    { id: "banking", label: "Banking", icon: "🏦" },
    { id: "pooling", label: "Pooling", icon: "🤝" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xl font-bold">
              F
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">FuelEU Maritime</h1>
              <p className="text-sm text-slate-500">Compliance Dashboard</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-6 py-4 font-medium transition-all duration-200 border-b-2 ${
                  tab === t.id
                    ? "border-blue-600 text-blue-600 bg-blue-50"
                    : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <span className="mr-2">{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          {tab === "routes" && <RoutesPage />}
          {tab === "compare" && <ComparePage />}
          {tab === "banking" && <BankingPage />}
          {tab === "pooling" && <PoolingPage />}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-slate-500">
          © 2025 FuelEU Maritime Platform - Compliance Monitoring System
        </div>
      </footer>
    </div>
  );
}

export default App;

