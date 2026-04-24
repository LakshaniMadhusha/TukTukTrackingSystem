import mongoose from "mongoose";

const tukTukSchema = new mongoose.Schema(
  {
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    ownerName: {
      type: String,
      required: true,
      trim: true
    },

    driverName: {
      type: String,
      required: true,
      trim: true
    },

    phoneNumber: {
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

    status: {
      type: String,
      enum: ["active", "inactive", "seized"],
      default: "active"
    },

    lastLocation: {
      latitude: Number,
      longitude: Number,
      speed: Number,
      heading: String,
      timestamp: Date
    }
  },
  { timestamps: true }
);

const TukTuk = mongoose.model("TukTuk", tukTukSchema);

export default TukTuk;