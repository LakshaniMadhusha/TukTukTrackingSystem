import express from "express";
import {
  createDistrict,
  getDistricts,
  getDistrictById,
  updateDistrict,
  deleteDistrict
} from "../controllers/districtController.js";
import { protect, allowRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(protect, getDistricts)
  .post(protect, allowRoles("hq_admin"), createDistrict);

router
  .route("/:id")
  .get(protect, getDistrictById)
  .put(protect, allowRoles("hq_admin"), updateDistrict)
  .delete(protect, allowRoles("hq_admin"), deleteDistrict);

export default router;