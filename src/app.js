import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import swaggerSpec from "./swagger.js";

import authRoutes from "./routes/authRoutes.js";
import provinceRoutes from "./routes/provinceRoutes.js";
import districtRoutes from "./routes/districtRoutes.js";
import policeStationRoutes from "./routes/policeStationRoutes.js";
import tukTukRoutes from "./routes/tuktukRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";

import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Tuk-Tuk Tracking API is running.",
    docs: "/api-docs"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "API health check successful.",
    timestamp: new Date()
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRoutes);
app.use("/api/provinces", provinceRoutes);
app.use("/api/districts", districtRoutes);
app.use("/api/police-stations", policeStationRoutes);
app.use("/api/tuktuks", tukTukRoutes);
app.use("/api/locations", locationRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;