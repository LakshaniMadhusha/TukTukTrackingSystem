import PoliceStation from "../models/PoliceStation.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createPoliceStation = asyncHandler(async (req, res) => {
  const station = await PoliceStation.create(req.body);

  res.status(201).json({
    success: true,
    message: "Police station created successfully.",
    data: station
  });
});

export const getPoliceStations = asyncHandler(async (req, res) => {
  const filter = {};

  if (req.query.provinceId) {
    filter.province = req.query.provinceId;
  }

  if (req.query.districtId) {
    filter.district = req.query.districtId;
  }

  const stations = await PoliceStation.find(filter)
    .populate("province", "name")
    .populate("district", "name")
    .sort({ name: 1 });

  res.json({
    success: true,
    count: stations.length,
    data: stations
  });
});

export const getPoliceStationById = asyncHandler(async (req, res) => {
  const station = await PoliceStation.findById(req.params.id)
    .populate("province", "name")
    .populate("district", "name");

  if (!station) {
    res.status(404);
    throw new Error("Police station not found.");
  }

  res.json({
    success: true,
    data: station
  });
});

export const updatePoliceStation = asyncHandler(async (req, res) => {
  const station = await PoliceStation.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true
    }
  );

  if (!station) {
    res.status(404);
    throw new Error("Police station not found.");
  }

  res.json({
    success: true,
    message: "Police station updated successfully.",
    data: station
  });
});

export const deletePoliceStation = asyncHandler(async (req, res) => {
  const station = await PoliceStation.findByIdAndDelete(req.params.id);

  if (!station) {
    res.status(404);
    throw new Error("Police station not found.");
  }

  res.json({
    success: true,
    message: "Police station deleted successfully."
  });
});