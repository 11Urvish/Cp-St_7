const mongoose = require("mongoose");
const { STATION_STATUS_INACTIVE } = require("../utils/constants");

const chargerBookingSchema = new mongoose.Schema(
  {
    status: String,
    idTag: Number,
    charger: { type: mongoose.Schema.Types.ObjectId, ref: "Charger" },
    customer_user_booked: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
    tenant: { type: mongoose.Schema.Types.ObjectId, ref: "Tenant" },
    invoice: { type: mongoose.Schema.Types.ObjectId, ref: "Invoice" },
    schedule_datetime: Date,
    booking_type: String,
    reservationId: Number,
    connectorId: Number,
    estimated_amount: Number,
    estimated_units: Number,
    estimated_time: Number,
    booking_start: Date,
    meterstart: Number,
    transaction_id: String,
    booking_stop: Date,
    meterstop: Number,
    stop_reason: String,
    time_taken: String,
    status: { type: String, default: STATION_STATUS_INACTIVE },
  },
  {
    timestamps: true,
  }
);

const ChargerBooking = mongoose.model("ChargerBooking", chargerBookingSchema);

module.exports = ChargerBooking;
