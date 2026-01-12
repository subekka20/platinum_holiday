const { Schema, model } = require("mongoose");

const vendorTerminalSchema = new Schema(
  {
    vendor_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Vendor ID must be provided"]
    },
    terminal: {
      type: String,
      required: [true, "Terminal must be provided"],
      enum: ["Terminal 1", "Terminal 2", "Terminal 3", "Terminal 4"]
    },
    service_type: {
      type: String,
      required: [true, "Service type must be provided"],
      enum: ["Meet and Greet", "Park and Ride"]
    }
  },
  {
    timestamps: true,
  }
);

// Ensure unique combination of vendor_id and terminal
vendorTerminalSchema.index({ vendor_id: 1, terminal: 1 }, { unique: true });

module.exports = model("VendorTerminal", vendorTerminalSchema);