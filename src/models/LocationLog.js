import mongoose from "mongoose";

const locationLogSchema = new mongoose.Schema(
  {
    tukTuk: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TukTuk",
      required: true
    },

    registrationNumber: {
      type: String,
      required: true
    },

    province: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Province",
      required: true
    },

    district: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "District",
      required: true
    },

    policeStation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PoliceStation",
      required: true
    },

    latitude: {
      type: Number,
      required: true
    },

    longitude: {
      type: Number,
      required: true
    },

    speed: {
      type: Number,
      default: 0
    },

    heading: {
      type: String,
      default: "Unknown"
    },

    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const LocationLog = mongoose.model("LocationLog", locationLogSchema);

export default LocationLog;