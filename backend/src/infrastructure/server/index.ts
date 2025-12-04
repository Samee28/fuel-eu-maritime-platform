import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";

// Import controllers
import {
  getRoutes,
  setBaseline,
  getComparison,
} from "../../adapters/inbound/http/routesController";
import { getCB } from "../../adapters/inbound/http/complianceController";
import { getBankRecords, bankCB, applyBankedCB } from "../../adapters/inbound/http/bankingController";
import { createPool } from "../../adapters/inbound/http/poolingController";

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (_req: Request, res: Response) => {
  res.send("FuelEU Maritime Backend Running 🚀");
});

// -----------------------------
// ROUTES API ENDPOINTS
// -----------------------------
app.get("/routes", getRoutes);
app.get("/routes/:id/baseline", setBaseline);
app.get("/routes/comparison", getComparison);

// COMPLIANCE API ENDPOINTS
// -----------------------------
app.get("/compliance/cb", getCB);

// -----------------------------
// BANKING API ENDPOINTS
// -----------------------------
app.get("/banking/records", getBankRecords);
app.post("/banking/bank", bankCB);
app.post("/banking/apply", applyBankedCB);

// POOLING API ENDPOINTS
// -----------------------------
app.post("/pools", createPool);

// -----------------------------
// SERVER START
// -----------------------------
const PORT = 4000;

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});

export default app;
