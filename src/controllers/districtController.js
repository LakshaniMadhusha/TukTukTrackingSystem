import District from "../models/District.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createDistrict = asyncHandler(async (req, res) => {
  const district = await District.create(req.body);

  res.status(201).json({
    success: true,
    message: "District created successfully.",
    data: district
  });
});

export const getDistricts = asyncHandler(async (req, res) => {
  const filter = {};

  if (req.query.provinceId) {
    filter.province = req.query.provinceId;
  }

  const districts = await District.find(filter)
    .populate("province", "name")
    .sort({ name: 1 });

  res.json({
    success: true,
    count: districts.length,
    data: districts
  });
});

export const getDistrictById = asyncHandler(async (req, res) => {
  const district = await District.findById(req.params.id).populate(
    "province",
    "name"
  );

  if (!district) {
    res.status(404);
    throw new Error("District not found.");
  }

  res.json({
    success: true,
    data: district
  });
});

export const updateDistrict = asyncHandler(async (req, res) => {
  const district = await District.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!district) {
    res.status(404);
    throw new Error("District not found.");
  }

  res.json({
    success: true,
    message: "District updated successfully.",
    data: district
  });
});

export const deleteDistrict = asyncHandler(async (req, res) => {
  const district = await District.findByIdAndDelete(req.params.id);

  if (!district) {
    res.status(404);
    throw new Error("District not found.");
  }

  res.json({
    success: true,
    message: "District deleted successfully."
  });
});