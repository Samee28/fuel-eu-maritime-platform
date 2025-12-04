import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clear existing data
  await prisma.poolMember.deleteMany({});
  await prisma.pool.deleteMany({});
  await prisma.bankEntry.deleteMany({});
  await prisma.shipCompliance.deleteMany({});
  await prisma.route.deleteMany({});

  await prisma.route.createMany({
    data: [
      {
        routeId: "R001",
        vesselType: "Container",
        fuelType: "HFO",
        year: 2024,
        ghgIntensity: 91.0,
        fuelConsumption: 5000,
        distance: 12000,
        totalEmissions: 4500
      },
      {
        routeId: "R002",
        vesselType: "BulkCarrier",
        fuelType: "LNG",
        year: 2024,
        ghgIntensity: 88.0,
        fuelConsumption: 4800,
        distance: 11500,
        totalEmissions: 4200
      },
      {
        routeId: "R003",
        vesselType: "Tanker",
        fuelType: "MGO",
        year: 2024,
        ghgIntensity: 93.5,
        fuelConsumption: 5100,
        distance: 12500,
        totalEmissions: 4700
      },
      {
        routeId: "R004",
        vesselType: "RoRo",
        fuelType: "HFO",
        year: 2025,
        ghgIntensity: 89.2,
        fuelConsumption: 4900,
        distance: 11800,
        totalEmissions: 4300
      },
      {
        routeId: "R005",
        vesselType: "Container",
        fuelType: "LNG",
        year: 2025,
        ghgIntensity: 90.5,
        fuelConsumption: 4950,
        distance: 11900,
        totalEmissions: 4400
      }
    ],
  });

  // Seed ShipCompliance data (CB values)
  await prisma.shipCompliance.createMany({
    data: [
      { shipId: "R001", year: 2024, cbValue: -50000 },
      { shipId: "R002", year: 2024, cbValue: 120000 },
      { shipId: "R003", year: 2024, cbValue: -20000 },
      { shipId: "R004", year: 2024, cbValue: 80000 },
      { shipId: "R005", year: 2024, cbValue: -30000 },
      { shipId: "R001", year: 2025, cbValue: -45000 },
      { shipId: "R002", year: 2025, cbValue: 110000 },
      { shipId: "R003", year: 2025, cbValue: -25000 },
      { shipId: "R004", year: 2025, cbValue: 75000 },
      { shipId: "R005", year: 2025, cbValue: -35000 },
    ],
  });

  console.log("🌱 Seeded routes successfully!");
  console.log("🌱 Seeded ship compliance data successfully!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
