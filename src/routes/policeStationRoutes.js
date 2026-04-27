import express from "express";
import {
  createPoliceStation,
  getPoliceStations,
  getPoliceStationById,
  updatePoliceStation,
  deletePoliceStation
} from "../controllers/policeStationController.js";
import { protect, allowRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(protect, getPoliceStations)
  .post(
    protect,
    allowRoles("hq_admin", "province_admin"),
    createPoliceStation
  );

router
  .route("/:id")
  .get(protect, getPoliceStationById)
  .put(
    protect,
    allowRoles("hq_admin", "province_admin"),
    updatePoliceStation
  )
  .delete(protect, allowRoles("hq_admin"), deletePoliceStation);

export default router;