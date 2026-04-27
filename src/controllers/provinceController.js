import Province from "../models/Province.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createProvince = asyncHandler(async (req, res) => {
  const province = await Province.create(req.body);

  res.status(201).json({
    success: true,
    message: "Province created successfully.",
    data: province
  });
});

export const getProvinces = asyncHandler(async (req, res) => {
  const provinces = await Province.find().sort({ name: 1 });

  res.json({
    success: true,
    count: provinces.length,
    data: provinces
  });
});

export const getProvinceById = asyncHandler(async (req, res) => {
  const province = await Province.findById(req.params.id);

  if (!province) {
    res.status(404);
    throw new Error("Province not found.");
  }

  res.json({
    success: true,
    data: province
  });
});

export const updateProvince = asyncHandler(async (req, res) => {
  const province = await Province.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!province) {
    res.status(404);
    throw new Error("Province not found.");
  }

  res.json({
    success: true,
    message: "Province updated successfully.",
    data: province
  });
});

export const deleteProvince = asyncHandler(async (req, res) => {
  const province = await Province.findByIdAndDelete(req.params.id);

  if (!province) {
    res.status(404);
    throw new Error("Province not found.");
  }

  res.json({
    success: true,
    message: "Province deleted successfully."
  });
});