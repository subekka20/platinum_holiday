const { Schema, model } = require("mongoose");

const serviceTypeSchema = new Schema(
  {
    type: {
      type: String,
      required: [true, "Service type must be provided"],
      enum: ["Meet and Greet", "Park and Ride", "Valet Service", "Self Service", "Covered Parking"]
    },
    description: {
      type: String,
      required: [true, "Description must be provided"]
    }
  },
  {
    timestamps: true,
  }
);

// Ensure unique service type
serviceTypeSchema.index({ type: 1 }, { unique: true });

module.exports = model("ServiceType", serviceTypeSchema);