import express from "express";
import {
  createTukTuk,
  getTukTuks,
  getTukTukById,
  updateTukTuk,
  deleteTukTuk
} from "../controllers/tuktukController.js";
import { protect, allowRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(protect, getTukTuks)
  .post(
    protect,
    allowRoles("hq_admin", "province_admin", "district_officer", "station_officer"),
    createTukTuk
  );

router
  .route("/:id")
  .get(protect, getTukTukById)
  .put(
    protect,
    allowRoles("hq_admin", "province_admin", "district_officer", "station_officer"),
    updateTukTuk
  )
  .delete(protect, allowRoles("hq_admin", "province_admin"), deleteTukTuk);

export default router;