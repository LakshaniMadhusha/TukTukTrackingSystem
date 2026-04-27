import express from "express";
import {
  updateLocation,
  getLiveLocations,
  getLiveLocationByTukTuk,
  getLocationHistory
} from "../controllers/locationController.js";
import { protect, allowRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/update",
  protect,
  allowRoles("device", "hq_admin", "station_officer"),
  updateLocation
);

router.get(
  "/live",
  protect,
  allowRoles("hq_admin", "province_admin", "district_officer", "station_officer"),
  getLiveLocations
);

router.get(
  "/live/:tukTukId",
  protect,
  allowRoles("hq_admin", "province_admin", "district_officer", "station_officer"),
  getLiveLocationByTukTuk
);

router.get(
  "/history/:tukTukId",
  protect,
  allowRoles("hq_admin", "province_admin", "district_officer", "station_officer"),
  getLocationHistory
);

export default router;