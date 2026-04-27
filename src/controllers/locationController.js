import TukTuk from "../models/TukTuk.js";
import LocationLog from "../models/LocationLog.js";
import asyncHandler from "../utils/asyncHandler.js";

export const updateLocation = asyncHandler(async (req, res) => {
  const {
    tukTukId,
    latitude,
    longitude,
    speed,
    heading,
    timestamp
  } = req.body;

  const tukTuk = await TukTuk.findById(tukTukId);

  if (!tukTuk) {
    res.status(404);
    throw new Error("Tuk-tuk not found.");
  }

  const locationData = {
    tukTuk: tukTuk._id,
    registrationNumber: tukTuk.registrationNumber,
    province: tukTuk.province,
    district: tukTuk.district,
    policeStation: tukTuk.policeStation,
    latitude,
    longitude,
    speed: speed || 0,
    heading: heading || "Unknown",
    timestamp: timestamp || new Date()
  };

  const locationLog = await LocationLog.create(locationData);

  tukTuk.lastLocation = {
    latitude,
    longitude,
    speed: speed || 0,
    heading: heading || "Unknown",
    timestamp: locationData.timestamp
  };

  await tukTuk.save();

  res.status(201).json({
    success: true,
    message: "Location update saved successfully.",
    data: locationLog
  });
});

export const getLiveLocations = asyncHandler(async (req, res) => {
  const filter = {
    lastLocation: { $exists: true }
  };

  if (req.query.provinceId) {
    filter.province = req.query.provinceId;
  }

  if (req.query.districtId) {
    filter.district = req.query.districtId;
  }

  if (req.query.policeStationId) {
    filter.policeStation = req.query.policeStationId;
  }

  const tukTuks = await TukTuk.find(filter)
    .select(
      "registrationNumber ownerName driverName phoneNumber status lastLocation province district policeStation"
    )
    .populate("province", "name")
    .populate("district", "name")
    .populate("policeStation", "name code")
    .sort({ "lastLocation.timestamp": -1 });

  res.json({
    success: true,
    count: tukTuks.length,
    data: tukTuks
  });
});

export const getLiveLocationByTukTuk = asyncHandler(async (req, res) => {
  const tukTuk = await TukTuk.findById(req.params.tukTukId)
    .select(
      "registrationNumber ownerName driverName phoneNumber status lastLocation province district policeStation"
    )
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

export const getLocationHistory = asyncHandler(async (req, res) => {
  const { tukTukId } = req.params;
  const { from, to } = req.query;

  const filter = {
    tukTuk: tukTukId
  };

  if (from || to) {
    filter.timestamp = {};

    if (from) {
      filter.timestamp.$gte = new Date(from);
    }

    if (to) {
      filter.timestamp.$lte = new Date(to);
    }
  }

  const logs = await LocationLog.find(filter)
    .populate("province", "name")
    .populate("district", "name")
    .populate("policeStation", "name code")
    .sort({ timestamp: 1 });

  res.json({
    success: true,
    count: logs.length,
    data: logs
  });
});