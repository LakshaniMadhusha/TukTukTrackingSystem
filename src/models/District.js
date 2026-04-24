import mongoose from "mongoose";

const districtSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    province: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Province",
      required: true
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

const District = mongoose.model("District", districtSchema);

export default District;