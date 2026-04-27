import express from "express";
import {
  createProvince,
  getProvinces,
  getProvinceById,
  updateProvince,
  deleteProvince
} from "../controllers/provinceController.js";
import { protect, allowRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(protect, getProvinces)
  .post(protect, allowRoles("hq_admin"), createProvince);

router
  .route("/:id")
  .get(protect, getProvinceById)
  .put(protect, allowRoles("hq_admin"), updateProvince)
  .delete(protect, allowRoles("hq_admin"), deleteProvince);

export default router;