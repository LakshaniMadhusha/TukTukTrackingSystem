import mongoose from "mongoose";

const policeStationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    code: {
      type: String,
      required: true,
      unique: true,
      trim: true
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

    contactNumber: {
      type: String,
      default: "0110000000"
    },

    address: {
      type: String,
      default: "Sri Lanka"
    },

    latitude: {
      type: Number
    },

    longitude: {
      type: Number
    }
  },
  { timestamps: true }
);

const PoliceStation = mongoose.model("PoliceStation", policeStationSchema);

export default PoliceStation;