import TukTuk from "../models/TukTuk.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createTukTuk = asyncHandler(async (req, res) => {
  const tukTuk = await TukTuk.create(req.body);

  res.status(201).json({
    success: true,
    message: "Tuk-tuk registered successfully.",
    data: tukTuk
  });
});

export const getTukTuks = asyncHandler(async (req, res) => {
  const filter = {};

  if (req.query.provinceId) {
    filter.province = req.query.provinceId;
  }

  if (req.query.districtId) {
    filter.district = req.query.districtId;
  }

  if (req.query.policeStationId) {
    filter.policeStation = req.query.policeStationId;
  }

  if (req.query.status) {
    filter.status = req.query.status;
  }

  const tukTuks = await TukTuk.find(filter)
    .populate("province", "name")
    .populate("district", "name")
    .populate("policeStation", "name code")
    .sort({ registrationNumber: 1 });

  res.json({
    success: true,
    count: tukTuks.length,
    data: tukTuks
  });
});

export const getTukTukById = asyncHandler(async (req, res) => {
  const tukTuk = await TukTuk.findById(req.params.id)
    .populate("province", "name")
    .populate("district", "name")
    .populate("policeStation", "name code");

  if (!tukTuk) {
    res.status(404);
    throw new Error("Tuk-tuk not found.");
  }

  res.json({
    success: true,
    data: tukTuk
  });
});

export const updateTukTuk = asyncHandler(async (req, res) => {
  const tukTuk = await TukTuk.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!tukTuk) {
    res.status(404);
    throw new Error("Tuk-tuk not found.");
  }

  res.json({
    success: true,
    message: "Tuk-tuk updated successfully.",
    data: tukTuk
  });
});

export const deleteTukTuk = asyncHandler(async (req, res) => {
  const tukTuk = await TukTuk.findByIdAndDelete(req.params.id);

  if (!tukTuk) {
    res.status(404);
    throw new Error("Tuk-tuk not found.");
  }

  res.json({
    success: true,
    message: "Tuk-tuk deleted successfully."
  });
});